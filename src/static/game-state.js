class GameState {
  constructor() {
    this.frames = 0;
    this.time = 0;
    this.moments = {
      ejectLeverPull: null,
      launch: null
    };
    this.monster = new Monster(this);
    this.escapePod = new EscapePod(this);
    this.titleSlide = new TitleSlide(this);
    this.ejectLever = new EjectLever(this);
    this.thrusters = new Thrusters(this);
    this.reentryEffect = new ReentryEffect(this);
    this.mothershipFire = new MothershipFire(this);
    this.mothershipExplosion = new MothershipExplosion(this);
    console.log('game is started');
  }
}

class Monster {
  constructor(GameState) {
    this.GameState = GameState;
    this.facePlanet = false;
    this.reentryTilt = false;
    this.reentry = false;
    this.reentryEnded = false;
    this.landed = false;
    this.rotation = {
      target: { x: 0.5, y: 0.5, z: 0.2 },
      pos: { x: 0.5, y: 0.5, z: 0 },
      vel: { x: 0, y: 0, z: 0 },
      acc: { x: 0, y: 0, z: 0 }
    };
    this.radius = {
      target: 50,
      actual: 50,
      max: 50,
      min: 5
    };
    this.lerp = 0.01;
    this.friction = 0.95;
  }
  shuffle() {
    this.rotation.target.x = Math.random() * Math.PI * 2;
    this.rotation.target.y = Math.random() * Math.PI * 2;
    this.rotation.target.z = Math.random() * Math.PI * 2;
  }
  shuffleWithRadius() {
    this.rotation.target.x = Math.random() * Math.PI * 2;
    this.rotation.target.y = Math.random() * Math.PI * 2;
    this.rotation.target.z = Math.random() * Math.PI * 2;
    this.radius.target =
      Math.random() * (this.radius.max - this.radius.min) + this.radius.min;
  }
  attack(strength = 0.4) {
    this.rotation.acc.x = Math.random() * strength - strength / 2;
    this.rotation.acc.y = Math.random() * strength - strength / 2;
    this.rotation.acc.z = Math.random() * strength - strength / 2;
  }
  setTarget(x, y, z, r) {
    this.rotation.target.x = x;
    this.rotation.target.y = y;
    this.rotation.target.z = z;
    this.radius.target = r;
  }
}

class EscapePod {
  constructor(GameState) {
    this.GameState = GameState;
    this.facePlanet = false;
    this.reentryTilt = false;
    this.reentry = false;
    this.reentryEnded = false;
    this.landed = false;
    this.rotation = {
      target: { x: 0, y: 0, z: 0 },
      pos: { x: 0, y: 0, z: 0 },
      vel: { x: 0, y: 0, z: 0 },
      acc: { x: 0, y: 0, z: 0 }
    };
    this.lerp = 0.005;
    this.friction = 0.95;
  }
  shuffle() {
    this.rotation.target.x = Math.random() * Math.PI * 2;
    this.rotation.target.y = Math.random() * Math.PI * 2;
    this.rotation.target.z = Math.random() * Math.PI * 2;
  }
  attack(strength = 0.4) {
    this.rotation.acc.x = Math.random() * strength - strength / 2;
    this.rotation.acc.y = Math.random() * strength - strength / 2;
    this.rotation.acc.z = Math.random() * strength - strength / 2;
  }
  setTarget(x, y, z) {
    this.rotation.target.x = x;
    this.rotation.target.y = y;
    this.rotation.target.z = z;
  }
}

class TitleSlide {
  constructor(GameState) {
    this.GameState = GameState;
    this.isActive = true;
    this.finished = false;
    this.opacity = 1;
  }
}

class EjectLever {
  constructor(GameState) {
    this.GameState = GameState;
    this.isTriggered = false;
    this.launchAudioPlayed = false;
    this._angle = 0;
    this.minAngle = 0;
    this.maxAngle = 0.5;
    this.grabHandEl = null;
    this.grabStartHeight = 0;
    this.grabCurrentHeight = 0;
  }

  set angle(val) {
    val = val > this.maxAngle ? this.maxAngle : val;
    val = val < this.minAngle ? this.minAngle : val;
    if (val > 0.49) {
      this.isTriggered = true;
      this.GameState.moments.ejectLeverPull = this.GameState.time;
    }
    this._angle = val;
  }

  get angle() {
    return this._angle;
  }

  calcAngle() {
    const length = 0.33;
    let travel = this.grabStartHeight - this.grabCurrentHeight;
    travel = travel > 0 ? travel : 0;
    travel = travel > length ? length : travel;
    const theta = Math.asin(travel / length);
    this.angle = theta;
  }
}

class Thrusters {
  constructor(GameState) {
    this.GameState = GameState;
    this.lowerLeft = 0;
    this.lowerRight = 0;
    this.upperLeft = 0;
    this.upperRight = 0;
  }
  setAll(val) {
    this.lowerLeft = val;
    this.lowerRight = val;
    this.upperLeft = val;
    this.upperRight = val;
  }
  setLeft(val) {
    this.lowerLeft = val;
    this.upperLeft = val;
  }
  setRight(val) {
    this.lowerRight = val;
    this.upperRight = val;
  }
  setUpper(val) {
    this.upperLeft = val;
    this.upperRight = val;
  }
  setLower(val) {
    this.lowerLeft = val;
    this.lowerRight = val;
  }
  getAll() {
    return [this.lowerLeft, this.lowerRight, this.upperLeft, this.upperRight];
  }
  getThruster(tgt) {
    return this[tgt];
  }
}

class ReentryEffect {
  constructor(GameState) {
    this.GameState = GameState;
    this.enabled = false;
  }
}

class MothershipFire {
  constructor(GameState) {
    this.GameState = GameState;
    this.enabled = false;
  }
}

class MothershipExplosion {
  constructor(GameState) {
    this.GameState = GameState;
    this.enabled = false;
  }
}

var gameState = new GameState();

document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('keydown', function(e) {
    if (event.which === 97 || event.which === 32) {
      gameState.ejectLever.angle = 80;
    }
  });

  // document.addEventListener('touchstart', function(e) {
  //   gameState.ejectLever.angle = 80;
  // });

  var scene = document.querySelector('a-scene');
  scene.addEventListener('loaded', function() {
    const enterVRButton = document.querySelector('.a-enter-vr-button');

    enterVRButton.addEventListener('click', function(e) {
      const entity = document.querySelector('#music-before-launch-entity');
      entity.components.sound.playSound();
    });
  });
});
