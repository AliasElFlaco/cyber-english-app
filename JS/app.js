document.addEventListener("DOMContentLoaded", () => {
  const model = new RoadmapModel();
  const view = new RoadmapView();
  const controller = new RoadmapController(model, view);
});
