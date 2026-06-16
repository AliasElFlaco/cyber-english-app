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

    // Inicializar el contexto de audio del navegador
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  // Sintetizador de sonido galáctico para el Hover (Tono suave ascendente)
  playHoverSound() {
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = "sine"; // Onda suave
    osc.frequency.setValueAtTime(400, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(
      800,
      this.audioCtx.currentTime + 0.15,
    );

    gain.gain.setValueAtTime(0.03, this.audioCtx.currentTime); // Volumen bajo para que no sature
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      this.audioCtx.currentTime + 0.15,
    );

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.15);
  }

  // Sintetizador de sonido para el Click (Efecto láser digital)
  playClickSound() {
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = "triangle"; // Onda más digital
    osc.frequency.setValueAtTime(880, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(
      110,
      this.audioCtx.currentTime + 0.2,
    );

    gain.gain.setValueAtTime(0.1, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      this.audioCtx.currentTime + 0.2,
    );

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.2);
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

      // Escuchar el Hover para activar el sonido galáctico
      btn.addEventListener("mouseenter", () => this.playHoverSound());

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
        this.playClickSound(); // Sonido al hacer click
        handler(e.target.textContent);
      }
    });
  }

  bindSiguienteMision(handler) {
    this.btnNext.addEventListener("click", () => {
      this.playClickSound();
      handler();
    });
  }
}
