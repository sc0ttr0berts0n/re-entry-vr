AFRAME.registerComponent('mothership-fire', {
  schema: {
    lastState: { type: 'boolean', default: false }
  },
  init: function() {
    const particleSystem = this.el.components['particle-system'];
    const emitterGroup = particleSystem.particleGroup.emitters[0];
    emitterGroup.disable();
  },

  tick: function(time) {
    const particleSystem = this.el.components['particle-system'];
    const emitterGroup = particleSystem.particleGroup.emitters[0];

    if (gameState.mothershipFire.enabled !== this.data.lastState) {
      this.data.lastState = gameState.mothershipFire.enabled;

      if (this.data.lastState) {
        emitterGroup.enable();
      } else {
        emitterGroup.disable();
      }
    }
  },
  update: function() {}
});
