module.exports = Ember.Route.extend({
  route: '/record/:time',
  serialize: function(router, context) {
    return { time: 'serialize' };
  },
  deserialize: function(router, params) {
    return { time: 'lol'};
  }
});
