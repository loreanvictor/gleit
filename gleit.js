import animate from './lib/animate';
import render from './lib/render';

import scroll from './lib/ref/scroll';
import hscroll from './lib/ref/hscroll';
import mouse from './lib/ref/mouse';
import time from './lib/ref/time';


import './polyfill/map';
import './polyfill/assign';
import './polyfill/is_array';
import './polyfill/request_animation_frame';


function gleit() {}

gleit.prototype.animateProp = animate;
gleit.prototype.renderStyles = render;

gleit.prototype.verticalScroll = scroll;
gleit.prototype.horizontalScroll = hscroll;
gleit.prototype.mouseMove = mouse;
gleit.prototype.timeline = time;

gleit.prototype.animate = function(elements, frames) {
  if (!elements) {
    if (document.querySelectorAll) {
      return this.animate(document.querySelectorAll('[data-gleit]'), frames);
    }
  }

  if (!Array.isArray(elements) &&
      !(elements.constructor && elements.constructor.name &&
        (elements.constructor.name === 'HTMLCollection' ||
        elements.constructor.name === 'NodeList'
        ))) return this.animate([elements], frames);

  var funcs = [];
  var animate = undefined;

  if (frames)
    animate = this.animateProp(frames);

  for (var index = 0; index < elements.length; index++) {
    var _animate = animate;
    var _el = elements[index];

    if (!_animate && _el.hasAttribute('data-gleit')) {
      try {
        var _frames = JSON.parse(_el.getAttribute('data-gleit'));
        _animate = this.animateProp(_frames);
      }
      catch(err) {}
    }

    if (_animate)
      funcs.push([_el, _animate]);
  }

  var _this = this;

  function tick(transform) {
    var animations = funcs.map(function(item) {
      return [item[0], item[1](transform)];
    });

    return function(ref) {
      window.requestAnimationFrame(function() {
        for (var index in animations) {
          var animation = animations[index];
          var computedStyles = animation[1](ref);
          var element = animation[0];
          var prior = element.getAttribute('data-gleit-computed');
          if (prior)
            computedStyles = Object.assign({}, JSON.parse(prior), computedStyles);
          element.setAttribute('data-gleit-computed', JSON.stringify(computedStyles));
          _this.renderStyles(computedStyles)(animation[0]);
        }
      });
    }
  }

  return {
    on: function(bind) {
      bind(tick);
    }
  }
}

export default new gleit();
