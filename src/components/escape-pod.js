AFRAME.registerComponent('escape-pod', {
  schema: {
    state: { type: 'string', default: 'docked' }
  },
  init: function() {},

  tick: function(time) {
    const obj = this.el.object3D;
    const gs = gameState.escapePod;
    const rot = gs.rotation;

    rot.pos.x += rot.acc.x;
    rot.pos.y += rot.acc.y;
    rot.pos.z += rot.acc.z;

    rot.pos.x += (rot.target.x - rot.pos.x) * gs.lerp;
    rot.pos.y += (rot.target.y - rot.pos.y) * gs.lerp;
    rot.pos.z += (rot.target.z - rot.pos.z) * gs.lerp;

    obj.rotation.x = rot.pos.x;
    obj.rotation.y = rot.pos.y;
    obj.rotation.z = rot.pos.z;

    rot.acc.x *= gs.friction;
    rot.acc.y *= gs.friction;
    rot.acc.z *= gs.friction;
  },
  update: function() {},
  clamp: function clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
  }
});
