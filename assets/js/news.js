const rssUrl = "https://feeds.dw.com/rss-es-navidad";
const proxy = "https://api.allorigins.win/get?url=";

async function cargarNoticias() {
  const list = document.getElementById("news-feed");
  list.innerHTML = "<li>Cargando noticias…</li>";

  try {
    const res = await fetch(proxy + encodeURIComponent(rssUrl));
    if (!res.ok) throw new Error("Error en la respuesta");
    
    const data = await res.json();
    const parser = new DOMParser();
    const xml = parser.parseFromString(data.contents, "text/xml");
    const items = xml.querySelectorAll("item");

    list.innerHTML = ""; // limpiar lista

    items.forEach((item, index) => {
      if (index >= 5) return; // máximo 5 noticias

      const title = item.querySelector("title")?.textContent || "Sin título";
      const link = item.querySelector("link")?.textContent || "#";

      const li = document.createElement("li");
      li.innerHTML = `
        <a href="${link}" target="_blank" rel="noopener noreferrer">
          📰 ${title}
          <small>Fuente externa</small>
        </a>
      `;
      list.appendChild(li);
    });

  } catch (error) {
    console.error(error);
    list.innerHTML = "<li>No se pudieron cargar las noticias.</li>";
  }
}

cargarNoticias();
