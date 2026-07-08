class FaseEducativa {
  constructor(id, titulo, semanas, meses, iconos) {
    this.id = id;
    this.titulo = titulo;
    this.semanas = semanas;
    this.meses = meses;
    this.iconos = iconos;
  }
}

class EjercicioFonetico {
  constructor(
    id,
    fonema,
    titulo,
    descripcion,
    instruccionMuscular,
    ejemploPalabras,
  ) {
    this.id = id;
    this.fonema = fonema;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.instruccionMuscular = instruccionMuscular;
    this.ejemploPalabras = ejemploPalabras;
  }
}

class RoadmapModel {
  constructor() {
    this.fases = [
      new FaseEducativa(
        1,
        "Fundamentos del Acento y Gramática",
        "W1 – W8",
        [
          "Mes 1: Articulación Vocal y Pronunciación R",
          "Mes 2: Estructuras Básicas y Tiempos Presentes",
        ],
        ["fa-lightbulb", "fa-lightbulb"],
      ),
      new FaseEducativa(
        2,
        "Fluidez y Conversión Intermedia",
        "W9 – W16",
        [
          "Mes 3: Construcción de Vocabulario y Expresiones Idiomáticas",
          "Mes 4: Tiempos Pasados y Futuros con Confianza",
        ],
        ["fa-user-astronaut", "fa-cloud-bolt"],
      ),
      new FaseEducativa(
        3,
        "Maestría Profesional y Situacional",
        "W17 – W24",
        [
          "Mes 5: Dominio del Subjuntivo y Condicionales",
          "Mes 6: Inglés de Negocios y Sprints de Escucha en el Mundo Real",
        ],
        ["fa-shuttle-space", "fa-trophy"],
      ),
    ];

    this.ejercicioGimnasia = new EjercicioFonetico(
      1,
      "/æ/",
      "La vocal corta 'A' americana (La Mandíbula Caída)",
      "Sonido clave ausente en español. Es una transición física exacta entre la A y la E.",
      "Descansa y baja la mandíbula completamente al máximo como si fueras a gritar una 'A', pero intenta emitir una 'E' sostenida desde la garganta sin cerrar los labios.",
      ["Cat", "Bat", "Mad", "Apple", "Hand", "Fast"],
    );

    this.session = { isSubscribed: false, plan: null, username: "Kelvin" };
  }

  getFases() {
    return this.fases;
  }
  getEjercicioActive() {
    return this.ejercicioGimnasia;
  }

  activarSuscripcion(nombrePlan) {
    this.session.isSubscribed = true;
    this.session.plan = nombrePlan;
    return this.session;
  }
}
