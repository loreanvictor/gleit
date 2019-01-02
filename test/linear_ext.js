require('chai').should();

const linear_ext = require('../lib/linear_ext');


describe('linear_ext()', () => {
  it('should do proper linear extrapolation between two given points.', () => {
    var ext = linear_ext([0, 0], [1, 1]);
    ext(0.5).should.equal(0.5);
  });
});
