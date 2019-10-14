class GameState {
  constructor() {
    this.frames = 0;
    this.time = 0;
    this.moments = {
      ejectLeverPull: null
    };
    this.ejectLever = new EjectLever(this);
    console.log('game is started');
  }
}

class EjectLever {
  constructor(GameState) {
    this.GameState = GameState;
    this.isTriggered = false;
    this.launchAudioPlayed = false;
    this._angle = 0;
    this.minAngle = 0;
    this.maxAngle = 0.35;
    this.grabHandEl = null;
    this.grabStartHeight = 0;
    this.grabCurrentHeight = 0;
  }

  set angle(val) {
    val = val > this.maxAngle ? this.maxAngle : val;
    val = val < this.minAngle ? this.minAngle : val;
    if (val > 0.34) {
      this.isTriggered = true;
      this.GameState.moments.ejectLeverPull = this.GameState.time;
      console.log(this.GameState.moments.ejectLeverPull);
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

var gameState = new GameState();

document.addEventListener('keydown', function(e) {
  if (event.which === 97 || event.which === 32) {
    gameState.ejectLever.isTriggered = true;
    gameState.moments.ejectLeverPull = gameState.time;
  }
});
