AFRAME.registerComponent('escape-pod', {
    schema: {
        event: { type: 'string', default: '' },
        message: { type: 'string', default: 'Hello, World!' }
    },

    init: function () {
        console.log('huzzah!');
    },

    update: function (oldData) {

    }
});
