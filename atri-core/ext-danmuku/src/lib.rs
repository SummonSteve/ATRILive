use serde_json::Value;
use std::time::Duration;
use tokio::time;
use tokio::sync::mpsc::{Receiver, Sender};
use tokio_tungstenite::{connect_async, tungstenite::protocol::Message};
use tracing::{error, info};
use url::Url;
use color_eyre::eyre::Result;
use futures_util::{StreamExt, SinkExt};

mod bili;

#[derive(Debug)]
enum EventType {
    ChatMessage,
    NewVisitor,
    Popularity,
}

#[derive(Debug)]
pub struct DanmukuEvent {
    event_type: EventType,
    user: String,
    operation: Option<String>,
}

impl DanmukuEvent {
    fn err() -> DanmukuEvent{
        DanmukuEvent {
            event_type: EventType::ChatMessage,
            user: "Err".to_string(),
            operation: None,
        }
    }

    fn default() -> DanmukuEvent {
        DanmukuEvent {
            event_type: EventType::ChatMessage,
            user: "".to_string(),
            operation: None,
        }
    }

    fn login() -> DanmukuEvent {
        DanmukuEvent {
            event_type: EventType::ChatMessage,
            user: "".to_string(),
            operation: None,
        }
    }

    fn popularity(value: String) -> DanmukuEvent {
        DanmukuEvent {
            event_type: EventType::ChatMessage,
            user: "".to_string(),
            operation: Some(value),
        }
    }

    fn new(event_type: EventType, user: String, operation: Option<String>) -> DanmukuEvent {
        DanmukuEvent {
            event_type,
            user,
            operation,
        }
    }
}

pub async fn start(room_id: &str, tx: Sender<DanmukuEvent>) -> Result<()> {
    let url = Url::parse("wss://broadcastlv.chat.bilibili.com/sub").unwrap();
    let (ws_stream, response) = connect_async(url).await.expect("Failed to connect");
    let (mut write, mut read) = ws_stream.split();

    info!("Status code: {}", response.status());
    for (ref header, _value) in response.headers() {
        info!("{}: {:?}", header, _value);
    }

    let handshake_packet = bili::encode("{\"roomid\": 3470615}", 7);
    let mut interval = time::interval(Duration::from_secs(30));

    write.send(Message::Binary(handshake_packet)).await.unwrap();

    loop {
        tokio::select! {
            msg = read.next() => {
                match msg {
                    Some(msg) => {
                        let data = msg.unwrap().into_data();
                        if data.len() > 0 {
                            tx.send(handle_packet(data).await).await;
                        }
                    }
                    None => break,
                }
            }
            _ = interval.tick() => {
                write.send(Message::Binary(bili::encode("", 2))).await.unwrap();
            }
        }
    }
    Ok(())
}

async fn handle_packet(data: Vec<u8>) -> DanmukuEvent {
    let packet = bili::decode(data);
    match packet.op {
        8 => {
            info!("加入房间");
            DanmukuEvent::login()
        }

        5 => {
            let mut event = DanmukuEvent::default();
            for body in packet.body {
                match serde_json::from_str(&body.unwrap()) {
                    Ok::<Value, _>(data) => {
                        match data["cmd"].as_str() {
                            Some(cmd) => match cmd {
                                "DANMU_MSG" => {
                                    event = DanmukuEvent::new(
                                        EventType::ChatMessage,
                                        data["info"][2][1].to_string(),
                                        Some(data["info"][1].to_string()),
                                    );
                                    println!("{:?}", event);
                                }
                                //"SEND_GIFT" => {
                                //    info!(
                                //        "{}{}{}个{}",
                                //        data["data"]["uname"],
                                //        data["data"]["action"],
                                //        data["data"]["num"],
                                //        data["data"]["giftName"]
                                //    )
                                //}

                                "INTERACT_WORD" => {
                                    
                                    event = DanmukuEvent::new(
                                        EventType::NewVisitor,
                                        data["info"][2][1].to_string(),
                                        None,
                                    );
                                }
                                _ => {
                                    event = DanmukuEvent::default();
                                }
                            },
                            None => {
                                DanmukuEvent::err();
                            }
                        };
                    }
                    Err(e) => {
                        error!("json解析错误 {}", e);
                        event = DanmukuEvent::err();
                    }
                };
            }
            event
        }

        3 => {
            let data: Value = serde_json::from_str(&packet.body[0].as_ref().unwrap()).unwrap();
            DanmukuEvent::popularity(data["count"].to_string())
        }

        _ => DanmukuEvent::default()
    }
}
