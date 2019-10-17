AFRAME.registerComponent('timer', {
  schema: {
    ejectLeverPull: { type: 'boolean' },
    launch: { type: 'boolean' }
  },
  init: function() {},

  tick: function(time, timeDelta) {
    gameState.frames++;
    gameState.time = time;

    const _isCurrently = (targetTime, offset = 0) => {
      const delta = time - offset;
      const range = delta - timeDelta;

      return targetTime >= range && targetTime <= delta;
    };
    let offset;

    const ejectLever = document.querySelector('#eject-lever');
    const sunLight = document.querySelector('#sun-light');
    const ambientLight = document.querySelector('#ambient-light');

    // sounds
    const musicBeforeShipLaunch = document.querySelector(
      '#music-before-launch-entity'
    ).components.sound;
    const mothershipExplosion = document.querySelector(
      '#mothership-explosion-entity'
    ).components.sound;
    const monsterAttack01 = document.querySelector('#monster-attack-01-entity')
      .components.sound;
    const monsterAttack02 = document.querySelector('#monster-attack-02-entity')
      .components.sound;
    const monsterAttack03 = document.querySelector('#monster-attack-03-entity')
      .components.sound;
    const shipSlam01 = document.querySelector('#ship-slam-01-entity').components
      .sound;
    const shipSlam02 = document.querySelector('#ship-slam-02-entity').components
      .sound;
    const musicLow = document.querySelector('#music-danger-low-entity')
      .components.sound;
    const musicHigh = document.querySelector('#music-danger-high-entity')
      .components.sound;

    // lever pull stuff
    if (gameState.moments.ejectLeverPull && !gameState.moments.launch) {
      // set an offset for the timeline
      offset = gameState.moments.ejectLeverPull;

      // right away events
      if (_isCurrently(0, offset)) {
        sunLight.setAttribute('light', { intensity: 0.4 });
        ambientLight.setAttribute('light', { intensity: 0.025 });
        ejectLever.setAttribute('material', {
          emissiveIntensity: 0,
          emissive: '#000000'
        });
        musicBeforeShipLaunch.stopSound();
        gameState.mothershipFire.enabled = true;
      }

      // timeline events
      if (_isCurrently(6900, offset)) {
        gameState.thrusters.upperLeft = 0.3;
      }
      if (_isCurrently(7100, offset)) {
        gameState.thrusters.upperRight = 0.3;
      }
      if (_isCurrently(7300, offset)) {
        gameState.thrusters.lowerRight = 0.4;
      }
      if (_isCurrently(7500, offset)) {
        gameState.thrusters.lowerLeft = 0.4;
      }

      // title card
      if (_isCurrently(1000, offset)) {
        gameState.titleSlide.isActive = false;
      }
    }

    // launch stuff
    if (gameState.moments.launch) {
      offset = gameState.moments.launch;

      // right away events
      if (_isCurrently(0, offset)) {
        gameState.thrusters.setAll(1);
      }
      // timeline events
      if (_isCurrently(3000, offset)) {
        gameState.thrusters.setAll(0.5);
      }
      if (_isCurrently(5000, offset)) {
        gameState.thrusters.setAll(0.3);
      }
      if (_isCurrently(7000, offset)) {
        gameState.thrusters.setAll(0);
      }
      if (_isCurrently(14125, offset)) {
        gameState.thrusters.setLower(0.3);
      }
      if (_isCurrently(18000, offset)) {
        gameState.thrusters.setAll(0);
      }

      // mothership timing
      if (_isCurrently(13000, offset)) {
        gameState.mothershipExplosion.enabled = true;
        mothershipExplosion.playSound();
        musicLow.playSound();
      }

      if (_isCurrently(13500, offset)) {
        gameState.escapePod.attack(0.08);
        shipSlam02.playSound();
      }

      if (_isCurrently(14125, offset)) {
        gameState.mothershipExplosion.enabled = false;
        gameState.escapePod.setTarget(-Math.PI, 0, Math.PI * 0.125);
      }

      // monster timing
      if (_isCurrently(7000, offset)) {
        gameState.monster.setTarget(0, 0, 0, 8);
      }
      if (_isCurrently(12000, offset)) {
        gameState.monster.setTarget(Math.PI / 2, 1, 0, 5);
        monsterAttack02.playSound();
      }
      if (_isCurrently(20000, offset)) {
        gameState.escapePod.attack(0.5);
        gameState.escapePod.setTarget(-Math.PI, 0, 0);

        shipSlam01.playSound();
      }
      if (_isCurrently(25000, offset)) {
        gameState.monster.shuffle();
        monsterAttack01.playSound();
      }
      if (_isCurrently(25500, offset)) {
        gameState.escapePod.attack(0.2);
        shipSlam01.playSound();
      }

      if (_isCurrently(30000, offset)) {
        gameState.monster.shuffleWithRadius();
      }
      if (_isCurrently(30500, offset)) {
        gameState.escapePod.attack(0.6);
        shipSlam02.playSound();
      }
      if (_isCurrently(50000, offset)) {
        gameState.monster.setTarget(0, 0, 0, 10);
        monsterAttack01.playSound();
      }
      if (_isCurrently(56000, offset)) {
        gameState.monster.setTarget(Math.PI, Math.PI, 0.3, 10);
      }
      if (_isCurrently(56500, offset)) {
        gameState.escapePod.attack(0.6);
        shipSlam01.playSound();
      }
      if (_isCurrently(65000, offset)) {
        gameState.monster.shuffleWithRadius();
        gameState.escapePod.attack(0.2);
        monsterAttack03.playSound();
        musicLow.stopSound();
        musicHigh.playSound();
      }
      if (_isCurrently(75000, offset)) {
        monsterAttack02.playSound();
        gameState.monster.setTarget(0.1, -0.2, 0, 20);
      }
      if (_isCurrently(80000, offset)) {
        gameState.monster.shuffle();
      }

      if (_isCurrently(85000, offset)) {
        gameState.monster.setTarget(-Math.PI, 0, 0, 15);
      }
      if (_isCurrently(90000, offset)) {
        gameState.monster.setTarget(-0.2, 0, 0, 10);
        gameState.escapePod.attack(0.2);
        monsterAttack01.playSound();
      }
    }
  },
  update: function() {}
});
