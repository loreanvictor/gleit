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
    current: 'scrollTop',
    total: 'scrollHeight',
    window: 'clientHeight'
  };

  if (!('current' in transform)) throw new Error('transform missing "current" key: ' + transform);
  if (!('total' in transform)) throw new Error('transform missing "total" key: ' + transform);
  if (!('window' in transform)) throw new Error('transform missing "window" key: ' + transform);

  if (!(transform.current in ref)) throw new Error('ref missing "' + transform.current + '" key: ' + ref);
  if (!(transform.total in ref)) throw new Error('ref missing "' + transform.total + '" key: ' + ref);
  if (!(transform.window in ref)) throw new Error('ref missing "' + transform.window + '" key: ' + ref);

  if (unit == 'px' || unit == '' || !unit) return ref[transform.current];
  if (unit == '%') return ref[transform.current] / ref[transform.total] * 100;
  if (unit == 'vh' || unit == 'vw') return ref[transform.current] / ref[transform.window] * 100;
  if (unit == 'w') return ref[transform.current] / ref[transform.window];

  throw new Error('Improper unit: ' + unit);
}

module.exports.decompose = decompose;
module.exports.position = position;
