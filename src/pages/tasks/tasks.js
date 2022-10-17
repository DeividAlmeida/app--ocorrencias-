const { ipcRenderer } = require("electron");
const tasksBody = [];
buildTable();

document.querySelector("#app-update").onclick = async function (event){
  event.target.innerText = "Atualizando...";
  await ipcRenderer.invoke("tasks/post", tasksBody);
  event.target.innerText = "Atualizar App de Campo";
}

async function buildTable() {
  const generalInfo = await ipcRenderer.invoke("getGeneralInfo");
  const table = document.querySelector(".table-body");

  generalInfo.forEach(async (item, index)=>{
    const data = {};
    data.family = item.family_code;
    data.serial = item.serial;
    data.serial_suffix = serialSuffix(item.serial);
    data.tag = item.tag;
    data.box_label = await boxLabel(item.tag);
    data.last_message = item.date;
    
    const row = table.insertRow(index);
    row.insertCell(0).innerHTML = data.family;
    row.insertCell(1).innerHTML = data.serial;
    row.insertCell(2).innerHTML = data.tag;
    row.insertCell(3).innerHTML = data.box_label;
    row.insertCell(4).innerHTML = convertedTime(data.last_message);
  
    tasksBody.push(data)
  });
}
  
function convertedTime(time) {
  const options = {
    year: "numeric", month: "numeric", day: "numeric",
    hour: "numeric", minute: "numeric", second: "numeric",
    hour12: false,
    timeZone: "America/Sao_Paulo"
  };
  const date = new Date(time);

  return new Intl.DateTimeFormat('pt-BR', options).format(date);
}

async function boxLabel(tag) { 
  const legacyData = await ipcRenderer.invoke("getLegacyData", tag);
  if (!legacyData || legacyData.Etiqueta == ""){
    return tagConverted(tag)
  } 
  return legacyData.Etiqueta;
}

function tagConverted(tag) {
  if (tag > 0 ) return parseInt(tag).toString(16).toUpperCase();
  return parseInt(tag, 16);
}

function serialSuffix(seria) {
  return seria.replace(/[0-9]/g, '');
}