var pad = require('../number/zeroPad');

module.exports = function(date) {
  var hours, m, minutes;
  m = 'AM';
  hours = date.getHours();
  if (hours > 12) {
    m = 'PM';
    hours = pad(hours - 12);
  } else if (hours === 0) {
    hours = '12';
  }
  minutes = pad(date.getMinutes());
  return "" + hours + ":" + minutes + " " + m;
};

