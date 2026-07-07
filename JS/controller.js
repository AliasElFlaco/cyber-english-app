class RoadmapController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // Renderizamos los datos pedagógicos del modelo en segundo plano
    this.view.renderFases(this.model.getFases());

    // Conectamos los escuchadores limpios de la vista
    this.view.bindControlCarrusel(this.handleControlCarrusel.bind(this));
    this.view.bindSuscripcionPlanes(this.handleActivacionPortal.bind(this));
  }

  handleControlCarrusel(index) {
    this.view.cambiarSlide(index);
  }

  handleActivacionPortal(tipoPlan) {
    const sesionActualizada = this.model.activarSuscripcion(tipoPlan);
    this.view.activarPortalDashboard(
      sesionActualizada.username,
      sesionActualizada.plan,
    );
    console.log(
      `Ecosistema Sincronizado para ${sesionActualizada.username}. Portal Activo.`,
    );
  }
}
