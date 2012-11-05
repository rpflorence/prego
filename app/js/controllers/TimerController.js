require('App');
require('views/TimerView');
var formatMinutes = require('lang/number/formatMinutes');

App.TimerController = Ember.ObjectController.extend({
  total: function() {
    var start = this.get('start') || null;
    var end = this.get('end') || null;

    return formatMinutes((end || start) - start);
  }.property('start', 'end'),

  record: function() {
    this.set('recording', true);
    if (!this.get('start')) { this.set('start', Date.now()); }
    if (!this.get('end')) { this.set('end', Date.now()); }
    var timer = this.get('content');
    this.interval = setInterval(function(){
      timer.set('end', Date.now());
      timer.save();
    }, 500);
  },

  stop: function() {
    clearInterval(this.interval);
    this.set('recording', false);
    this.set('end', Date.now());
    this.get('content').save();
    this.reset();
  },

  reset: function() {
    this.set('start', null);
    this.set('end', null);
    this.get('content').remove();
  }
});

