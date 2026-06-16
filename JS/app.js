document.addEventListener("DOMContentLoaded", () => {
  const model = new JuegoModel();
  const view = new JuegoView();
  const controller = new JuegoController(model, view);
});
