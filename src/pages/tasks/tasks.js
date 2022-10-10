const { ipcRenderer } = require("electron");
ipcRenderer.on("GeneralInfo", (event, data) =>{
  const table = document.querySelector(".table-body");
  data.forEach((item, index)=>{
    const row = table.insertRow(index);
    const family = row.insertCell(0);
    const serial = row.insertCell(1);
    const tag = row.insertCell(2);
    const lastMessage = row.insertCell(3);

    family.innerHTML = item.family_code;
    serial.innerHTML = item.serial;
    tag.innerHTML = item.tag;
    lastMessage.innerHTML = convertedTime(item.date);
  });
});

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