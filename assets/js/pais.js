const params = new URLSearchParams(window.location.search);
const paisKey = params.get("pais");

fetch("../data/paises.json")
  .then(res => res.json())
  .then(data => {
    if (!data[paisKey]) return;

    const pais = data[paisKey];

    document.documentElement.lang = pais.lang;
    document.getElementById("meta-title").textContent = pais.titulo;
    document.getElementById("meta-description")
      .setAttribute("content", pais.descripcion);

    document.getElementById("titulo").textContent = `🎄 ${pais.titulo}`;
    document.getElementById("descripcion").textContent = pais.descripcion;
    document.getElementById("tradiciones").textContent = pais.tradiciones;
    document.getElementById("saludo").textContent = pais.saludo;

    const comidaList = document.getElementById("comida");
    pais.comida.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      comidaList.appendChild(li);
    });
  });
