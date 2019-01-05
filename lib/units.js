function decompose(str) {
  var split = str.split(/(\-?\d+(?:\.\d+)?)([^(\d|\s)][^\s]*)?/);
  if (split && split.length == 4) {
    var val = split[1] * 1;
    var unit = split[2];
    if (unit) unit = unit.toLowerCase();

    return [val, unit];
  }
  else
    throw new Error('improper input: ' + str);
}

function position(ref, unit, transform) {
  if (!transform) transform = {
    current: 'current',
    total: 'total',
    window: 'window'
  };

  if (!('current' in transform)) throw new Error('transform missing "current" key: ' + transform);
  if (!('total' in transform)) throw new Error('transform missing "total" key: ' + transform);
  if (!('window' in transform)) throw new Error('transform missing "window" key: ' + transform);

  if (!(transform.current in ref)) throw new Error('ref missing "' + transform.current + '" key: ' + ref);
  if (!(transform.total in ref)) throw new Error('ref missing "' + transform.total + '" key: ' + ref);

  var _current = ref[transform.current];
  var _total = ref[transform.total];
  var _window = _total;

  if (transform.window in ref) _window = ref[transform.window];

  if (unit == 'px' || unit == '' || !unit) return _current;
  if (unit == '%') return _current / _total * 100;
  if (unit == 'vh' || unit == 'vw') return _current / _window * 100;
  if (unit == 'w') return _current / _window;

  throw new Error('Improper unit: ' + unit);
}

module.exports.decompose = decompose;
module.exports.position = position;
