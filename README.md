# gleiten

super easy interactive html animations, based on vertical scroll, mouse position, etc.

**NOTE**: if you just want some animation on elements when they are "scrolled into view", there are better libraries to achieve that such as [AoS](https://michalsnik.github.io/aos/). this library helps you design animations based on general scroll position.

## how to install

_coming soon_

## how to use

### basic usage

```html
<p data-gleiten='{"0vh": {"rotate":"0deg"}, "50vh": {"rotate": "90deg"}}'>hellow</p>
```
```javascript
window.addEventListener('load', function() {
  gleiten.animate().on(gleiten.verticalScroll());
});
```

the `<p>` element will rotate 90 degrees as the page scrolls from `0vh` to `50vh`.
