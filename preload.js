
window.addEventListener("DOMContentLoaded", async () => {
  const element = document.getElementById("template");
  
  if (!element) return;

  const templateData = [
    {
      title: "Lista de Ações de Campo",
      tooltip:"Ações de campo",
      icon: "../../assets/occurrence.svg",
    }
  ];
  let template,templateItens ;

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
      <link rel="stylesheet" href="../../../main.css">
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
    await buildTemplate();
      element.innerHTML= template;
})
