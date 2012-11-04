require('App');
require('models/Timer');
require('controllers/TimerController');
require('models/Log');
require('controllers/LogsController');

module.exports = Ember.Route.extend({

  route: '/',

  connectOutlets: function(router) {
    var appController = router.get('applicationController');
    var timer = App.Timer.find('current');

    appController.connectOutlet({
      outletName: 'timer',
      name: 'timer',
      context: timer
    });

    timer.on('didLoad', function() {
      if (timer.get('recording')) {
        router.get('timerController').record();
      }
    });

    appController.connectOutlet({
      outletName: 'logs',
      name: 'logs',
      context: App.Log.findAll()
    });
  },

  start: function(router) {
    router.get('timerController').record();
  },

  stop: function(router) {
    var timerController = router.get('timerController');
    var logsController = router.get('logsController');
    logsController.addLog(timerController.get('content'));
    timerController.stop();
  }

});

