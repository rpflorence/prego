var formatDate = require('date/format');

Handlebars.registerHelper('formatTime', function(ms) {
  // ms is ['start'] instead of the value for start :\
  return formatDate(new Date(ms));
});

