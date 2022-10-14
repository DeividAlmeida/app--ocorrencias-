const { ipcRenderer } = require("electron");
const formLogin = document.querySelector("#form-login");
const buttonSubmit = document.querySelector("button");
const emailField = formLogin.elements.email;
const passwordField = formLogin.elements.password;

emailField.focus();
formLogin.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = {
    email: emailField.value,
    password: passwordField.value
  };
  
  buttonSubmit.innerText = "Carregando...";
  const Auth  = await ipcRenderer.invoke("submitForm", formData);
  if(Auth === "Acesso negado") buttonSubmit.innerHTML = "Entrar";
});

ipcRenderer.on("submitFormError", (event,data) => {
})