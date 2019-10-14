AFRAME.registerComponent('timer', {
  init: function() {
    console.log('timer init');
  },

  tick: function(time) {
    gameState.frames++;
    gameState.time = time;
  },
  update: function() {}
});
