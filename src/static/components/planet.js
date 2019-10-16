AFRAME.registerComponent('planet', {
  init: function() {},

  tick: function(oldData) {
    // this.el.object3D.rotation.z += 0.0025;
    // this.el.object3D.rotation.y += 0.01;
    if (
      gameState.ejectLever.isTriggered &&
      this.el.object3D.position.z > 2100
    ) {
      this.el.object3D.position.z += -0.8;
    }
  },
  update: function() {}
});
