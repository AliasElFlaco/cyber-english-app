class RoadmapController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.slideActual = 0;

    // Renderizamos los datos pedagógicos
    this.view.renderFases(this.model.getFases());

    // Conectamos los escuchadores de la vista
    this.view.bindControlCarrusel(this.handleControlCarrusel.bind(this));
    this.view.bindSuscripcionPlanes(this.handleActivacionPortal.bind(this));

    // 🔄 AUTO-AVANCE INTELIGENTE: Cambia de oferta automáticamente cada 5 segundos
    this.carruselInterval = setInterval(() => {
      this.slideActual = (this.slideActual + 1) % 3;
      this.view.cambiarSlide(this.slideActual);
    }, 5000);
  }

  handleControlCarrusel(index) {
    this.slideActual = index;
    this.view.cambiarSlide(index);
  }

  handleActivacionPortal(tipoPlan) {
    // 🛑 APAGAR EL CARRUSEL: Detiene el auto-avance para siempre al entrar al portal
    clearInterval(this.carruselInterval);

    const sesionActualizada = this.model.activarSuscripcion(tipoPlan);
    this.view.activarPortalDashboard(
      sesionActualizada.username,
      sesionActualizada.plan,
    );
    console.log(
      `Ecosistema Sincronizado para ${sesionActualizada.username}. Carrusel apagado.`,
    );
  }
}
