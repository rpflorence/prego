module.exports = function(num, pad) {
  var padded;
  if (pad == null) {
    pad = 2;
  }
  padded = num + "";
  while (padded.length < pad) {
    padded = "0" + padded;
  }
  return padded;
};

