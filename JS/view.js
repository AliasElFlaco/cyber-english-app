class RoadmapView {
  constructor() {
    // Elementos de navegación y flujo SPA
    this.landingView = document.getElementById("view-landing");
    this.dashboardView = document.getElementById("view-dashboard");
    this.navLinks = document.getElementById("nav-dashboard-links");
    this.authContainer = document.getElementById("auth-container");
    this.welcomeBadge = document.getElementById("welcome-user-badge");

    // Elementos del Carrusel de Ofertas
    this.slides = document.querySelectorAll(".carousel-slide");
    this.dots = document.querySelectorAll(".dot");
    this.btnScroll = document.querySelector(".btn-scroll-offers");
  }

  // Cambia el slide visual activo en el carrusel de StarZ
  cambiarSlide(index) {
    this.slides.forEach((slide) => slide.classList.remove("active"));
    this.dots.forEach((dot) => dot.classList.remove("active"));

    if (this.slides[index] && this.dots[index]) {
      this.slides[index].classList.add("active");
      this.dots[index].classList.add("active");
    }
  }

  // Ejecuta la metamorfosis: Apaga la landing, muestra el portal e inyecta a Kelvin
  activarPortalDashboard(nombrePlan) {
    this.landingView.classList.add("dynamic-hide");
    this.dashboardView.classList.remove("dynamic-hide");
    this.navLinks.classList.remove("dynamic-hide");

    // Transforma el botón de REGISTER en el Perfil Premium de Kelvin
    if (this.authContainer) {
      this.authContainer.innerHTML = `
                <div class="user-profile-wrapper">
                    <div class="user-avatar">K</div>
                    <div class="user-info-meta">
                        <span class="user-name-slug">Kelvin</span>
                        <span class="user-plan-badge">${nombrePlan}</span>
                    </div>
                </div>
            `;
    }

    // Inyecta el mensaje de bienvenida con el plan en el subtítulo del Dashboard
    if (this.welcomeBadge) {
      this.welcomeBadge.innerText = `Suscripción Activa: Modalidad ${nombrePlan} • Acceso Total Autorizado`;
    }
  }

  // Escucha los clics de los puntitos y del botón de entrada del carrusel
  bindControlCarrusel(handler) {
    if (this.btnScroll) {
      this.btnScroll.addEventListener("click", () => {
        handler(1); // Brinca directo al slide del Plan Autodidacta
      });
    }

    this.dots.forEach((dot) => {
      dot.addEventListener("click", (e) => {
        const index = parseInt(e.target.getAttribute("data-slide"));
        handler(index);
      });
    });
  }

  // Escucha los clics de los botones de compra de los planes
  bindSuscripcionPlanes(handler) {
    const botonesSuscripcion = document.querySelectorAll(".btn-subscribe-plan");
    botonesSuscripcion.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const planSeleccionado = e.target.getAttribute("data-plan");
        handler(planSeleccionado);
      });
    });
  }
}
