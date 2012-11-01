module.exports = Ember.Object.extend(Ember.Evented, {

  url: 'currentTimer',

  start: null,

  end: null,

  recording: false,

  save: function() {
    localStorage.setItem(this.url, JSON.stringify(this));
  },

  remove: function() {
    localStorage.removeItem(this.url);
  }

}).reopenClass({

  find: function(url) {
    var record = this.create({ isLoaded: false });
    var stored = localStorage.getItem(url);
    if (stored) {
      var parsed = JSON.parse(stored);
      record.setProperties(parsed);
    }
    record.set('isLoaded', true);
    record.trigger('didLoad');
    return record;
  }

});

