window.onload = () => {
  uploaderJS({
    container: "#container",
    input: "#uploadFiles",
    place_image: "images/box.png",
    url_server: "http://localhost/UploaderJS/server/upload.php",
    btn_upload: "#btn_upload",
    message_box: "#message_box",
  });
};
