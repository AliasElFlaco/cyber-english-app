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
    // ... (Mantén tu array de fases intacto arriba)

    // Estado de la Sesión del Cliente
    this.session = {
      isSubscribed: false, // Inicia sin pagar
      userRole: "VISITOR",
    };
  }

  getFases() {
    return this.fases;
  }

  // Cambia el estado al comprar
  activarSuscripcion() {
    this.session.isSubscribed = true;
    this.session.userRole = "SUBSCRIBED_CADETE";
    return this.session;
  }
}
