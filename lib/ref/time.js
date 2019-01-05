var units = require('../units');

function time(duration, opts) {
  var mode = 0; // -- run once --
  var direction = 1;

  if (typeof duration === 'string') {
    var decomposed = units.decompose(duration);
    if (decomposed[1] === 'ms') duration = decomposed[0];
    else if (decomposed[1] === 's') duration = decomposed[0] * 1000;
    else if (decomposed[1] === 'm') duration = decomposed[1] * 60000;
    else throw new Error('unrecognized time unit: ' + decomposed[1]);
  }

  if (opts && opts.loop) mode = 1; // -- loop back --
  if (opts && opts.bounce) mode = 2; // -- bounce back --

  var dt = 1000.0 / 60;
  var now = 0;

  return function(factory) {
    var tick = factory();

    var _exec;
    _exec = function() {
      tick({ current: now, total: duration });
      now += direction * dt;
      if (now > duration) {
        if (mode == 0) return;
        if (mode == 1) now = 0;
        if (mode == 2) {
          direction = -1;
          now = duration;
        }
      }

      if (now < 0) {
        if (mode == 0) return;
        if (mode == 1) now = duration;
        if (mode == 2) {
          direction = 1;
          now = 0;
        }
      }

      setTimeout(_exec, dt);
    };

    _exec();
  }
}

module.exports = time;
