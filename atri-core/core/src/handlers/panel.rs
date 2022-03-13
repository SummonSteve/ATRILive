use poem::{
    web::Html,
    handler,
    http::StatusCode,
};

#[handler]
pub async fn panel_get() -> Html<String> {
    Html("アトリは、高性能ですから!".to_string())
}

#[handler]
pub async fn panel_post() -> StatusCode {
    StatusCode::NOT_IMPLEMENTED
}
