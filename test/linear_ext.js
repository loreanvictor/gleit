require('chai').should();

const linear_ext = require('../lib/linear_ext');


describe('linear_ext()', () => {
  it('should do proper linear extrapolation between two given points.', () => {
    var ext = linear_ext([0, 2], [1, 1]);
    ext(0.5).should.equal(1.5);
    ext(0.75).should.equal(1.25);
  });

  it('for ([a0, a1], b) and k <= a0, it should give a1', () => {
    var ext = linear_ext([0, 2], [1, 1]);
    ext(0).should.equal(2);
    ext(-1).should.equal(2);
  });

  it('for (a, [b0, b1]) and k >= b0, it should give b1', () => {
    var ext = linear_ext([0, 2], [1, 1]);
    ext(1).should.equal(1);
    ext(2).should.equal(1);
  });

  it('for ([x, y], [x, z]) should give y for every input.', () => {
    var ext = linear_ext([0, 2], [0, 1]);
    ext(0).should.equal(2);
    ext(1).should.equal(2);
    ext(-1).should.equal(2);
  });
});
