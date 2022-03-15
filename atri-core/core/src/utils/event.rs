use color_eyre::eyre::Result;
use tokio::sync::mpsc;
use tokio::sync::mpsc::{Receiver, Sender};
use tokio::sync::OnceCell;

use ext_danmuku;

enum BuiltinTriggers {
    Timer,
    SignalComplete,
    SignalSent,
    CommandInput,
    PatternMatch,
    Http,
    Chat,
}

struct Event {
    trigger: BuiltinTriggers,
}


pub async fn event_receiver() -> Result<()> {
    let (tx, mut rx) = mpsc::channel(64);
    let danmu_tx = tx.clone();
    tokio::spawn(async move{
        ext_danmuku::start("3470615", tx).await;
    });

    while let Some(message) = rx.recv().await {
        println!("GOT Event: {:?}", message);
    }
    Ok(())
}
