function uploaderJS(configs: any) {
  let input = document.querySelector(configs.input);
  let container = document.querySelector(configs.container);
  let btn_upload = document.querySelector(configs.btn_upload);
  let message_box = document.querySelector(configs.message_box);
  initContainer(container, configs.place_image);
  inputEvent(input, container, configs.place_image);
  btn_upload.addEventListener(
    "click",
    () => {
      let files = input.files;
      let url = configs.url_server;
      uploadFiles(url, files, message_box);
    },
    false
  );
}

function inputEvent(
  input: any,
  container: HTMLDivElement,
  place_image: string
) {
  input.addEventListener("change", (e: { target: { files: any } }) => {
    container.innerHTML = "";
    let files = e.target.files;
    if (files.length > 0) {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        let img = document.createElement("img");
        let article = document.createElement("article");
        article.classList.add("image-box");
        img.src = URL.createObjectURL(file);
        article.appendChild(img);
        container.appendChild(article);
      }
    } else {
      initContainer(container, place_image);
    }
  });
}

function initContainer(container: HTMLDivElement, place_image: string) {
  let img = document.createElement("img");
  let article = document.createElement("article");
  article.classList.add("image-box");
  img.setAttribute("src", place_image);
  article.appendChild(img);
  container.appendChild(article);
}

function uploadFiles(url: string, files: any, message_box: HTMLDivElement) {
  const formData = new FormData();
  for (const file of files) {
    formData.append("files[]", file);
  }

  let options = {
    method: "POST",
    body: formData,
  };
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      if (typeof data.success !== "undefined") {
        message_box.classList.remove("message-error");
        message_box.classList.add("message-success");
        message_box.innerHTML = "<p>" + data.success + "</p>";
      } else {
        message_box.classList.remove("message-success");
        message_box.classList.add("message-error");
        message_box.innerHTML = "<p>" + data.error + "</p>";
      }
      message_box.classList.toggle("fade");
    })
    .catch((error) => alert(error));
}
