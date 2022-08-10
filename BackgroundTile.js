function BackgroundTile(x, y) {
  this.visible = false;
  
  powerupjs.SpriteGameObject.call(this, sprites.dirt_tile, 1, 0);
}

BackgroundTile.prototype = Object.create(powerupjs.SpriteGameObject.prototype)