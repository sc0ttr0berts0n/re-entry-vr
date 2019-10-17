AFRAME.registerComponent('planet', {
  schema: {
    flightDuration: { type: 'int' },
    planetTravel: { type: 'int' },
    planetStart: { type: 'int' }
  },
  init: function() {},
  update: function() {
    this.data.flightDuration = 1000 * 60 * 2.75;
    this.data.planetTravel = 4900;
    this.data.planetStart = this.el.object3D.position.z;
  },
  tick: function(time) {
    // this.el.object3D.rotation.z += 0.0025;
    // this.el.object3D.rotation.y += 0.01;

    // planet advancing
    if (
      gameState.ejectLever.isTriggered &&
      this.el.object3D.position.z > 2001
    ) {
      const leverPull = gameState.moments.ejectLeverPull;
      const offsetTime = time - leverPull;
      const flightPercent = offsetTime / this.data.flightDuration;
      const planetPos = this.data.planetTravel * flightPercent;
      this.el.object3D.position.z = this.data.planetStart - planetPos;
    }

    // reentry tilt
    if (
      this.el.object3D.position.z < 3000 &&
      !gameState.escapePod.reentryTilt
    ) {
      gameState.escapePod.reentryTilt = true;
      gameState.escapePod.setTarget(-Math.PI / 2, Math.PI / 8, 0);
      gameState.monster.setTarget(-Math.PI / 2, 0, 0, 5);
    }

    // actual reentry
    if (this.el.object3D.position.z < 2500 && !gameState.escapePod.reentry) {
      gameState.reentryEffect.enabled = true;
      gameState.escapePod.reentry = true;
      gameState.escapePod.setTarget(-Math.PI / 2, 0, 0);
      const shipReentry = document.querySelector('#ship-reentry-entity')
        .components.sound;
      shipReentry.playSound();
      const monsterDie = document.querySelector('#monster-die-entity')
        .components.sound;
      monsterDie.playSound();
      setTimeout(() => {
        monsterDie.playSound();
      }, 250);
      setTimeout(() => {
        gameState.monster.setTarget(0, 0, 0, 100);
      }, 4500);
      setTimeout(() => {
        gameState.monster.setTarget(0, 0, 0, 10000);
      }, 5000);
    }

    // renetry over
    if (
      this.el.object3D.position.z < 2100 &&
      !gameState.escapePod.reentryEnded
    ) {
      gameState.reentryEffect.enabled = false;
      gameState.escapePod.reentryEnded = true;
      const shipReentry = document.querySelector('#ship-reentry-entity')
        .components.sound;
      const musicHigh = document.querySelector('#music-danger-high-entity')
        .components.sound;
      const musicWin = document.querySelector('#music-win-entity').components
        .sound;
      shipReentry.stopSound();
      musicHigh.stopSound();
      musicWin.playSound();
    }

    // landing
    if (this.el.object3D.position.z <= 2001 && !gameState.escapePod.landed) {
      this.el.object3D.position.z = 2000.5;
      gameState.escapePod.landed = true;
    }
  }
});
