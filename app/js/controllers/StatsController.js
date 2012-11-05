require('App');
require('views/StatsView');
require('models/Log');
var formatMinutes = require('number/formatMinutes');

App.StatsController = Ember.ArrayController.extend({
  lastLog: function() {
    var logs = this.get('content');
    if (!logs.length) return null;
    return logs[logs.length - 1];
  }.property('content.@each'),

  lastHourFrequency: function() {
    return formatMinutes(reduceFrequency(this.get('recentLogs')));
  }.property('recentLogs'),

  lastHourDuration: function() {
    return formatMinutes(reduceDuration(this.get('recentLogs')));
  }.property('recentLogs'),

  meanFrequency: function() {
    return formatMinutes(reduceFrequency(this.get('content').toArray()));
  }.property('content.@each'),

  meanDuration: function() {
    return formatMinutes(reduceDuration(this.get('content')));
  }.property('recentLogs'),

  recentLogs: function() {
    var logs = this.get('content');
    var hourAgo = Date.now() - 3600000;
    return logs.filter(function(log) {
      return log.get('start') >= hourAgo;
    });
  }.property('content.@each')

});

function reduceFrequency (logs) {
  return logs.reverse().reduce(function(mean, log, i) {
    var frequency = log.get('frequency');
    if (!frequency) return mean;
    return (mean + log.get('frequency')) / (i + 1);
  }, 0);
}

function reduceDuration (logs) {
  return logs.reduce(function(mean, log, i) {
    return (mean + log.get('duration')) / (i + 1);
  }, 0);
}

