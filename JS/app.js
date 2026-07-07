document.addEventListener("DOMContentLoaded", () => {
  // 1. Inicializamos las tres capas esenciales del patrón MVC
  const model = new RoadmapModel();
  const view = new RoadmapView();
  const controller = new RoadmapController(model, view);

  // 2. Conectamos los eventos de la interfaz con las funciones del Controlador
  view.bindControlCarrusel((index) => {
    controller.handleControlCarrusel(index);
  });

  view.bindSuscripcionPlanes((tipoPlan) => {
    controller.handleActivacionPortal(tipoPlan);
  });
});
