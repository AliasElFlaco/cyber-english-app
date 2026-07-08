class RoadmapController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.slideActual = 0;
    this.isUserLoggedIn = false;

    // Renderizado
    this.view.renderFases(this.model.getFases());
    this.view.renderGimnasia(this.model.getEjercicioActive());

    // Vinculación
    this.view.bindControlCarrusel(this.handleControlCarrusel.bind(this));
    this.view.bindSuscripcionPlanes(this.handleActivacionPortal.bind(this));
    this.view.bindNavegacionInterna(
      () => this.view.navegarHaciaPestaña("map"),
      () => this.view.navegarHaciaPestaña("fonetica"),
      () => this.handleRegresoHome(),
    );

    // Intervalo
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
}
