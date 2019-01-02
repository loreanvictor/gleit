import linear_ext from './lib/linear_ext';

function gleiten() {}

gleiten.prototype.init = function() {
  console.log(linear_ext([0, 0], [1, 1])(0.2));
}

export default new gleiten();
