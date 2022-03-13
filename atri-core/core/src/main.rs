mod utils;
mod handlers;

use color_eyre::eyre::Result;
use poem::{
    Route, get, EndpointExt, middleware::Tracing, Server, listener::TcpListener,
};

#[tokio::main]
async fn main() -> Result<()> {
    color_eyre::install()?;
    tracing_subscriber::fmt::init();

    let http_handle = tokio::spawn(async {
        let app = Route::new()
            .at("/obs", get(handlers::canvas::canvas_get))
            .at("/designer", get(handlers::designer::designer_get))
            .at("/panel", get(handlers::panel::panel_get).post(handlers::panel::panel_post))
            .with(Tracing);

        Server::new(TcpListener::bind("127.0.0.1:3001"))
        .run(app)
        .await.expect("HTTP error")
    });

    let tcp_handle = tokio::spawn(async {
        // 用于p2p连接 基于 quic 实现
        // todo!();
    });


    let (http_result, tcp_result) = tokio::join!(http_handle, tcp_handle);

    http_result?;
    tcp_result?;
    Ok(())
}
