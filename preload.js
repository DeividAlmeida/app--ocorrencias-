const templateData = [
  {
    name: "tasks",
    title: "Lista de Ações de Campo",
    tooltip:"Ações de campo",
    icon: "../../assets/occurrence.svg",
  }
];

let template,templateItens;

window.addEventListener("load", async () => {

  const element = document.getElementById("template");
  if (!element) return;

  const script = document.createElement('script');
  script.setAttribute("src",`${templateData[0].name}.js`);
  script.setAttribute("defer",true);

  await buildTemplate();
  element.innerHTML = await template;
  element.appendChild(script);
})

async function buildMenu () {
  const itens = [];
  for (const item of templateData) {
    templateItens = `
    <li>
      <a>
        <span class="tooltip">
          <span class="tooltiptext">${item.tooltip}</span>
          <img src="${item.icon}">
        </span>
      </a>
    </li>`;
    itens.push(item);
  };

  await Promise.all(itens);
}

async function buildTemplate() {
  await buildMenu();
  template = `
  <link href="../../../main.css" rel="stylesheet">
  <link href="${templateData[0].name}.css" rel="stylesheet">
  <aside class="menu-container">
    <div class="menu">
      <div class="img">
        <img src="../../assets/logo-evoy-color.png" alt="Logo Evoy">
      </div>
      <ul class="menu-itens">
        ${templateItens}
      </ul>
    </div>
  </aside>
  <main>
    <header>
      <h2>${templateData[0].title}</h2>
    </header>
  </main>`;
}