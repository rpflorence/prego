require('App');
require('models/Timer');
require('controllers/TimerController');
require('models/Log');
require('controllers/LogsController');
require('controllers/StatsController');

module.exports = Ember.Route.extend({

  route: '/',

  connectOutlets: function(router) {
    var appController = router.get('applicationController');
    var timer = App.Timer.find('current');
    var logs = App.Log.findAll();
    appController.connectOutlet({
      outletName: 'timer',
      name: 'timer',
      context: timer
    });
    appController.connectOutlet({
      outletName: 'logs',
      name: 'logs',
      context: logs
    });
    appController.connectOutlet({
      name: 'stats',
      outletName: 'stats',
      context: logs
    });
    timer.on('didLoad', function() {
      if (!timer.get('recording')) return;
      router.get('timerController').record();
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

