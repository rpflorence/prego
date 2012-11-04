require('App');
require('controllers/ApplicationController');

App.Router = Ember.Router.extend({
  root: Ember.Route.extend({
    index: require('routes/index')
  })
});

