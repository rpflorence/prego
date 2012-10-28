App = Ember.Application.create();

App.ApplicationView = Ember.View.extend({
  template: Ember.TEMPLATES["Application"]
});
App.ApplicationController = Ember.Controller.extend();


App.Contributor = Ember.Object.extend();
App.Contributor.reopenClass({
  allContributors: [],
  find: function(){
    $.ajax({
      url: 'https://api.github.com/repos/emberjs/ember.js/contributors',
      dataType: 'jsonp',
      context: this,
      success: function(response){
        this.allContributors.clear();
        response.data.forEach(function(contributor){
          this.allContributors.addObject(App.Contributor.create(contributor))
        }, this)
      }
    })
    return this.allContributors;
  },
  findOne: function(username){
    var contributor = App.Contributor.create({
      login: username
    });

    $.ajax({
      url: 'https://api.github.com/repos/emberjs/ember.js/contributors',
      dataType: 'jsonp',
      context: contributor,
      success: function(response){
        this.setProperties(response.data.findProperty('login', username));
      }
    });

    return contributor;
  }
});

App.AllContributorsController = Ember.ArrayController.extend();
App.AllContributorsView = Ember.View.extend({
  template: Ember.TEMPLATES["AllContributors"]
});

App.OneContributorView = Ember.View.extend({
  template: Ember.TEMPLATES["aContributor"]
});
App.OneContributorController = Ember.ObjectController.extend();

App.Router = Ember.Router.extend({
  enableLogging: true,

  root: Ember.Route.extend({
    contributors: Ember.Route.extend({
      route: '/',
      showContributor: Ember.Route.transitionTo('aContributor'),
      connectOutlets: function(router){
        router.get('applicationController').connectOutlet('allContributors', App.Contributor.find());
      }
    }),

    aContributor: Ember.Route.extend({
      route: '/:githubUserName',
      showAllContributors: Ember.Route.transitionTo('contributors'),
      connectOutlets: function(router, context){
        router.get('applicationController').connectOutlet('oneContributor', context);
      },
      serialize: function(router, context){
        return {
          githubUserName: context.get('login')
        }
      },
      deserialize: function(router, urlParams){
        return App.Contributor.findOne(urlParams.githubUserName);
      }
    })
  })
});

App.initialize();

