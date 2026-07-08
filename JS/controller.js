class RoadmapController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.slideActual = 0;
    this.isUserLoggedIn = false;

    // Variables de control de hardware de audio
    this.mediaRecorder = null;
    this.isRecording = false;

    // Renderizado
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

    // Conexión de herramientas fonéticas interactivas
    this.view.bindEscucharPalabra(this.handlePronunciacionNativa.bind(this));
    this.view.bindCapturaMicrofono(this.handleGrabacionUsuario.bind(this));

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

  // 🔥 SISTEMA 1: Motor de Pronunciación Nativa Americana (Text-To-Speech)
  handlePronunciacionNativa(palabra) {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(palabra);
      utterance.lang = "en-US"; // Fuerza el acento nativo americano
      utterance.rate = 0.85; // Velocidad ligeramente reducida para captar la gesticulación muscular
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Tu navegador no soporta síntesis de voz.");
    }
  }

  // 🔥 SISTEMA 2: Capturador del Micrófono Físico (MediaRecorder API)
  async handleGrabacionUsuario(botonElemento) {
    if (!this.isRecording) {
      try {
        // Solicita autorización de hardware al sistema operativo
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.start();

        this.isRecording = true;
        botonElemento.innerHTML = `<i class="fa-solid fa-stop"></i> DETENER SPRINT`;
        botonElemento.style.background = "#ef4444"; // Muta a rojo de grabación activa
        botonElemento.style.boxShadow = "0 0 20px rgba(239, 68, 68, 0.5)";
        console.log("Capturador de audio encendido. Entrenando...");
      } catch (err) {
        alert(
          "Error al acceder al micrófono. Por favor, concede los permisos en la barra de direcciones.",
        );
        console.error(err);
      }
    } else {
      // Detiene la captura física de audio
      if (this.mediaRecorder) {
        this.mediaRecorder.stop();
        // Apaga los canales del micrófono para liberar el hardware
        this.mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      }

      this.isRecording = false;
      botonElemento.innerHTML = `<i class="fa-solid fa-microphone"></i> CAPTURAR AUDIO`;
      botonElemento.style.background = "var(--light-turquoise)";
      botonElemento.style.boxShadow = "0 0 25px rgba(0, 245, 212, 0.4)";
      console.log("Sprint finalizado con éxito. Audio procesado.");
    }
  }
}
