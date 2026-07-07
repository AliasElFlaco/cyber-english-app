class RoadmapView {
  constructor() {
    this.landingView = document.getElementById("view-landing");
    this.dashboardView = document.getElementById("view-dashboard");
    this.navLinks = document.getElementById("nav-dashboard-links");
    this.authBtn = document.getElementById("auth-btn");
    this.welcomeBadge = document.getElementById("welcome-user-badge");

    // Elementos de Carrusel
    this.slides = document.querySelectorAll(".carousel-slide");
    this.dots = document.querySelectorAll(".dot");
    this.btnScroll = document.querySelector(".btn-scroll-offers");
  }

  // Cambia el slide visual activo en el carrusel
  cambiarSlide(index) {
    this.slides.forEach((slide) => slide.classList.remove("active"));
    this.dots.forEach((dot) => dot.classList.remove("active"));

    this.slides[index].classList.add("active");
    this.dots[index].classList.add("active");
  }

  // Ejecuta la entrada directa al portal adaptando el rol comprado
  activarPortalDashboard(nombrePlan) {
    this.landingView.classList.add("dynamic-hide");
    this.dashboardView.classList.remove("dynamic-hide");
    this.navLinks.classList.remove("dynamic-hide");

    // REEMPLAZO COMPLETO: Construimos un perfil de usuario real simulado
    const authContainer = document.getElementById("auth-container");
    if (authContainer) {
      authContainer.innerHTML = `
                <div class="user-profile-wrapper">
                    <div class="user-avatar">CD</div>
                    <div class="user-info-meta">
                        <span class="user-name-slug">Cadete Digital</span>
                        <span class="user-plan-badge">${nombrePlan}</span>
                    </div>
                </div>
            `;
    }

    this.welcomeBadge.innerText = `Suscripción Activa: Modalidad ${nombrePlan} • Acceso Total Autorizado`;
  }

  bindCambioDot(handler) {
    this.dots.forEach((dot) => {
      dot.addEventListener("click", (e) => {
        const targetIndex = parseInt(e.target.getAttribute("data-slide"));
        handler(targetIndex);
      });
    });

    // El botón del primer slide avanza al plan autodidacta
    this.btnScroll.addEventListener("click", () => handler(1));
  }

  bindSuscripcionPlanes(handler) {
    const botonesSuscripcion = document.querySelectorAll(".btn-subscribe-plan");
    botonesSuscripcion.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const tipoPlan = e.target.getAttribute("data-plan");
        handler(tipoPlan);
      });
    });
  }
}
