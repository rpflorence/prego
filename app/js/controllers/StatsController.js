require('App');
require('views/StatsView');
require('models/Log');
var formatMinutes = require('lang/number/formatMinutes');

App.StatsController = Ember.ArrayController.extend({

  lastLog: function() {
    var logs = this.get('content');
    if (!logs.length) return null;
    return logs[logs.length - 1];
  }.property('content.@each'),

  lastHourFrequency: function() {
    return formatMinutes(meanFrequency(this.get('recentLogs')));
  }.property('recentLogs'),

  lastHourDuration: function() {
    return formatMinutes(meanDuration(this.get('recentLogs')));
  }.property('recentLogs'),

  meanFrequency: function() {
    return formatMinutes(meanFrequency(this.get('content').toArray()));
  }.property('content.@each'),

  meanDuration: function() {
    return formatMinutes(meanDuration(this.get('content')));
  }.property('recentLogs'),

  recentLogs: function() {
    var logs = this.get('content');
    var hourAgo = Date.now() - 3600000;
    return logs.filter(function(log) {
      return log.get('start') >= hourAgo;
    });
  }.property('content.@each')

});

function meanFrequency (logs) {
  var sum = 0;
  var length = 0;
  logs.forEach(function(log) {
    var frequency = log.get('frequency');
    if (!frequency) return;
    sum += frequency;
    length++;
  });
  return sum / length;
}

function meanDuration (logs) {
  return logs.reduce(function(mean, log, i) {
    return mean + log.get('duration');
  }, 0) / logs.length;
}

