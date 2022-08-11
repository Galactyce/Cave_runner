function InteractMarker() {
  powerupjs.SpriteGameObject.call(this, sprites.interact_marker, 1, 0, ID.layer_overlays_1);
}

InteractMarker.prototype = Object.create(powerupjs.SpriteGameObject.prototype);

InteractMarker.prototype.draw = function() {
  powerupjs.SpriteGameObject.prototype.draw.call(this);
}