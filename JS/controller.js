class JuegoController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // Registrar eventos del usuario
    this.view.bindSeleccionarOpcion(this.handleSeleccion.bind(this));
    this.view.bindSiguienteMision(this.handleSiguienteMision.bind(this));

    // Arrancar la primera vista
    this.actualizarPantalla();
  }

  actualizarPantalla() {
    const pregunta = this.model.getPreguntaActual();
    const score = this.model.score;
    const progreso = this.model.getProgresoPorcentaje();
    this.view.mostrarMision(pregunta, score, progreso);
  }

  handleSeleccion(respuestaSeleccionada) {
    const esCorrecta = this.model.verificarRespuesta(respuestaSeleccionada);
    const mensaje = esCorrecta
      ? "¡Transmisión decodificada con éxito! +100 PTS 🚀"
      : "Fallo en la matriz de traducción. Intenta de nuevo. 🛸";

    this.view.mostrarResultado(esCorrecta, mensaje);
  }

  handleSiguienteMision() {
    const hayMas = this.model.siguientePregunta();
    if (hayMas) {
      this.actualizarPantalla();
    } else {
      alert(
        "¡Plan Piloto Completado! Has dominado el cuadrante lingüístico. 🌌",
      );
    }
  }
}
