use tokio::sync::mpsc::UnboundedSender;

use tokio::net::{TcpListener, TcpStream};
use tokio_tungstenite::tungstenite::Message;
use futures_util::{StreamExt, SinkExt};


async fn handle_connection(stream: TcpStream){
    let (mut ws_stream, _) = tokio_tungstenite::accept_async(stream).await.unwrap();
    let (tx, rx) = ws_stream.split();
    
    tx.send(Message::Text("ping".to_string())).await.unwrap();
    
}