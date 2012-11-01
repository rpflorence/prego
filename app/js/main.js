App                       = Ember.Application.create();

App.ApplicationController = require('controllers/ApplicationController');
App.ApplicationView       = require('views/ApplicationView');

App.StatsController       = require('controllers/StatsController');
App.StatsView             = require('views/StatsView');

App.Timer                 = require('models/Timer');
App.TimerController       = require('controllers/TimerController');
App.TimerView             = require('views/TimerView');

App.LogsController        = require('controllers/LogsController');
App.LogsView              = require('views/LogsView');

App.ActionsController     = require('controllers/ActionsController');
App.ActionsView           = require('views/ActionsView');

App.Router                = require('routes/ApplicationRouter');

App.initialize();
