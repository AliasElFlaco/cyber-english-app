class RoadmapController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // Mandar a pintar las fases inmediatamente al arrancar
    this.inicializarApp();

    // Conectar el evento del botón
    this.view.bindClickComenzar(this.handleComenzarClase.bind(this));
  }

  inicializarApp() {
    const datosFases = this.model.obtenerFases();
    this.view.dibujarRoadmap(datosFases);
  }

  handleComenzarClase() {
    console.log("Iniciando transmisión de la primera clase...");
    alert("Enlazando con el módulo de la Clase 1. ¡Prepárate cadete! 🚀");
  }
}
