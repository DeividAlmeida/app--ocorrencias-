const {app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const Services  = require("./src/services/services");
const LegacyData = require("./src/stores/legacy_data.json");
var Service = new Services();
var mainWindow;
let Auth, reportsAuth, reportsSettings, reportsGeneralInfo;

function createWindow () {
  mainWindow = new BrowserWindow({
    title: "Evoy Ocorrências 1.0.0",
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

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit()
})

ipcMain.handle("submitForm", async (res, req) => {
  try {
    Auth =  await Service.Auth(req);
    reportsAuth = await Service.reportsAuth(req);
    reportsSettings = await Service.reportsSettings(reportsAuth.data.accessToken);
    res.returnValue = await  reportsSettings;
    
    mainWindow.loadFile("./src/pages/tasks/tasks.html")
  } catch (error) {
    dialog.showErrorBox("Acesso negado", `${error}`);
    return "Acesso negado";
  }
})

ipcMain.handle("getGeneralInfo", async (res, req) => {
  try {
    reportsGeneralInfo = await Service.reportsGeneralInfo(reportsAuth.data.accessToken);
    return await Service.filtedGeneralInfo(reportsGeneralInfo.data, reportsSettings.data);
  } catch (error) {
    return dialog.showErrorBox("Erro", `${error}`);
  }
})

ipcMain.handle("getLegacyData", async (res, req) => {
  try {
    return await LegacyData.find( device => device.TAG === req);
  } catch (error) {
    return dialog.showErrorBox("Erro", `${error}`);
  }
})

ipcMain.handle("tasks/post", async (res, req) => {
  try {
    await Service.tasksPost(Auth.data.accessToken, req);
    dialog.showMessageBox(mainWindow, {
      message: "App atualizado com sucesso!",
    })
  } catch (error) {
    dialog.showErrorBox("Erro", `${error}`);
  }
})
