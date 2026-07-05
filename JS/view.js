class RoadmapView {
  constructor() {
    // Seleccionamos el contenedor que actualmente está vacío en tu HTML
    this.container = document.getElementById("roadmap-container");
    this.btnComenzar = document.getElementById("start-mission-btn");
  }

  // Generador dinámico de tarjetas de cristal líquido
  dibujarRoadmap(fases) {
    this.container.innerHTML = ""; // Limpiamos carga inicial

    fases.forEach((fase) => {
      // 1. Crear la tarjeta principal
      const card = document.createElement("article");
      card.classList.add("phase-card");

      // 2. Construir la lista de meses dinámicamente
      let mesesHTML = "";
      fase.meses.forEach((mes) => {
        mesesHTML += `<li>${mes}</li>`;
      });

      // 3. Estructurar el esqueleto interno con los datos del modelo
      card.innerHTML = `
                <div class="phase-card-header">
                    <span class="phase-badge">${fase.numeroFase}</span>
                    <span class="phase-weeks">${fase.semanas}</span>
                </div>
                <h3>${fase.titulo}</h3>
                <ul class="phase-months-list">
                    ${mesesHTML}
                </ul>
                <div class="phase-card-footer">
                    <div class="glow-icon">${fase.iconos[0]}</div>
                    <div class="glow-icon">${fase.iconos[1]}</div>
                </div>
            `;

      // 4. Inyectar la tarjeta en la rejilla del documento
      this.container.appendChild(card);
    });
  }

  // Escuchador profesional para el botón inferior
  bindClickComenzar(handler) {
    this.btnComenzar.addEventListener("click", handler);
  }
}
