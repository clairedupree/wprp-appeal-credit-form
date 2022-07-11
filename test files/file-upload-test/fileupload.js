// const submitButton = document.getElementById("submitButton");
// console.log(submitButton);

const jsonData = {}; //json submit object
let fileUploads = []; //supporting documentation
let attachments = []; //supporting documentation

/**
 * Copied from pia form
 * @Desc: Handle file upload
 */
// Array.prototype.forEach.call(document.querySelectorAll(".file-upload-btn"), (button) => {
//   const hiddenInput = button.parentElement.querySelector(".file-upload-input");
//   const label = button.parentElement.querySelector(".file-upload-label");
//   const defaultLabelText = "No files chosen";
//   label.textContent = defaultLabelText;
//   label.title = defaultLabelText;
const fileInput = document.getElementById("fileInput");

// button.addEventListener("click", () => {
//   fileInput.click();
// });
fileInput.addEventListener("change", async () => {
  console.log("onchange event triggered");
  fileUploads = [];
  attachments = [];
  let fileNameList = "";
  fileNameList = Array.prototype.map.call(fileInput.files, (file) => {
    fileUploads.push(file);
    return file.name;
  });

  console.log(fileUploads.length, attachments.length);

  base64Ready();
  // label.textContent = fileNameList.join(", ") || defaultLabelText;
  // label.title = label.textContent;
});
// });

/**
 * Copied from pia form
 * @Desc: convert to base64
 */
const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Copied from pia form
 * @Desc: build base64 obj
 */
const base64Ready = () => {
  fileUploads.forEach(async (element) => {
    let getBase64 = await toBase64(element);
    let base64 = getBase64.split(",")[1];
    attachments.push({
      filename: element.name,
      base64: base64,
    });
  });
};

const form = document.querySelector("form");
console.log(form);
form.addEventListener("submit", (event) => {
  console.log(event);
  event.preventDefault();

  // base64Ready();

  console.log(fileUploads.length, attachments.length);
  jsonData.attachments = attachments;

  console.log(JSON.stringify(jsonData));
});
