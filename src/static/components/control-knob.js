AFRAME.registerComponent('control-knob', {
  schema: {
    color: { default: '#ff5000' },
    isEmissive: { default: false }
  },
  init: function() {
    console.log('control-knob init');
  },
  update: function() {
    this.el.setAttribute('material', 'color', this.data.color);
    this.el.setAttribute('material', 'emissive', '#ff5000');
    if (this.data.isEmissive) {
      this.el.setAttribute('material', 'emissiveIntensity', 0.3);
    } else {
      this.el.setAttribute('material', 'emissiveIntensity', 0);
    }
  },
  tick: function(oldData) {},
  play: function() {
    console.log('play happened');

    this.el.addEventListener('hover-start', this.onHoverStart);
    this.el.addEventListener('hover-end', this.onHoverEnd);
  },
  onHoverStart: function(e) {
    console.log(e);
    e.detail.target.setAttribute('control-knob', 'isEmissive', true);
  },
  onHoverEnd: function(e) {
    e.detail.target.setAttribute('control-knob', 'isEmissive', false);
  }
});
