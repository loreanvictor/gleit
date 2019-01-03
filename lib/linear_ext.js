function single(a, b) {
  if (!a && b && b[1] !== undefined) return function(k) { return b[1]; }
  if (!b && a && a[1] !== undefined) return function(k) { return a[1]; }

  if (!a || a[0] === undefined || a[1] === undefined ||
      !b || b[0] === undefined || b[1] === undefined) throw new Error('bad input: ' + a + ' , ' + b);

  if (a[0] == b[0])
    return function(k) { return a[1]; }
  return function(k) {
    if (k <= a[0]) return a[1];
    if (k >= b[0]) return b[1];
    return (k - a[0])/(b[0] - a[0]) * (b[1] - a[1]) + a[1];
  }
}

require('../polyfill/filter');

function before(pts, k) {
  var lesser = pts.filter(function(pt) { return pt[0] <= k; });
  if (lesser.length > 0) return lesser[lesser.length - 1];
  return undefined;
}

function after(pts, k) {
  var greater = pts.filter(function(pt) { return pt[0] >= k; });
  if (greater.length > 0) return greater[0];
  return undefined;
}

function multi(pts) {
  return function(k) {
    return single(before(pts, k), after(pts, k))(k);
  }
}

module.exports.single = single;
module.exports.multi = multi;
