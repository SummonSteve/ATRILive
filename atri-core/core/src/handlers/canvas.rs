use poem::{
    web::Html,
    handler,
};

#[handler]
pub async fn canvas_get() -> Html<String> {
    Html("アトリは、高性能ですから!".to_string())
}