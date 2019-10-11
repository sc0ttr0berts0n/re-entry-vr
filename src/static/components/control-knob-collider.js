AFRAME.registerComponent('control-knob-collider', {
  dependencies: ['control-knob'],
  schema: {
    parent: { type: 'selector' }
  },
  init: function() {
    console.log('control-knob init');
  },
  update: function() {},
  tick: function(oldData) {},
  play: function() {
    this.el.addEventListener('hover-start', this.onHoverStart);
    this.el.addEventListener('hover-end', this.onHoverEnd);
  },
  onHoverStart: function(e) {
    console.log('hover start');
    e.detail.target.setAttribute('control-knob', 'isEmissive', true);
  },
  onHoverEnd: function(e) {
    e.detail.target.setAttribute('control-knob', 'isEmissive', false);
  }
});
