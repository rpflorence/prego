var fifo = require('vendor/fifo');

module.exports = Ember.Object.extend(Ember.Evented, {

  init: function() {
    this._super.apply(this, arguments);
    if (!this.get('id')) {
      this.set('id', Math.random().toString(36).slice(2));
    }
  },

  save: function() {
    this.constructor._storage.set(this.id, this);
  },

  remove: function() {
    this.constructor._storage.remove(this.id);
  }

}).reopenClass({

  init: function() {
    this._byID = {};
    this._records = [];
    this._storage = fifo(this.toString());
  },

  create: function() {
    var record = this._super.apply(this, arguments);
    this._records.addObject(record);
    this._byID[record.get('id')] = record;
    return record;
  },

  find: function (id) {
    if (this._byID[id]){
      return this._byID[id];
    }

    var record = this.create({
      id: id,
      isLoaded: false
    });

    var stored = this._storage.get(id);
    if (stored) record.setProperties(stored);

    record.set('isLoaded', true);
    record.trigger('didLoad');
    return record;
  },

  findAll: function() {
    var stored = this._storage.get();
    for (var id in stored) this.find(id);
    return this._records;
  }

});

