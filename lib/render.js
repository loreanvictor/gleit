function render(props) {
  var styleString = '';
  var transformString = '';

  if (props.translateX) transformString += ' translateX(' + props.translateX + ')';
  if (props.translateY) transformString += ' translateY(' + props.translateY + ')';

  if (props.scale) transformString += ' scale(' + props.scale + ')';
  else {
    if (props.scaleX) transformString += ' scaleX(' + props.scaleX + ')';
    if (props.scaleY) transformString += ' scaleY(' + props.scaleY + ')';
  }

  if (props.rotate) transformString += ' rotate(' + props.rotate + ')';
  else {
    if (props.rotateX) transformString += ' rotateX(' + props.rotateX + ')';
    if (props.rotateY) transformString += ' rotateY(' + props.rotateY + ')';
    if (props.rotateZ) transformString += ' rotateZ(' + props.rotateZ + ')';
  }

  if (props.opacity) styleString += 'opacity: ' + props.opacity + ';';

  if (transformString.length > 0)
    styleString = 'transform:' + transformString + ';' + styleString;

  return function(element) {
    element.setAttribute('style', styleString);
  }
}

module.exports = render;
