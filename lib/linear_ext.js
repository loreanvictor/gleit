function linear_ext(a, b) {
  if (a[0] == b[0])
    return function(k) { return a[1]; }
  else
    return function(k) {
      if (k <= a[0]) return a[1];
      if (k >= b[0]) return b[1];
      return (k - a[0])/(b[0] - a[0]) * (b[1] - a[1]) + a[1];
    }
}

module.exports = linear_ext;
