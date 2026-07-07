class RoadmapView {
  constructor() {
    this.container = document.getElementById("roadmap-container");
    this.landingView = document.getElementById("view-landing");
    this.dashboardView = document.getElementById("view-dashboard");
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
      card.classList.add("phase-card");

      const monthsHTML = fase.meses.map((mes) => `<li>${mes}</li>`).join("");
      const iconsHTML = fase.iconos
        .map(
          (icono) => `
                <div class="glow-icon"><i class="fa-solid ${icono}"></i></div>
            `,
        )
        .join("");

      card.innerHTML = `
                <div>
                    <div class="phase-card-header">
                        <span class="phase-badge">FASE 0${fase.id}</span>
                        <span>${fase.semanas}</span>
                    </div>
                    <h3>${fase.titulo}</h3>
                    <ul class="phase-months-list">${monthsHTML}</ul>
                </div>
                <div class="phase-card-footer">${iconsHTML}</div>
            `;
      this.container.appendChild(card);
    });
  }

  cambiarSlide(index) {
    this.slides.forEach((slide) => slide.classList.remove("active"));
    this.dots.forEach((dot) => dot.classList.remove("active"));
    if (this.slides[index] && this.dots[index]) {
      this.slides[index].classList.add("active");
      this.dots[index].classList.add("active");
    }
  }

  activarPortalDashboard(username, nombrePlan) {
    this.landingView.classList.add("dynamic-hide");
    this.dashboardView.classList.remove("dynamic-hide");
    this.navLinks.classList.remove("dynamic-hide");

    // REESTRUCTURACIÓN: Widget de Sesión Premium Minimalista con Icono
    if (this.authContainer) {
      this.authContainer.innerHTML = `
                <div class="user-profile-wrapper">
                    <div class="user-avatar-icon">
                        <i class="fa-solid fa-user-astronaut"></i>
                    </div>
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  bindControlCarrusel(handler) {
    if (this.btnScroll) {
      this.btnScroll.addEventListener("click", () => handler(1));
    }
    this.dots.forEach((dot) => {
      dot.addEventListener("click", (e) => {
        const index = parseInt(e.target.getAttribute("data-slide"));
        handler(index);
      });
    });
  }

  bindSuscripcionPlanes(handler) {
    // Delegación de eventos infalible sobre el body
    document.body.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-subscribe-plan")) {
        e.preventDefault();
        const plan = e.target.getAttribute("data-plan");
        handler(plan);
      }
    });
  }
}
