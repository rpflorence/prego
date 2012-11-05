module.exports = function (n) {
  n = parseInt(n, 10);
  if (!n) {
    return '--:--';
  }
  n = n / 1000;
  var seconds = n % 60;
  n = (n - seconds) / 60;
  var minutes = n % 60;
  return "" + (pad(minutes)) + ":" + (pad(seconds));
}

function pad (n) {
  n = Math.floor(n);
  return (n < 10 ? '0' : '') + n.toFixed();
}
