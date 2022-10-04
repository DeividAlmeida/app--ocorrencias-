const { ipcRenderer } = require("electron");
const formLogin = document.querySelector("#form-login");
formLogin.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = {
    email: formLogin.elements.email.value,
    password: formLogin.elements.password.value
  };
  ipcRenderer.send("submitForm", formData);
});
