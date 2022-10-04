const {app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const Services  = require("./src/services/services");
var Service = new Services();
var mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    fullscreen:false,
    icon: "./src/assets/icon.png",
    webPreferences: {
      devTools:true,
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "preload.js")
    }
  })

  mainWindow.maximize();

  mainWindow.loadFile("./src/pages/login/login.html")

}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit()
})

ipcMain.on("submitForm", async function (event, data) {
  const response =  await Service.Auth(data);
  if(response.status > 299) 
    return dialog.showErrorBox("Acesso negado", "Credenciais inválidas");
  mainWindow.loadFile("./src/pages/main/main.html")
})