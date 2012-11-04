require('App');
var Model = require('models/Model');

App.Timer = Model.extend({
  start: null,
  end: null,
  recording: false
});

App.Timer.init();

