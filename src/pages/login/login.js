const { ipcRenderer } = require("electron");
const formLogin = document.querySelector("#form-login");
const buttonSubmit = document.querySelector("button");
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
  buttonSubmit.innerText = "Carregando...";
});

ipcRenderer.on("submitFormError", (event,data) => {
  buttonSubmit.innerHTML = "Entrar";
})