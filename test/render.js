require('chai').should();
const expect = require('chai').expect;

const render = require('../lib/render');

describe('render()', () => {
  it('should properly set "style" attribute on element.', done => {
    let element = {
      setAttribute: (attr, val) => {
        attr.should.equal('style');
        done();
      }
    };

    render({})(element);
  });

  it('should properly set "translateX" value on the element.', done => {
    let el = {
      setAttribute: (attr, val) => {
        attr.should.equal('style');

        let split = val.trim().split(/(transform\s*\:\s*translateX\s*\(\s*20px\s*\)\s*\;?)/);
        split.length.should.equal(3);
        split[0].should.equal('');
        split[1].length.should.not.equal(0);
        split[2].should.equal('');

        done();
      }
    };

    render({ translateX: '20px' })(el);
  });

  it('should properly set "translateY" value on the element.', done => {
    let el = {
      setAttribute: (attr, val) => {
        attr.should.equal('style');

        let split = val.trim().split(/(transform\s*\:\s*translateY\s*\(\s*50vh\s*\)\s*\;?)/);
        split.length.should.equal(3);
        split[0].should.equal('');
        split[1].length.should.not.equal(0);
        split[2].should.equal('');
        done();
      }
    };

    render({ translateY: '50vh' })(el);
  });

  it('should properly set "scale" value on the element.', done => {
    let el = {
      setAttribute: (attr, val) => {
        attr.should.equal('style');

        let split = val.trim().split(/(transform\s*\:\s*scale\s*\(\s*2\s*\)\s*\;?)/);
        split.length.should.equal(3);
        split[0].should.equal('');
        split[1].length.should.not.equal(0);
        split[2].should.equal('');
        done();
      }
    };

    render({ scale: 2 })(el);
  });

  it('should properly set "scaleX" value on the element.', done => {
    let el = {
      setAttribute: (attr, val) => {
        attr.should.equal('style');

        let split = val.trim().split(/(transform\s*\:\s*scaleX\s*\(\s*3\s*\)\s*\;?)/);
        split.length.should.equal(3);
        split[0].should.equal('');
        split[1].length.should.not.equal(0);
        split[2].should.equal('');
        done();
      }
    };

    render({ scaleX: 3 })(el);
  });

  it('should properly set "scaleY" value on the element.', done => {
    let el = {
      setAttribute: (attr, val) => {
        attr.should.equal('style');

        let split = val.trim().split(/(transform\s*\:\s*scaleY\s*\(\s*0?.5\s*\)\s*\;?)/);
        split.length.should.equal(3);
        split[0].should.equal('');
        split[1].length.should.not.equal(0);
        split[2].should.equal('');
        done();
      }
    };

    render({ scaleY: .5 })(el);
  });

  it('should only use "scale" when both "scale" and "scaleX" or "scaleY" are set.', done => {
    let el = {
      setAttribute: (attr, val) => {
        attr.should.equal('style');

        let split = val.trim().split(/(transform\s*\:\s*scale\s*\(\s*0?\.5\s*\)\s*\;?)/);
        split.length.should.equal(3);
        split[0].should.equal('');
        split[1].length.should.not.equal(0);
        split[2].should.equal('');

        done();
      }
    };

    render({ scale: .5, scaleX: 2, scaleY: 3 })(el);
  });

  it('should properly set "rotate" value on the element.', done => {
    let el = {
      setAttribute: (attr, val) => {
        attr.should.equal('style');

        let split = val.trim().split(/(transform\s*\:\s*rotate\s*\(\s*45deg\s*\)\s*\;?)/);
        split.length.should.equal(3);
        split[0].should.equal('');
        split[1].length.should.not.equal(0);
        split[2].should.equal('');
        done();
      }
    };

    render({ rotate: '45deg' })(el);
  });

  it('should properly set "rotateX" value on the element.', done => {
    let el = {
      setAttribute: (attr, val) => {
        attr.should.equal('style');

        let split = val.trim().split(/(transform\s*\:\s*rotateX\s*\(\s*45deg\s*\)\s*\;?)/);
        split.length.should.equal(3);
        split[0].should.equal('');
        split[1].length.should.not.equal(0);
        split[2].should.equal('');
        done();
      }
    };

    render({ rotateX: '45deg' })(el);
  });

  it('should properly set "rotateY" value on the element.', done => {
    let el = {
      setAttribute: (attr, val) => {
        attr.should.equal('style');

        let split = val.trim().split(/(transform\s*\:\s*rotateY\s*\(\s*45deg\s*\)\s*\;?)/);
        split.length.should.equal(3);
        split[0].should.equal('');
        split[1].length.should.not.equal(0);
        split[2].should.equal('');
        done();
      }
    };

    render({ rotateY: '45deg' })(el);
  });

  it('should properly set "rotateZ" value on the element.', done => {
    let el = {
      setAttribute: (attr, val) => {
        attr.should.equal('style');

        let split = val.trim().split(/(transform\s*\:\s*rotateZ\s*\(\s*45deg\s*\)\s*\;?)/);
        split.length.should.equal(3);
        split[0].should.equal('');
        split[1].length.should.not.equal(0);
        split[2].should.equal('');
        done();
      }
    };

    render({ rotateZ: '45deg' })(el);
  });

  it('should only use "rotate" when both "rotate" and "rotateX|Y|Z" are set.', done => {
    let el = {
      setAttribute: (attr, val) => {
        attr.should.equal('style');

        let split = val.trim().split(/(transform\s*\:\s*rotate\s*\(\s*30deg\s*\)\s*\;?)/);
        split.length.should.equal(3);
        split[0].should.equal('');
        split[1].length.should.not.equal(0);
        split[2].should.equal('');

        done();
      }
    };

    render({ rotate: '30deg', rotateX: '45deg', rotateZ: '60deg' })(el);
  });

  it('should properly set "opacity" value on the element.', done => {
    let el = {
      setAttribute: (attr, val) => {
        attr.should.equal('style');

        let split = val.trim().split(/(opacity\s*\:\s*0?\.25\s*\;?)/);
        split.length.should.equal(3);
        split[0].should.equal('');
        split[1].length.should.not.equal(0);
        split[2].should.equal('');
        done();
      }
    };

    render({ opacity: .25 })(el);
  });

  it('should properly set combination of values on element.', done => {
    let el = {
      setAttribute: (attr, val) => {
        attr.should.equal('style');

        let sort = (a, b) => a.length - b.length;
        let split = val.trim().split(/opacity\s*\:\s*0?\.45\s*\;?/).sort(sort);

        split.length.should.equal(2);
        split[0].should.equal('');

        val = split[1];
        split = val.trim().split(/transform\s*\:\s*(.+)\s*\;?/);
        split.length.should.equal(3);
        split[0].should.equal('');
        split[2].should.equal('');

        val = split[1].replace(/\;/g, '');
        split = val.trim().split(/scale\s*\(\s*2\s*\)/);
        split.length.should.equal(2);

        val = split.join(' ');
        split = val.trim().split(/translateX\s*\(\s*200px\s*\)/).sort();
        split.length.should.equal(2);
        split[0].should.equal('');

        val = split[1];
        split = val.trim().split(/rotate\s*\(\s*30deg\s*\)/);
        split.length.should.equal(2);
        split[0].should.equal('');
        split[1].should.equal('');

        done();
      }
    };

    render({
      opacity: .45,
      translateX: '200px',
      scale: 2,
      rotate: '30deg'
    })(el);
  });
});
