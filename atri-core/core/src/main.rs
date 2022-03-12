mod utils;

use color_eyre::eyre::Result;
use poem::{
    web::Html, Route, get, handler, EndpointExt, middleware::Tracing, Server, listener::TcpListener,
};

#[tokio::main]
async fn main() -> Result<()> {
    color_eyre::install()?;
    tracing_subscriber::fmt::init();

    let http_handle = tokio::spawn(async {
        let app = Route::new().at("/obs", get(obs)).with(Tracing);
        Server::new(TcpListener::bind("127.0.0.1:3001"))
        .run(app)
        .await.expect("HTTP error")
    });

    let tcp_handle = tokio::spawn(async {
        //todo!();
    });


    let (http_result, tcp_result) = tokio::join!(http_handle, tcp_handle);

    http_result?;
    tcp_result?;
    Ok(())
}

#[handler]
fn obs() -> Html<String> {
    Html("アトリは、高性能ですから!".to_string())
}