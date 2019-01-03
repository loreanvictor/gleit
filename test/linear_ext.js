require('chai').should();
const expect = require('chai').expect;

const linear_ext = require('../lib/linear_ext');


describe('linear_ext.single()', () => {
  it('should do proper linear extrapolation between two given points.', () => {
    let ext = linear_ext.single([0, 2], [1, 1]);
    ext(0.5).should.equal(1.5);
    ext(0.75).should.equal(1.25);
  });

  it('for ([a0, a1], b) and k <= a0, it should give a1', () => {
    let ext = linear_ext.single([0, 2], [1, 1]);
    ext(0).should.equal(2);
    ext(-1).should.equal(2);
  });

  it('for (a, [b0, b1]) and k >= b0, it should give b1', () => {
    let ext = linear_ext.single([0, 2], [1, 1]);
    ext(1).should.equal(1);
    ext(2).should.equal(1);
  });

  it('for ([x, y], [x, z]) should give y for every input.', () => {
    let ext = linear_ext.single([0, 2], [0, 1]);
    ext(0).should.equal(2);
    ext(1).should.equal(2);
    ext(-1).should.equal(2);
  });

  it('should give out the value of one point if the other is not given.', () => {
    linear_ext.single([0, 2])(128).should.equal(2);
    linear_ext.single(undefined, [1, 1])(-128).should.equal(1);
  });

  it('should throw proper error if invalid input is given.', () => {
    expect(() => linear_ext.single()).to.throw;
    expect(() => linear_ext.single(2, 'hellow')).to.throw;
    expect(() => linear_ext.single([0])).to.throw;
  })
});

describe('linear_ext.multi()', () => {
  it('should do proper linear extrapolation for multiple points.', () => {
    let ext = linear_ext.multi([[0, 0], [1, 1], [2, 0]]);
    ext(0.5).should.equal(0.5);
    ext(1.5).should.equal(0.5);
  });

  it('should return the min(max) value for input lesser(greater) than the min(max) point.', () => {
    let ext = linear_ext.multi([[0, 0], [1, 1], [2, 0]]);
    ext(0).should.equal(0);
    ext(2).should.equal(0);
    ext(-1).should.equal(0);
    ext(3).should.equal(0);
  });
});
