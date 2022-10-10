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
  let Auth, reportsAuth, reportsSettings, reportsGeneralInfo;
  try {
    Auth =  await Service.Auth(data);
    mainWindow.loadFile("./src/pages/tasks/tasks.html")
  } catch (error) {
    event.sender.send("submitFormError");
    return dialog.showErrorBox("Acesso negado", `${error}`);
  }
  
  try {    
    reportsAuth = await Service.reportsAuth(data);
    reportsSettings = await Service.reportsSettings(reportsAuth.data.accessToken);
    reportsGeneralInfo = await Service.reportsGeneralInfo(reportsAuth.data.accessToken);
    const filtedGeneralInfo = await Service.filtedGeneralInfo(reportsGeneralInfo.data, reportsSettings.data);
    event.sender.send("GeneralInfo", filtedGeneralInfo);
  } catch (error) {
    return dialog.showErrorBox("Erro", `${error}`);
  }
})