require('App');
var formatDate = require('date/format');
var formatMinutes = require('number/formatMinutes');
var Model = require('models/Model');

App.Log = Model.extend({

  start: null,

  end: null,

  formattedStart: function() {
    return formatDate(new Date(this.get('start')));
  }.property('start'),

  formattedEnd: function() {
    return formatDate(new Date(this.get('end')));
  }.property('end'),

  frequency: function() {
    var previous = this.constructor.findPrevious(this);
    if (previous) {
      return formatMinutes(this.get('start') - previous.get('start'));
    }
    return null;
  }.property('start'),

  duration: function() {
    return formatMinutes(this.get('end') - this.get('start'));
  }.property('start', 'end')

}).reopenClass({

  findPrevious: function(current) {
    var index = this._records.indexOf(current);
    if (index === 0) {
      return null;
    }
    return this.find(this._records[index - 1].id);
  }

});

App.Log.init();
