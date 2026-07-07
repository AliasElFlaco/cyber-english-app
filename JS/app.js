document.addEventListener("DOMContentLoaded", () => {
  // 1. Inicialización de capas base del MVC
  const model = new RoadmapModel();
  const view = new RoadmapView();
  const controller = new RoadmapController(model, view);

  // 2. SOLUCCIÓN DE RAÍZ: Enlace de Clics Forzado para los Botones Comerciales
  const btnScroll = document.querySelector(".btn-scroll-offers");
  if (btnScroll) {
    btnScroll.addEventListener("click", () => {
      controller.handleControlCarrusel(1);
    });
  }

  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const index = parseInt(e.target.getAttribute("data-slide"));
      controller.handleControlCarrusel(index);
    });
  });

  const botonesSuscripcion = document.querySelectorAll(".btn-subscribe-plan");
  botonesSuscripcion.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const planSeleccionado = e.target.getAttribute("data-plan");
      controller.handleActivacionPortal(planSeleccionado);
    });
  });
});
