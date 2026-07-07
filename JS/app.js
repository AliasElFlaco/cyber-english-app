// Clase para moldear la estructura de cada Fase del Roadmap
class FaseEducativa {
  constructor(id, titulo, semanas, meses, iconos) {
    this.id = id; // ID de la fase (e.g., 1, 2, 3)
    this.titulo = titulo; // Título principal de la fase
    this.semanas = semanas; // Rango de semanas (e.g., "W1 - W8")
    this.meses = meses; // Array con los objetivos de cada mes
    this.iconos = iconos; // Array con las clases de iconos de Font Awesome
  }
}

class RoadmapModel {
  constructor() {
    // Mapeo real del plan piloto de 24 semanas (6 meses)
    this.fases = [
      new FaseEducativa(
        1,
        "Fundamentos del Acento y Gramática",
        "W1 - W8",
        [
          "Mes 1: Articulación Vocal y Pronunciación R",
          "Estructuras Básicas y Tiempos Presentes",
        ],
        ["fa-lightbulb", "fa-ear-listen"],
      ),
      new FaseEducativa(
        2,
        "Fluidez y Conversión Intermedia",
        "W9 - W16",
        [
          "Mes 3: Construcción de Vocabulario y Expresiones Idiomáticas",
          "Mes 4: Tiempos Pasados y Futuros con Confianza",
        ],
        ["fa-users", "fa-comments"],
      ),
      new FaseEducativa(
        3,
        "Maestría Profesional y Situacional",
        "W17 - W24",
        [
          "Mes 5: Dominio del Subjuntivo y Condicionales",
          "Mes 6: Inglés de Negocios y Sprints de Escucha en el Mundo Real",
        ],
        ["fa-briefcase", "fa-trophy"],
      ),
    ];

    // Estado del progreso del estudiante (Simulación Backend)
    this.progresoUsuario = {
      leccionesCompletadas: 0,
      bloqueActual: 1,
      quizDisponible: false,
    };
  }

  getFases() {
    return this.fases;
  }

  // Lógica de control de flujo: El quiz solo se desbloquea tras 6 lecciones
  completarLeccion() {
    this.progresoUsuario.leccionesCompletadas++;
    if (this.progresoUsuario.leccionesCompletadas % 6 === 0) {
      this.progresoUsuario.quizDisponible = true;
    }
    return this.progresoUsuario;
  }
}
