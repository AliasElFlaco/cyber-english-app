class Pregunta {
  constructor(id, frase, opciones, correcta) {
    this.id = id;
    this.frase = frase;
    this.opciones = opciones;
    this.correcta = correcta;
  }
}

class JuegoModel {
  constructor() {
    // Banco de datos simulando misiones espaciales de traducción
    this.bancoPreguntas = [
      new Pregunta(
        1,
        "I need to fix this bug as soon as possible",
        [
          "Necesito reparar este error lo antes posible",
          "Quiero cocinar algo rápido hoy",
          "Tengo que comprar una computadora nueva",
        ],
        "Necesito reparar este error lo antes posible",
      ),

      new Pregunta(
        2,
        "Let's schedule a meeting to sync our deployment",
        [
          "Vamos a comer pizza después del trabajo",
          "Programemos una reunión para sincronizar nuestro despliegue",
          "El servidor se cayó por completo",
        ],
        "Programemos una reunión para sincronizar nuestro despliegue",
      ),
    ];
    this.indiceActual = 0;
    this.score = 0;
  }

  getPreguntaActual() {
    return this.bancoPreguntas[this.indiceActual];
  }

  verificarRespuesta(respuesta) {
    const esCorrecta = this.getPreguntaActual().correcta === respuesta;
    if (esCorrecta) this.score += 100;
    return esCorrecta;
  }

  siguientePregunta() {
    if (this.indiceActual < this.bancoPreguntas.length - 1) {
      this.indiceActual++;
      return true;
    }
    return false; // No hay más preguntas
  }

  getProgresoPorcentaje() {
    return ((this.indiceActual + 1) / this.bancoPreguntas.length) * 100;
  }
}
