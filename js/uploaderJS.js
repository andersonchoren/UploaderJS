function uploaderJS(configs) {
    var input = document.querySelector(configs.input);
    var container = document.querySelector(configs.container);
    var btn_upload = document.querySelector(configs.btn_upload);
    var message_box = document.querySelector(configs.message_box);
    initContainer(container, configs.place_image);
    inputEvent(input, container, configs.place_image);
    btn_upload.addEventListener("click", function () {
        var files = input.files;
        var url = configs.url_server;
        uploadFiles(url, files, message_box);
    }, false);
}
function inputEvent(input, container, place_image) {
    input.addEventListener("change", function (e) {
        container.innerHTML = "";
        var files = e.target.files;
        if (files.length > 0) {
            for (var index = 0; index < files.length; index++) {
                var file = files[index];
                var img = document.createElement("img");
                var article = document.createElement("article");
                article.classList.add("image-box");
                img.src = URL.createObjectURL(file);
                article.appendChild(img);
                container.appendChild(article);
            }
        }
        else {
            initContainer(container, place_image);
        }
    });
}
function initContainer(container, place_image) {
    var img = document.createElement("img");
    var article = document.createElement("article");
    article.classList.add("image-box");
    img.setAttribute("src", place_image);
    article.appendChild(img);
    container.appendChild(article);
}
function uploadFiles(url, files, message_box) {
    var formData = new FormData();
    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
        var file = files_1[_i];
        formData.append("files[]", file);
    }
    var options = {
        method: "POST",
        body: formData
    };
    fetch(url, options)
        .then(function (response) { return response.json(); })
        .then(function (data) {
        if (typeof data.success !== "undefined") {
            message_box.classList.remove("message-error");
            message_box.classList.add("message-success");
            message_box.innerHTML = "<p>" + data.success + "</p>";
        }
        else {
            message_box.classList.remove("message-success");
            message_box.classList.add("message-error");
            message_box.innerHTML = "<p>" + data.error + "</p>";
        }
        message_box.classList.toggle("fade");
    })["catch"](function (error) { return alert(error); });
}
//# sourceMappingURL=uploaderJS.js.map