class FaseEducativa {
  constructor(id, titulo, semanas, meses, iconos) {
    this.id = id;
    this.titulo = titulo;
    this.semanas = semanas;
    this.meses = meses;
    this.iconos = iconos;
  }
}

class RoadmapModel {
  constructor() {
    // Mapeo exacto basado en tu diseño de producción oficial
    this.fases = [
      new FaseEducativa(
        1,
        "Fundamentos del Acento y Gramática",
        "W1 - W8",
        [
          "Mes 1: Articulación Vocal y Pronunciación R",
          "Mes 2: Estructuras Básicas y Tiempos Presentes",
        ],
        ["fa-lightbulb", "fa-lightbulb"],
      ),
      new FaseEducativa(
        2,
        "Fluidez y Conversión Intermedia",
        "W9 - W16", // Corregido de W0 - VT6 a semanas reales
        [
          "Mes 3: Construcción de Vocabulario y Expresiones Idiomáticas",
          "Mes 4: Tiempos Pasados y Futuros con Confianza",
        ],
        ["fa-user-astronaut", "fa-cloud-flash"], // Iconos espaciales adaptados a tu gráfica
      ),
      new FaseEducativa(
        3,
        "Maestría Profesional y Situacional",
        "W17 - W24",
        [
          "Mes 5: Dominio del Subjuntivo y Condicionales",
          "Mes 6: Inglés de Negocios y Sprints de Escucha en el Mundo Real",
        ],
        ["fa-shuttle-space", "fa-trophy"],
      ),
    ];

    this.progresoUsuario = {
      leccionesCompletadas: 0,
      bloqueActual: 1,
      quizDisponible: false,
    };
  }

  getFases() {
    return this.fases;
  }

  completarLeccion() {
    this.progresoUsuario.leccionesCompletadas++;
    if (this.progresoUsuario.leccionesCompletadas % 6 === 0) {
      this.progresoUsuario.quizDisponible = true;
    }
    return this.progresoUsuario;
  }
}
