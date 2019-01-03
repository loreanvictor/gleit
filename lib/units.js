function decompose(str) {
  var split = str.split(/(\d+(?:\.\d+)?)([^(\d|\s)][^\s]*)/);
  if (split && split.length == 4)
    return [split[1] * 1, split[2].toLowerCase()];
  else
    throw new Error('improper input: ' + str);
}

function position(ref, unit, transform) {
  if (!transform) transform = {
    current: 'scrollTop',
    total: 'scrollHeight',
    window: 'clientHeight'
  };

  if (transform.current === undefined ||
      transform.total === undefined ||
      transform.window === undefined)
    throw new Error('improper transform: ' + transform);

  if (!ref.hasOwnProperty(transform.current) ||
      !ref.hasOwnProperty(transform.total) ||
      !ref.hasOwnProperty(transform.window))
    throw new Error('ref not matching transform: ' + ref + ' vs ' + transform);

  if (unit == 'px' || unit == '') return ref[transform.current];
  if (unit == '%') return ref[transform.current] / ref[transform.total] * 100;
  if (unit == 'vh' || unit == 'vw') return ref[transform.current] / ref[transform.window] * 100;
  if (unit == 'w') return ref[transform.current] / ref[transform.window];
}

module.exports.decompose = decompose;
module.exports.position = position;
