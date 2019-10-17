AFRAME.registerComponent('eject-lever', {
  schema: {
    isHovered: { type: 'boolean' },
    parent: { type: 'selector' },
    leverPullAudio: { type: 'audio', default: '#ship-launch' }
  },
  init: function() {},

  tick: function(oldData) {
    if (this.data.isHovered) {
      if (
        this.data.isHovered &&
        !gameState.ejectLever.isTriggered &&
        gameState.ejectLever.grabHandEl
      ) {
        gameState.ejectLever.grabCurrentHeight =
          gameState.ejectLever.grabHandEl.object3D.position.y;
        gameState.ejectLever.calcAngle();
        this.el.object3D.rotation.x = gameState.ejectLever.angle;
      }
    }
    if (gameState.ejectLever.isTriggered) {
      if (!gameState.ejectLever.launchAudioPlayed) {
        gameState.ejectLever.launchAudioPlayed = true;
        const sound = document.querySelector('#ship-launch-entity');
        sound.components.sound.playSound();
      }
      if (gameState.ejectLever.angle > 0) {
        gameState.ejectLever.angle += -0.025;
        this.el.object3D.rotation.x = gameState.ejectLever.angle;
      }
    }
  },
  tock: function() {},
  update: function() {
    // if (this.data.isHovered) {
    //   this.el.setAttribute('material', 'emissiveIntensity', 0.3);
    // } else {
    //   this.el.setAttribute('material', 'emissiveIntensity', 0);
    // }
  },
  play: function() {
    this.el.addEventListener('grab-start', this.onGrabStart);
    this.el.addEventListener('grab-end', this.onGrabEnd);
  },
  onGrabStart: function(e) {
    const hand = e.detail.hand;
    gameState.ejectLever.grabStartHeight = e.detail.hand.object3D.position.y;
    gameState.ejectLever.grabHandEl = hand;
    if (!gameState.ejectLever.isTriggered) {
      e.detail.target.setAttribute('eject-lever', 'isHovered', true);
    }
  },
  onGrabEnd: function(e) {
    if (!gameState.ejectLever.isTriggered) {
      e.detail.target.setAttribute('eject-lever', 'isHovered', false);
    }
  }
});
