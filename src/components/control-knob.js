AFRAME.registerComponent('control-knob', {
  schema: {
    color: { default: '#ff5000' },
    isHovered: { default: false }
  },
  init: function() {},
  update: function() {
    this.el.setAttribute('material', 'color', this.data.color);
    this.el.setAttribute('material', 'emissive', '#ff5000');
    if (this.data.isHovered) {
      this.el.setAttribute('material', 'emissiveIntensity', 0.3);
    } else {
      this.el.setAttribute('material', 'emissiveIntensity', 0);
    }
  },
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
