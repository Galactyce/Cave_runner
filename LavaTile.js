function LavaTile(type, index) {
  powerupjs.AnimatedGameObject.call(this, 1, ID.layer_overlays_1);
  this.loadAnimation(sprites.lava_surface, 'surface', true, 0.25);
  this.loadAnimation(sprites.lava_idle, 'idle', false, 1)
  if (type === 'surface') {
    this.playAnimation('surface');
  }

  else if (type === 'deep') {
    this.playAnimation('idle')
  }
  this.index = index
}

LavaTile.prototype = Object.create(powerupjs.AnimatedGameObject.prototype);

