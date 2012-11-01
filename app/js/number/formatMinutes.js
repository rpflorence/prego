module.exports = formatMinutes;

function pad (n) {
  return (n < 10 ? '0' : '') + n.toFixed();
}

function formatMinutes(n) {
  var minutes, seconds;
  if (!n) {
    return '--:--';
  }
  n = n / 1000;
  seconds = n % 60;
  n = (n - seconds) / 60;
  minutes = n % 60;
  return "" + (pad(minutes)) + ":" + (pad(seconds));
}

