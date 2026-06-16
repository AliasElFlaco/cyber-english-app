class JuegoView {
  constructor() {
    this.txtFrase = document.getElementById("phrase-to-translate");
    this.containerOpciones = document.getElementById("options-container");
    this.barraProgreso = document.getElementById("progress-bar");
    this.hudScore = document.getElementById("hud-score");
    this.hudStatus = document.getElementById("hud-status");
    this.panelFeedback = document.getElementById("feedback-panel");
    this.msgFeedback = document.getElementById("feedback-message");
    this.btnNext = document.getElementById("next-btn");
  }

  mostrarMision(pregunta, score, progreso) {
    this.panelFeedback.classList.add("hidden");
    this.txtFrase.textContent = pregunta.frase;
    this.hudScore.textContent = `SCORE: ${String(score).padStart(3, "0")}`;
    this.barraProgreso.style.width = `${progreso}%`;
    this.hudStatus.textContent = "SISTEMA: EN LÍNEA";
    this.hudStatus.style.color = "var(--deep-turquoise)";

    this.containerOpciones.innerHTML = "";
    pregunta.opciones.forEach((opcion) => {
      const btn = document.createElement("button");
      btn.classList.add("option-btn");
      btn.textContent = opcion;
      this.containerOpciones.appendChild(btn);
    });
  }

  mostrarResultado(esCorrecto, msg) {
    this.panelFeedback.classList.remove("hidden");
    this.msgFeedback.textContent = msg;

    if (esCorrecto) {
      this.msgFeedback.style.color = "var(--electric-blue)";
      this.hudStatus.textContent = "SISTEMA: SINCRONIZADO";
      this.hudStatus.style.color = "var(--electric-blue)";
    } else {
      this.msgFeedback.style.color = "#ff3366";
      this.hudStatus.textContent = "SISTEMA: ERROR DE ENLACE";
      this.hudStatus.style.color = "#ff3366";
    }
  }

  bindSeleccionarOpcion(handler) {
    this.containerOpciones.addEventListener("click", (e) => {
      if (e.target.classList.contains("option-btn")) {
        handler(e.target.textContent);
      }
    });
  }

  bindSiguienteMision(handler) {
    this.btnNext.addEventListener("click", handler);
  }
}
