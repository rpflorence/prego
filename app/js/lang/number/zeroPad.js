module.exports = function(num, pad) {
  if (pad == null) pad = 2;
  var padded = num + "";
  while (padded.length < pad) {
    padded = "0" + padded;
  }
  return padded;
};

