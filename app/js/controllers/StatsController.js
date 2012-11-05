require('App');
require('views/StatsView');
require('models/Log');
var formatMinutes = require('number/formatMinutes');

App.StatsController = Ember.ArrayController.extend({

  _lastLog: function() {
    var logs = this.get('content');
    if (!logs.length) return null;
    return logs[logs.length - 1];
  },

  _getLastProperty: function(prop) {
    var last = this._lastLog();
    return last ? last.get(prop) : null;
  },

  _recentLogs: function() {
    var logs = this.get('content');
    var hourAgo = Date.now() - 3600000;
    return logs.filter(function(log) {
      return log.get('start') >= hourAgo;
    });
  },

  lastFrequency: function() {
    return this._getLastProperty('formattedFrequency');
  }.property('content.@each'),

  lastDuration: function() {
    return this._getLastProperty('formattedDuration');
  }.property('content.@each'),

  lastHourFrequency: function() {
    var recentLogs = this._recentLogs();
    var frequency = recentLogs.reverse().reduce(function(mean, log, i) {
      var frequency = log.get('frequency');
      if (!frequency) return mean;
      return (mean + log.get('frequency')) / (i + 1);
    }, 0);
    return formatMinutes(frequency);
  }.property('content.@each'),

  lastHourDuration: function() {
    var recentLogs = this._recentLogs();
    var duration = recentLogs.reduce(function(mean, log, i) {
      return (mean + log.get('duration')) / (i + 1);
    }, 0);
    return formatMinutes(duration);
  }.property('content.@each')

});
