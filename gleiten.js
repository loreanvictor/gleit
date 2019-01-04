import animate from './lib/animate';
import render from './lib/render';

function gleiten() {}

gleiten.prototype.animateProp = animate;
gleiten.prototype.render = render;

export default new gleiten();
