AFRAME.registerComponent('mothership', {
  init: function() {},

  tick: function(time) {
    var object3D = this.el.object3D;
    // this.el.object3D.rotation.z += 0.0025;
    // this.el.object3D.rotation.y += 0.01;
    // console.log(time - gameState.moments.ejectLeverPull);
    if (
      gameState.ejectLever.isTriggered &&
      time - gameState.moments.ejectLeverPull > 10000 &&
      object3D.position.z > -2100
    ) {
      if (!gameState.moments.launch) {
        gameState.moments.launch = time;
      }
      object3D.position.z += -0.2;
      object3D.position.x += 0.02;
      object3D.rotation.x += -0.002;
      // object3D.rotation.y += -0.004;
      object3D.rotation.z += 0.008;
    }
  },
  update: function() {}
});
