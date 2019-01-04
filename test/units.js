require('chai').should();
const expect = require('chai').expect;

const units = require('../lib/units');

describe('units', () => {
  describe('units.decompose()', () => {
    it('should break a number with a unit into the number and the unit.', () => {
      units.decompose('20px')[1].should.equal('px');
      units.decompose('20px')[0].should.equal(20);
    });

    it('should return the proper [number, string].', () => {
      (units.decompose('20vw')[0] + 1).should.equal(21);
    });

    it('should properly match decimals.', () => {
      units.decompose('24.5em')[0].should.equal(24.5);
    });

    it('should not care what the unit is.', () => {
      units.decompose('98%')[1].should.equal('%');
      units.decompose('29.5.4')[1].should.equal('.4');
    });

    it('should handle non-existing units with giving "undefined" as the unit.', () => {
      expect(units.decompose('23')[1]).to.not.exist;
    });

    it('should properly handle negative numbers.', () => {
      units.decompose('-20px')[0].should.equal(-20);
    });

    it('should throw proper errors on improper input.', () => {
      expect(() => units.decompose('24 25')).to.throw;
      expect(() => units.decompose('px32.2')).to.throw;
      expect(() => units.decompose('24 px')).to.throw;
    });
  });

  describe('units.position()', () => {
    it('should give out the raw position for \'px\' and \'\' units or "undefined" based on given transform.', () => {
      let ref = { x : 10, t: 200, w: 50 };
      let transform = { current: 'x', total: 't', window: 'w' };

      units.position(ref, '', transform).should.equal(10);
      units.position(ref, 'px', transform).should.equal(10);
      units.position(ref, undefined, transform).should.equal(10);
    });

    it('should give out the relative percentage position for \'%\' units based on given transform.', () => {
      let ref = { x : 10, t: 200, w: 50 };
      let transform = { current: 'x', total: 't', window: 'w' };

      units.position(ref, '%', transform).should.equal(5);
    });

    it('should give out the percentage page/window position for \'vw\', \'vh\' and \'w\' units based on given transform.', () => {
      let ref = { x : 75, t: 200, w: 50 };
      let transform = { current: 'x', total: 't', window: 'w' };

      units.position(ref, 'vw', transform).should.equal(150);
      units.position(ref, 'vh', transform).should.equal(150);
      units.position(ref, 'w', transform).should.equal(1.5);
    });

    it('should fall back to current="scrollTop", total="scrollHeight" & window="clientHeight" if no transform is given.', () => {
      let ref = { scrollTop: 32, scrollHeight: 512, clientHeight: 256 };

      units.position(ref, 'px').should.equal(32);
      units.position(ref, '%').should.equal(6.25);
      units.position(ref, 'vh').should.equal(12.5);
      units.position(ref, 'w').should.equal(.125);
    });

    it('should throw proper error when an improper transform is passed.', () => {
      let ref = { x : 75, t: 200, w: 50 };

      expect(() => units.position(ref, '', { current: 'x', total: 't', window: 'w' })).not.to.throw;
      expect(() => units.position(ref, '', { current: 'x', total: 't', win: 'w' })).to.throw;
      expect(() => units.position(ref, '', { current: 'x', t: 't', window: 'w' })).to.throw;
      expect(() => units.position(ref, '', { curr: 'x', total: 't', window: 'w' })).to.throw;
    });

    it('should throw proper error when the transform does not match the ref.', () => {
      let ref = { x: 75, t: 200, w: 50 };

      expect(() => units.position(ref, '', { current: 'x', total: 't', window: 'w' })).not.to.throw;
      expect(() => units.position(ref, '', { current: 'x', total: 't', window: 'ww' })).to.throw;
      expect(() => units.position(ref, '', { current: 'x', total: 'tt', window: 'w' })).to.throw;
      expect(() => units.position(ref, '', { current: 'xx', total: 't', window: 'w' })).to.throw;
    });

    it('should throw proper error when unknown unit is given.', () => {
      let ref = { scrollTop: 32, scrollHeight: 512, clientHeight: 256 };

      expect(() => units.position(ref, 'px')).not.to.throw;
      expect(() => units.position(ref, 'em')).to.throw;
    });
  });
});
