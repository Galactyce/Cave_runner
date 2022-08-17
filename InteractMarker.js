function InteractMarker() {
  powerupjs.SpriteGameObject.call(this, sprites.interact_marker, 1, 0, ID.layer_overlays_2);
}

InteractMarker.prototype = Object.create(powerupjs.SpriteGameObject.prototype);