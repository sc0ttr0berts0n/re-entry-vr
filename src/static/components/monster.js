AFRAME.registerComponent('monster', {
  init: function() {},

  tick: function(time) {
    const obj = this.el.object3D;
    const gs = gameState.monster;
    const rad = gs.radius;

    rad.actual += (rad.target - rad.actual) * gs.lerp;

    obj.position.z = -rad.actual;
  },
  update: function() {}
});
