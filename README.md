# gleit

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

## API

### how it generally works

```javascript
gleit.animate(<target(s)>[optional], <animation>[optional]).on(<animation ref>);
```

for using `gleit`, you must first create an animation object using `gleit.animate()` function, and then bind that animation to one or more animation references (animation refs in short) using the `.on()` function on the animation object. for animation refs, you can use built-in refs in `gleit` such as `gleit.verticalScroll()` or `gleit.mouseMove.client.x`, or you can build your own custom animation refs based on other user interactions or composite interactions (see below).

animation refs bind to a specific event (such as page scroll or mouse movement). on each trigger of the event, a generated animation tick function will be invoked on a _ref object_ provided by the animation ref itself. these objects generally have three properties:

- `current`: the current value of the interactive animation, e.g. the time position, the raw scroll position, cursor position on x axis, etc. should be normalized starting from zero.
- `total`: the max value that `current` can assume, e.g. the scroll height of the document, the maximum x the cursor can obtain, etc.
- `window`: the width of a _window_ for the `current` value depending on the ref, e.g. the window height in scroll. if not provided, `total` will be used instead of `window`.

note that the ref object might have different names for these values (for example, in case of animation based on element scroll, the ref object is the host element itself, which has `scrollTop`, `scrollHeight` and `clientHeight` properties instead of `current`, `total` and `window` respectively), in which case a `transform` object should be passed to the tick function so that it reads the correct properties.

the generated tick function then uses the ref object to extrapolate certain css values (see below) based on animation description and apply it to the animated element using the `style` attribute. note that although multiple `gleit` animations will work properly with each other, the `style` attribute is generally overriden by `gleit` on animated elements. additionally, since `gleit` overrides the `transform` property on animated elements, the css `transform` value on animated elements is usually overriden.

### `gleit.animate(target, frames)`

#### parameter `target`
_optional_  
can be a single HTML element, an array of elements, an `HTMLCollection` or a `NodeList`.
```javascript
gleit.animate(document.getElementById('<id>'));
gleit.animate(document.getElementsByClassName('<class name>'));
gleit.animate(document.querySelectorAll('<css query>');
```
calling `gleit.animate()` without passing the `target` parameter is equivalent of calling
```javascript
gleit.animate(document.querySelectorAll('[data-gleit]');
```
so it will also not work on browsers not supporting `document.querySelectorAll`.

#### parameter `frames`
_optional_  
the description of the animation frames. the frames object should contain keys for each frame, which should be of the form `<value><unit>`. `<value>` should be a number, and `<unit>` must be either non-present or one of the following:

- `px`
- `%`
- `vw` & `vh`
- `w`
- `s`
- `ms`
- `m`
