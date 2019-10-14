AFRAME.registerComponent('mothership', {
  init: function() {
    console.log('mothership init');
  },

  tick: function(time) {
    var object3D = this.el.object3D;
    // this.el.object3D.rotation.z += 0.0025;
    // this.el.object3D.rotation.y += 0.01;

    if (
      gameState.ejectLever.isTriggered &&
      time - gameState.moments.ejectLeverPull > 10000 &&
      object3D.position.z > -2100
    ) {
      object3D.position.z += -0.4;
      object3D.rotation.x += 0.002;
      object3D.rotation.y += 0.004;
      object3D.rotation.z += 0.008;
    }
  },
  update: function() {}
});
