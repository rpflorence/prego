recordRoute = require('routes/recordRoute');

module.exports = Ember.Router.extend({

  root: Ember.Route.extend({

    index: Ember.Route.extend({

      route: '/',

      connectOutlets: function(router) {
        var appController = router.get('applicationController');

        var timer = App.Timer.find('currentTimer');
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
      },

      start: function(router) {
        router.get('timerController').record();
      },

      stop: function(router) {
        router.get('timerController').stop();
      }
    })
  })
});
