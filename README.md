# GLEIT

super easy interactive html animations, based on vertical scroll, mouse position, etc.

## how to install

```html
<script src="https://unpkg.com/gleit"></script>
```

or

```bash
npm i gleit
```
```
<script src="node_modules/gleit/dist/gleit.min.js"></script>
```

## how to use

### standard way

```html
<p data-gleit='{"0vh": {"rotate": "90deg", "opacity": 1},
                  "50vh": {"rotate": "0deg", "opacity": 0}}'>hellow</p>

<script>
window.addEventListener('load', function() {

  gleit
    .animate()
    .on(gleit.verticalScroll());

});
</script>
```

the `<p>` element will rotate 90 degrees and fades away as the page scrolls from `0vh` to `50vh`.

### bound to mouse motion

```html
<p id="main">hellow</p>

<script>
  window.addEventListener('load', function() {
    gleit
      .animate(document.getElementById('main'), {
        '0vw': {translateX: '5vw', scale: 1.5},
        '50vw': { scale: 1 },
        '100vw': {translateX: '-5vw', scale: 1.5}
      })
      .on(gleit.mouseMove.client.x);

    gleit
      .animate(document.getElementById('main'), {
        '0vh': {translateY: '5vh', opacity: 0 },
        '50vh': { opacity: 1 },
        '100vh': {translateY: '-5vh', opacity: 0 }
      })
      .on(gleit.mouseMove.client.y);
  });
</script>
```

the `<p#main>` element will move around, scale up and down and fade in and out as the mouse moves.

### multiple animations

```html
<p data-gleit='{"0vh": {"scale": 1}, "50vh": {"scale": 2}}'>hellow</p>
<p>world!</p>

<script>
  window.addEventListener('load', function() {

    gleit
      .animate()
      .on(gleit.verticalScroll());

    gleit
      .animate(document.getElementsByTagName('p'), {
        '0vh': {rotate: '0deg'},
        '50vh': {rotate: '90deg'}
      })
      .on(gleit.verticalScroll());

  });
</script>
```

the first `<p>`(_hellow_) scales up and rotates, and the second `<p>`(_world!_) only rotates, as the page scrolls from `0vh` to `50vh`.

### bound to element scroll instead of document

```html
<div id="holder" style="height:50vh; overflow: auto">
  <div style="height: 100vh">
    <p data-gleit='{"0vh": {"scale": 1}, "50vh": {"scale": 2}}'>hellow</p>
  </div>
</div>

<script>
  window.addEventListener('load', function() {

    gleit
      .animate()
      .on(gleit.verticalScroll(document.getElementById('holder')));

  });
</script>
```

will scale the `<p>` element up, but the animation is bound to scrolling of `#holder` element instead of body (body doesn't scroll).

### bound to a timeline

```html
<p data-gleit='{"0s": {"scale": 1}, "1s": {"scale": 2}}'>hellow</p>

<script>
  window.addEventListener('load', function() {

    gleit
      .animate()
      .on(gleit.timeline('2s', { bounce: true }));

  });
</script>
```

## how it generally works

```javascript
gleit.animate(<target(s)>[optional], <frames>[optional]).on(<animation ref>);
```

first, you create an animation object by calling `gleit.animate()` function. you can pass an element or a list of elements (or an `HTMLCollection` or a `NodeList`) objects to it as the `target` elements to be animated, and a description of the `frames` in your animation (see examples above). you then use the `.on()` function on the animation object to bind it to some _animation reference_ (_animation ref_ for short). an _animation ref_ can be the page's vertical scroll, the x axis of the mouse cursor, etc.


if you do not pass the `frames` parameter, the value of `data-gleit` attribute on each target element will be used for that target element, and elements without `data-gleit` attribute will be skipped. the value of `data-gleit` should be the same `frames` description, except that it should be in strict JSON format:

```html
<!-- this is wrong because ' character is not JSON standard. -->
<p data-gleit="{'0%': {'rotate': '45deg', 'opacity': 0.5}, '100%': {'rotate': '135deg', 'opacity': 1}}"></p>

<!-- this is wrong because all keys must be escaped in double quotes in JSON -->
<p data-gleit='{"0%": {rotate: "45deg", opacity: 0.5}, "100%": {rotate: "135deg", opacity: 1}}'></p>

<!-- this is wrong because JSON doesn't like .5 -->
<p data-gleit='{"0%": {"rotate": "45deg", "opacity": .5}, "100%": {"rotate": "135deg", "opacity": 1}}'></p>

<!-- CORRECT VERSION -->
<p data-gleit='{"0%": {"rotate": "45deg", "opacity": 0.5}, "100%": {"rotate": "135deg", "opacity": 1}}'></p>
```


if you do not pass the `target` parameter, all elements with `data-gleit` attribute set on them will be animated. hence, the following statements essentially do the same thing:

```javascript
gleit.animate();
gleit.animate(document.querySelectorAll('[data-gleit]'));
```

### what GLEIT does

**GLEIT** generates an animation tick function with the invokation of `gleit.animate()`, and wraps it in the returned animation object. when `.on()` is invoked on that animation object, the animation tick function is passed to the animation ref, which should bind it to an event and invoke it on every trigger of that event. for example, `gleit.verticalScroll()` will bind the tick function to `'scroll'` event of the `window`, `gleit.mouseMove.client.x` will bind to `'mousemove'` event of the `window`, etc.


the tick function will be passed an object (most probably the animation ref itself) with the following properties:
- `current`: which is the current value of the animation, like the scroll position, the x of the mouse cursor, etc. the value of `current` should be normalized to start at zero.
- `total`: the maximum value for `current`, like the scroll height of the document in case of scrolling, or the width of the window in case of mouse cursor's x axis.
- `window`: a recurrent _window_ for the value of _current_, for example the height of the window in case of scrolling. if not passed, the value of `total` will be used.

the ref object passed to tick function might have these values but with other names. for example, when the animation reference is scrolling of a specific element, the element can be passed to the animation tick function as the ref object, however it has `scrollTop`, `scrollHeight` and `clientHeight` instead of `current`, `total` and `window`. in this case, the tick function is constructed with a transform object that maps the values for `current`, `window` and `total` to the corresponding properties in the ref object.


finally, the animation tick function will extrapolate properties described in the `frames` parameter based on values of `current`, `total` and `window`, and will set the `style` attribute on target elements. multiple **GLEIT** animations properly work with each other as to not override the values set by the other, so you can safely run multiple animations on a single element, however, the value of `style` set by other sources will be completely discarded. 


**NOTE**: the animation tick function will **NOT** compute the extrapolation or set the `style` attribute on the element on the same thread as the event trigger. instead, it will utilize `requestAnimationFrame()` right after the event trigger, or will wait `1000/60` milliseconds if `requestAnimationFrame()` is not supported.


**NOTE**: the animation tick function will override the `style` attribute on the animated elements. additionally, it will (most probably) set the `transform` style attribute on the elements, which means values set for `transform` in CSS will be overriden as well.
