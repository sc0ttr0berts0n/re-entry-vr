AFRAME.registerComponent('escape-pod', {
  init: function() {
    console.log('hello');
  },

  tick: function(oldData) {
    this.el.object3D.rotation.z += 0.01;
    this.el.object3D.rotation.y += 0.005;
  }
});