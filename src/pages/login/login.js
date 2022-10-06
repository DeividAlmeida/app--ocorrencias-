const { ipcRenderer } = require("electron");
const formLogin = document.querySelector("#form-login");
const emailField = formLogin.elements.email;
const passwordField = formLogin.elements.password;

emailField.focus();
formLogin.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = {
    email: emailField.value,
    password: passwordField.value
  };
  ipcRenderer.send("submitForm", formData);
});
