function render(props) {
  var styleString = '';
  var transformString = '';

  if (props.translateX !== undefined) transformString += ' translateX(' + props.translateX + ')';
  if (props.translateY !== undefined) transformString += ' translateY(' + props.translateY + ')';

  if (props.scale !== undefined) transformString += ' scale(' + props.scale + ')';
  else {
    if (props.scaleX !== undefined) transformString += ' scaleX(' + props.scaleX + ')';
    if (props.scaleY !== undefined) transformString += ' scaleY(' + props.scaleY + ')';
  }

  if (props.rotate !== undefined) transformString += ' rotate(' + props.rotate + ')';
  else {
    if (props.rotateX !== undefined) transformString += ' rotateX(' + props.rotateX + ')';
    if (props.rotateY !== undefined) transformString += ' rotateY(' + props.rotateY + ')';
    if (props.rotateZ !== undefined) transformString += ' rotateZ(' + props.rotateZ + ')';
  }

  if (props.opacity !== undefined) styleString += 'opacity: ' + props.opacity + ';';

  if (transformString.length > 0)
    styleString = 'transform:' + transformString + ';' + styleString;

  return function(element) {
    element.setAttribute('style', styleString);
  }
}

module.exports = render;
