require('chai').should();
const expect = require('chai').expect;

const animate = require('../lib/animate');

describe('animate()', () => {
  it('should give a function that properly animate multiple values.', () => {
    let transform = { current: 'x', total: 't', window: 'w' };
    let frames = {
      0: { a: 0, b: 1 },
      1: { a: 1, b: 0 },
    };

    let tick = animate(frames, transform);
    let v1 = tick({x: .75, t: 1, w: 1});
    let v2 = tick({x: .25, t: 1, w: 1});

    v1.a.should.equal(.75);
    v1.b.should.equal(.25);
    v2.a.should.equal(.25);
    v2.b.should.equal(.75);
  });

  it('should properly handle properties missing from frames in between.', () => {
    let transform = { current: 'x', total: 't', window: 'w' };
    let frames = {
      0: { a: 0, b: 1 },
      1: { a: 1 },
      2: { a: 2, b: 0 },
    };

    let tick = animate(frames, transform);
    let v = tick({x: 1, t: 1, w: 1});

    v.a.should.equal(1);
    v.b.should.equal(.5);
  });

  it('should properly handle properties missing from frames in the start or the end.', () => {
    let transform = { current: 'x', total: 't', window: 'w' };
    let frames = {
      0: { a: 0 },
      1: { a: 1, b: 1 },
      2: { b: 0 },
    };

    let tick = animate(frames, transform);
    let v1 = tick({x: .5, t: 1, w: 1});
    let v2 = tick({x: 1.5, t: 1, w: 1});

    v1.a.should.equal(.5);
    v1.b.should.equal(1);
    v2.a.should.equal(1);
    v2.b.should.equal(.5);
  });

  it('should take the unit of the first frame key as the unit of all and handle that properly.', () => {
    let transform = { current: 'x', total: 't', window: 'w' };
    let frames = {
      '0vw': { a: 1 },
      '100px': { a: 0 },
    };

    animate(frames, transform)({x: 75, t: 2876, w: 100}).a.should.equal(.25);
  });

  it('should properly handle property values with units and values without.', () => {
    let transform = { current: 'x', total: 't', window: 'w' };
    let frames = {
      0: { a: '2kg', b: 0 },
      1: { a: '1kg', b: 1 }
    };

    let v = animate(frames, transform)({x: .25, t: 1, w: 1});
    v.a.should.equal('1.75kg');
    v.b.should.equal(.25);
  });

  it('should fall back to current="scrollTop", total="scrollHeight" & window="clientHeight" if no transform is given.', () => {
    let frames = {
      '0px': { a : 1, b: '100vw' },
      '128px': { a : 3, b: '50vw' }
    };

    let v = animate(frames)({scrollTop: 64, scrollHeight: 1640, clientHeight: 860 });
    v.a.should.equal(2);
    v.b.should.equal('75vw');
  });
});
