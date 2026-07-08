class RoadmapView {
  constructor() {
    this.container = document.getElementById("roadmap-container");
    this.exerciseContainer = document.getElementById("fonetica-exercise-card");

    // Elementos Dinámicos SPA
    this.landingView = document.getElementById("view-landing");
    this.dashboardView = document.getElementById("view-dashboard");
    this.foneticaView = document.getElementById("view-fonetica");

    this.navLinks = document.getElementById("nav-dashboard-links");
    this.authContainer = document.getElementById("auth-container");
    this.welcomeBadge = document.getElementById("welcome-user-badge");

    this.slides = document.querySelectorAll(".carousel-slide");
    this.dots = document.querySelectorAll(".dot");
    this.btnScroll = document.querySelector(".btn-scroll-offers");
  }

  renderFases(fases) {
    if (!this.container) return;
    this.container.innerHTML = "";
    fases.forEach((fase) => {
      const card = document.createElement("div");
      card.className = "phase-card";
      const monthsHTML = fase.meses.map((mes) => `<li>${mes}</li>`).join("");
      const iconsHTML = fase.iconos
        .map(
          (ico) =>
            `<div class="glow-icon"><i class="fa-solid ${ico}"></i></div>`,
        )
        .join("");
      card.innerHTML = `
                <div>
                    <div class="phase-card-header"><span class="phase-badge">FASE 0${fase.id}</span><span>${fase.semanas}</span></div>
                    <h3>${fase.titulo}</h3>
                    <ul class="phase-months-list">${monthsHTML}</ul>
                </div>
                <div class="phase-card-footer">${iconsHTML}</div>
            `;
      this.container.appendChild(card);
    });
  }

  // Corregido: Ahora cada palabra es un botón con gatillo de audio nativo
  renderGimnasia(ejercicio) {
    if (!this.exerciseContainer) return;
    const pills = ejercicio.ejemploPalabras
      .map(
        (word) => `
            <button class="word-pill btn-listen-word" data-word="${word}">
                <i class="fa-solid fa-volume-high"></i> ${word}
            </button>
        `,
      )
      .join("");

    this.exerciseContainer.innerHTML = `
            <div>
                <div class="phase-card-header"><span class="phase-badge">FONEMA ${ejercicio.fonema}</span><span>GIMNASIA ACTIVA</span></div>
                <h3>${ejercicio.titulo}</h3>
                <p style="color: #94a3b8; font-size: 0.92rem;">${ejercicio.descripcion}</p>
                <div class="fonetica-instruction-box">
                    <strong><i class="fa-solid fa-gears"></i> Mecánica Muscular:</strong><br>${ejercicio.instruccionMuscular}
                </div>
                <h4 style="margin: 15px 0 10px 0; font-size: 0.85rem; color: #00f5d4;">Palabras de Entrenamiento (Haz clic para escuchar):</h4>
                <div class="word-pill-grid">${pills}</div>
            </div>
        `;
  }

  cambiarSlide(index) {
    this.slides.forEach((slide) => slide.classList.remove("active"));
    this.dots.forEach((dot) => dot.classList.remove("active"));
    if (this.slides[index]) this.slides[index].classList.add("active");
    if (this.dots[index]) this.dots[index].classList.add("active");
  }

  activarPortalDashboard(username, nombrePlan) {
    this.landingView.classList.add("dynamic-hide");
    this.dashboardView.classList.remove("dynamic-hide");
    this.foneticaView.classList.add("dynamic-hide");
    this.navLinks.classList.remove("dynamic-hide");

    if (this.authContainer) {
      this.authContainer.innerHTML = `
                <div class="user-profile-wrapper">
                    <div class="user-avatar-icon"><i class="fa-solid fa-user-astronaut"></i></div>
                    <div class="user-info-meta">
                        <span class="user-name-slug">${username}</span>
                        <span class="user-plan-badge">${nombrePlan}</span>
                    </div>
                </div>
            `;
    }
    if (this.welcomeBadge) {
      this.welcomeBadge.innerText = `Suscripción Activa: Modalidad ${nombrePlan} • Acceso Total Autorizado`;
    }
  }

  navegarHaciaPestaña(targetViewId) {
    this.dashboardView.classList.add("dynamic-hide");
    this.foneticaView.classList.add("dynamic-hide");
    document
      .querySelectorAll(".nav-item")
      .forEach((item) => item.classList.remove("active"));

    if (targetViewId === "map") {
      this.dashboardView.classList.remove("dynamic-hide");
      document.getElementById("link-map").classList.add("active");
    } else if (targetViewId === "fonetica") {
      this.foneticaView.classList.remove("dynamic-hide");
      document.getElementById("link-fonetica").classList.add("active");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  bindControlCarrusel(handler) {
    if (this.btnScroll)
      this.btnScroll.addEventListener("click", () => handler(1));
    this.dots.forEach((dot) =>
      dot.addEventListener("click", (e) =>
        handler(parseInt(e.target.getAttribute("data-slide"))),
      ),
    );
  }

  bindSuscripcionPlanes(handler) {
    document.body.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-subscribe-plan")) {
        e.preventDefault();
        handler(e.target.getAttribute("data-plan"));
      }
    });
  }

  bindNavegacionInterna(handlerMap, handlerFonetica, handlerLogo) {
    document.getElementById("link-map").addEventListener("click", (e) => {
      e.preventDefault();
      handlerMap();
    });
    document.getElementById("link-fonetica").addEventListener("click", (e) => {
      e.preventDefault();
      handlerFonetica();
    });
    document
      .getElementById("nav-logo-trigger")
      .addEventListener("click", (e) => {
        e.preventDefault();
        handlerLogo();
      });
  }

  // Habilitadores de audio y micro para interactividad directa
  bindEscucharPalabra(handler) {
    document.body.addEventListener("click", (e) => {
      const botonPalabra = e.target.closest(".btn-listen-word");
      if (botonPalabra) {
        e.preventDefault();
        handler(botonPalabra.getAttribute("data-word"));
      }
    });
  }

  bindCapturaMicrofono(handler) {
    const btnRecord = document.getElementById("btn-record-fonetica");
    if (btnRecord) {
      btnRecord.addEventListener("click", (e) => {
        e.preventDefault();
        handler(btnRecord);
      });
    }
  }
}
