require('App');
var formatDate = require('lang/date/format');
var formatMinutes = require('lang/number/formatMinutes');
var Model = require('models/Model');

App.Log = Model.extend({

  start: null,

  end: null,

  frequency: function() {
    var previous = this.findPrevious();
    if (previous) {
      return this.get('start') - previous.get('start');
    }
    return null;
  }.property('start'),

  duration: function() {
    return this.get('end') - this.get('start');
  }.property('start', 'end'),

  formattedStart: function() {
    return formatDate(new Date(this.get('start')));
  }.property('start'),

  formattedEnd: function() {
    return formatDate(new Date(this.get('end')));
  }.property('end'),

  formattedFrequency: function() {
    return formatMinutes(this.get('frequency'));
  }.property('frequency'),

  formattedDuration: function() {
    return formatMinutes(this.get('duration'));
  }.property('duration'),

  findPrevious: function() {
    var records = this.constructor._records;
    var index = records.indexOf(this);
    if (index === 0) {
      return null;
    }
    return this.constructor.find(records[index - 1].id);
  }

});

App.Log.init();

