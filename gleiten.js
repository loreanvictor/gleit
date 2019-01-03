import { position } from './lib/units';

function gleiten() {}

gleiten.prototype.init = function(ref) {
  if (ref) {
    ref.addEventListener('scroll', function() {
      console.log(position(ref, 'px'));
      console.log(position(ref, '%'));
      console.log(position(ref, 'vh'));
    });
  }
  else {
    window.addEventListener('scroll', function() {
      console.log(position(document.body, 'px'));
      console.log(position(document.body, '%'));
      console.log(position(document.body, 'vh'));
    });
  }
}

export default new gleiten();
