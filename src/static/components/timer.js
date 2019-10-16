AFRAME.registerComponent('timer', {
  schema: {
    ejectLeverPull: { type: 'boolean' },
    launch: { type: 'boolean' }
  },
  init: function() {},

  tick: function(time) {
    gameState.frames++;
    gameState.time = time;

    // lever pull stuff
    if (gameState.moments.ejectLeverPull && !this.data.ejectLeverPull) {
      const ejectLever = document.querySelector('#eject-lever');
      const sunLight = document.querySelector('#sun-light');
      const ambientLight = document.querySelector('#ambient-light');
      sunLight.setAttribute('light', { intensity: 0.4 });
      ambientLight.setAttribute('light', { intensity: 0.025 });
      ejectLever.setAttribute('material', {
        emissiveIntesity: 0,
        emissive: '#000000'
      });
      this.data.ejectLeverPull = true;
      setTimeout(() => {
        gameState.thrusters.upperLeft = 0.3;
      }, 6900);
      setTimeout(() => {
        gameState.thrusters.upperRight = 0.3;
      }, 7100);
      setTimeout(() => {
        gameState.thrusters.lowerRight = 0.4;
      }, 7300);
      setTimeout(() => {
        gameState.thrusters.lowerLeft = 0.4;
      }, 7500);
    }

    // launch stuff
    if (gameState.moments.launch && !this.data.launch) {
      this.data.launch = true;
      gameState.thrusters.setAll(1);
      setTimeout(() => {
        gameState.thrusters.setAll(0.5);
      }, 3000);
      setTimeout(() => {
        gameState.thrusters.setAll(0.3);
      }, 5000);
      setTimeout(() => {
        gameState.thrusters.setAll(0);
      }, 7000);
      setTimeout(() => {
        gameState.thrusters.setLower(0.3);
      }, 10000);
      setTimeout(() => {
        gameState.thrusters.setAll(0);
      }, 32000);
    }
  },
  update: function() {}
});
