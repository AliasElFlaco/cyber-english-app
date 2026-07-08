class RoadmapController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.slideActual = 0;
    this.isUserLoggedIn = false;

    // Motores de Audio y Reconocimiento Fonético
    this.recognition = null;
    this.isRecording = false;
    this.transcripcionUsuario = "";

    // Renderizado Inicial
    this.view.renderFases(this.model.getFases());
    this.view.renderGimnasia(this.model.getEjercicioActive());

    // Vinculación de eventos core
    this.view.bindControlCarrusel(this.handleControlCarrusel.bind(this));
    this.view.bindSuscripcionPlanes(this.handleActivacionPortal.bind(this));
    this.view.bindNavegacionInterna(
      () => this.view.navegarHaciaPestaña("map"),
      () => this.view.navegarHaciaPestaña("fonetica"),
      () => this.handleRegresoHome(),
    );

    // Conexión de herramientas fonéticas
    this.view.bindEscucharPalabra(this.handlePronunciacionNativa.bind(this));
    this.view.bindCapturaMicrofono(this.handleGrabacionUsuario.bind(this));

    // Configuración Inicial del Motor de Reconocimiento de Voz
    this.inicializarMotorReconocimiento();

    // Intervalo del Carrusel
    this.carruselInterval = setInterval(() => {
      if (!this.isUserLoggedIn) {
        this.slideActual = (this.slideActual + 1) % 3;
        this.view.cambiarSlide(this.slideActual);
      }
    }, 5000);
  }

  handleControlCarrusel(index) {
    this.slideActual = index;
    this.view.cambiarSlide(index);
  }

  handleActivacionPortal(tipoPlan) {
    this.isUserLoggedIn = true;
    clearInterval(this.carruselInterval);
    const sesion = this.model.activarSuscripcion(tipoPlan);
    this.view.activarPortalDashboard(sesion.username, sesion.plan);
  }

  handleRegresoHome() {
    if (!this.isUserLoggedIn) {
      this.view.landingView.classList.remove("dynamic-hide");
      this.view.dashboardView.classList.add("dynamic-hide");
      this.view.foneticaView.classList.add("dynamic-hide");
      this.view.navLinks.classList.add("dynamic-hide");
    }
  }

  // 🔊 Motor de Pronunciación Nativa Americana (Text-To-Speech)
  handlePronunciacionNativa(palabra) {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(palabra);
      utterance.lang = "en-US";
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  }

  // 🤖 Inicialización de la API de Reconocimiento de Voz
  inicializarMotorReconocimiento() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = "en-US"; // Evalúa bajo los estándares del inglés americano
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;

      this.recognition.onresult = (event) => {
        this.transcripcionUsuario = event.results[0][0].transcript
          .toLowerCase()
          .trim();
        console.log(`Transcripción detectada: "${this.transcripcionUsuario}"`);
        this.validarPronunciacion();
      };

      this.recognition.onerror = (err) => {
        console.error("Error en el reconocimiento de voz: ", err.error);
        if (err.error === "not-allowed") {
          alert(
            "Acceso denegado al micrófono. Concede los permisos en el navegador.",
          );
        }
      };
    } else {
      console.warn(
        "Este navegador no soporta SpeechRecognition de forma nativa.",
      );
    }
  }

  // 🎙️ Capturador Inteligente del Micrófono Físico
  handleGrabacionUsuario(botonElemento) {
    if (!this.recognition) {
      alert(
        "El reconocimiento de voz no está disponible en este navegador. Te recomendamos usar Google Chrome.",
      );
      return;
    }

    // Remover feedback visual previo de validación si existe
    const targetCard = document.querySelector(".voice-sprint-panel");
    if (targetCard)
      targetCard.classList.remove("approved-flash", "rejected-flash");

    if (!this.isRecording) {
      this.transcripcionUsuario = "";
      this.recognition.start();
      this.isRecording = true;

      botonElemento.innerHTML = `<i class="fa-solid fa-stop"></i> DETENER SPRINT`;
      botonElemento.style.background = "#ef4444";
      botonElemento.style.boxShadow = "0 0 20px rgba(239, 68, 68, 0.5)";

      // Animación activa de las ondas
      document
        .querySelectorAll(".visualizer-mock .bar")
        .forEach((bar) => (bar.style.animationPlayState = "running"));
    } else {
      this.recognition.stop();
      this.isRecording = false;

      botonElemento.innerHTML = `<i class="fa-solid fa-microphone"></i> CAPTURAR AUDIO`;
      botonElemento.style.background = "var(--light-turquoise)";
      botonElemento.style.boxShadow = "0 0 25px rgba(0, 245, 212, 0.4)";

      // Pausar animación de ondas
      document
        .querySelectorAll(".visualizer-mock .bar")
        .forEach((bar) => (bar.style.animationPlayState = "paused"));
    }
  }

  // 🎯 Motor Evaluador Pedagógico
  validarPronunciacion() {
    const ejercicioActive = this.model.getEjercicioActive();
    const palabrasClave = ejercicioActive.ejemploPalabras.map((word) =>
      word.toLowerCase(),
    );
    const targetCard = document.querySelector(".voice-sprint-panel");

    // Comprueba si la transcripción contiene alguna de las palabras del entrenamiento
    const exito = palabrasClave.some((palabra) =>
      this.transcripcionUsuario.includes(palabra),
    );

    if (targetCard) {
      if (exito) {
        targetCard.classList.add("approved-flash");
        console.log("¡Pronunciación Aprobada!");

        // Pequeño sonido de éxito simulado por la API de voz
        const approvalAudio = new SpeechSynthesisUtterance(
          "Excellent, Kelvin!",
        );
        approvalAudio.lang = "en-US";
        approvalAudio.rate = 1.1;
        window.speechSynthesis.speak(approvalAudio);
      } else {
        targetCard.classList.add("rejected-flash");
        console.log("Pronunciación no reconocida. Intenta de nuevo.");
      }
    }
  }
}
