class RoadmapController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.slideActual = 0;

    // Amarra eventos del carrusel y de los botones de planes
    this.view.bindCambioDot(this.handleControlCarrusel.bind(this));
    this.view.bindSuscripcionPlanes(this.handleActivacionPortal.bind(this));

    // Opcional: Auto-avance del carrusel cada 6 segundos para simular ofertas
    setInterval(() => {
      if (this.slideActual !== -1) {
        // Solo si la landing sigue visible
        this.slideActual = (this.slideActual + 1) % 3;
        if (
          this.view.landingView &&
          !this.view.landingView.classList.contains("dynamic-hide")
        ) {
          this.view.cambiarSlide(this.slideActual);
        }
      }
    }, 6000);
  }

  handleControlCarrusel(index) {
    this.slideActual = index;
    this.view.cambiarSlide(index);
  }

  handleActivacionPortal(tipoPlan) {
    this.slideActual = -1; // Detiene el carrusel
    this.view.activarPortalDashboard(tipoPlan);
    console.log(`Acceso concedido al Dashboard. Plan: ${tipoPlan}`);
  }
}
