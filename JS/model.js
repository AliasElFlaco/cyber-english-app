class FaseRoadmap {
  constructor(id, numeroFase, semanas, titulo, meses, iconos) {
    this.id = id;
    this.numeroFase = numeroFase; // Ejemplo: "FASE 1"
    this.semanas = semanas; // Ejemplo: "W1 - W8"
    this.titulo = titulo; // Ejemplo: "Fundamentos del Acento..."
    this.meses = meses; // Array con los meses e información
    this.iconos = iconos; // Iconos decorativos inferiores
  }
}

class RoadmapModel {
  constructor() {
    // Mapeo exacto de los datos de tu segunda imagen
    this.fases = [
      new FaseRoadmap(
        1,
        "FASE 1",
        "W1 - W8",
        "Fundamentos del Acento y Gramática",
        [
          "Mes 1: Articulación Vocal y Pronunciación R",
          "Mes 2: Estructuras Básicas y Tiempos Presentes",
        ],
        ["💡", "👂"],
      ),
      new FaseRoadmap(
        2,
        "FASE 2",
        "W9 - W16",
        "Fluidez y Conversión Intermedia",
        [
          "Mes 3: Construcción de Vocabulario y Expresiones Idiomáticas",
          "Mes 4: Tiempos Pasados y Futuros con Confianza",
        ],
        ["👥", "💬"],
      ),
      new FaseRoadmap(
        3,
        "FASE 3",
        "W17 - W24",
        "Maestría Profesional y Situacional",
        [
          "Mes 5: Dominio del Subjuntivo y Condicionales",
          "Mes 6: Inglés de Negocios y Sprints de Escucha en el Mundo Real",
        ],
        ["💼", "🏆"],
      ),
    ];
  }

  obtenerFases() {
    return this.fases;
  }
}
