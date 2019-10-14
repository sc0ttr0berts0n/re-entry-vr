AFRAME.registerComponent('eject-lever-pivot', {
  schema: {
    rotation: { default: 0 }
  },
  init: function() {
    console.log('eject-lever init');
  },

  update: function() {
    this.el.object3D.rotation.x = this.data.rotation;
  },
  tick: function(oldData) {}
});
