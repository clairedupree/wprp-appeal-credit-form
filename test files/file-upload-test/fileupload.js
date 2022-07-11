// const submitButton = document.getElementById("submitButton");
// console.log(submitButton);

const form = document.querySelector("form");
console.log(form);
form.addEventListener("submit", (event) => {
  console.log(event);
  event.preventDefault();
});
