AFRAME.registerComponent('escape-pod', {
  init: function() {
    console.log('hello');
  },

  tick: function(time) {
    const object3D = this.el.object3D;
    const flipTime = 20000;
    if (
      time - gameState.moments.ejectLeverPull > flipTime &&
      gameState.ejectLever.isTriggered &&
      object3D.rotation.x > -3.14
    ) {
      object3D.rotation.x += -0.003;
    }
  },
  update: function() {}
});
