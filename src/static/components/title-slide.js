AFRAME.registerComponent('title-slide', {
  init: function() {},
  update: function() {},

  tick: function(oldData) {
    if (!gameState.titleSlide.isActive && !gameState.titleSlide.finished) {
      if (gameState.titleSlide.opacity > 0 && !gameState.titleSlide.finished) {
        this.el.setAttribute('opacity', gameState.titleSlide.opacity);
        gameState.titleSlide.opacity += -0.015;
        if (gameState.titleSlide.opacity <= 0) {
          gameState.titleSlide.finished = true;
          this.el.parentNode.removeChild(this.el);
        }
      }
    }
    // model.rotation.z += 0.0025;
    // model.rotation.y += 0.01;
  }
});
