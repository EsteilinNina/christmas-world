const rssUrl = "https://feeds.bbci.co.uk/mundo/rss.xml";
const proxy = "https://api.allorigins.win/get?url=";

document.addEventListener("DOMContentLoaded", async () => {
  const feed = document.getElementById("news-feed");
  if (!feed) return;

  feed.innerHTML = "<li>Cargando noticias…</li>";

  try {
    const res = await fetch(proxy + encodeURIComponent(rssUrl));
    const data = await res.json();

    const parser = new DOMParser();
    const xml = parser.parseFromString(data.contents, "text/xml");
    const items = xml.querySelectorAll("item");

    feed.innerHTML = "";

    items.forEach((item, i) => {
      if (i >= 5) return;

      const title = item.querySelector("title")?.textContent;
      const link = item.querySelector("link")?.textContent;

      const li = document.createElement("li");
      li.innerHTML = `
        <a href="${link}" target="_blank" rel="noopener">
          📰 ${title}
          <small>Fuente externa</small>
        </a>
      `;
      feed.appendChild(li);
    });

  } catch (e) {
    feed.innerHTML = "<li>No se pudieron cargar las noticias.</li>";
  }
});
