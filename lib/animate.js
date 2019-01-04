var linear_ext = require('./linear_ext');
var units = require('./units');

function animate(frames) {
  var keyUnit = undefined;
  var propUnits = {};

  var propFrames = {};

  for (var key in frames) {
    var keyVal = key;

    if (typeof key === 'string') {
      var decomposed = units.decompose(key);
      if (!keyUnit) keyUnit = decomposed[1];
      keyVal = decomposed[0];
    }

    var frame = frames[key];
    for (var property in frame) {
      if (!(property in propFrames)) propFrames[property] = [];

      var fpVal = frame[property];

      if (typeof fpVal === 'string') {
        var decomposed = units.decompose(fpVal);
        fpVal = decomposed[0];

        if (!propUnits[property]) propUnits[property] = decomposed[1];
      }

      propFrames[property].push([keyVal, fpVal]);
    }
  }

  var propFuncs = {};

  for (var property in propFrames) {
    propFrames[property].sort(function(a, b) { return a[0] - b[0] });
    propFuncs[property] = linear_ext.multi(propFrames[property]);
  }

  return function(transform) {
    return function(ref) {
      var pos = units.position(ref, keyUnit, transform);
      var values = {};
      for (var property in propFuncs) {
        var propVal = propFuncs[property](pos);
        if (propUnits[property]) propVal += propUnits[property];
        values[property] = propVal;
      }

      return values;
    }
  }
}

module.exports = animate;
