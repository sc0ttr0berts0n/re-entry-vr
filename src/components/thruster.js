AFRAME.registerComponent('thruster', {
  schema: {
    pos: { type: 'string' },
    thrusterActive: { type: 'boolean', default: false },
    lastThrusterState: { type: 'float' }
  },
  init: function() {
    const thrusterState = gameState.thrusters[this.data.pos];
    this.setThrusters(thrusterState);
  },
  update: function() {},
  tick: function(time) {
    const thrusterState = gameState.thrusters[this.data.pos];
    if (thrusterState !== this.data.lastThrusterState) {
      this.setThrusters(thrusterState);
    }
    this.data.lastThrusterState = thrusterState;
  },
  setThrusters: function(thrusterState) {
    const particleSystem = this.el.components['particle-system'];
    const emitterGroup = particleSystem.particleGroup.emitters[0];
    const maxAge = 0.1;
    // const maxOpacity = 0.5;
    if (thrusterState === 0 && emitterGroup.alive) {
      emitterGroup.disable();
    }
    if (thrusterState > 0 && !emitterGroup.alive) {
      emitterGroup.enable();
    }
    emitterGroup.maxAge.value = thrusterState * maxAge;
    // emitterGroup.opacity.value = thrusterState * maxOpacity;
  }
});
