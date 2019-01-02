function linear_ext(a, b) {
  return function(k) {
    return (k - a[0])/(b[0] - a[0]) * (b[1] - a[1]) + a[1];
  }
}

module.exports = linear_ext;
