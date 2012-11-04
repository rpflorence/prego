require('App');
require('views/LogsView');
require('models/Log');

App.LogsController = Ember.ArrayController.extend({

  addLog: function(timer) {
    App.Log.create({
      start: timer.get('start'),
      end: timer.get('end')
    }).save();
  },

  reverse: function(){
      return this.get('content').toArray().reverse();
  }.property('content.@each')

});

