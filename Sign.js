function Sign(text, position, type) {
  this.type = typeof type !== 'undefined' ? type : 'normal'
  this.text = typeof text !== 'undefined' ? text : 'M';
  powerupjs.SpriteGameObject.call(this, sprites.sign, 1, 0, ID.layer_objects_2);
  this.position = new powerupjs.Vector2(position.x, position.y + 25);
  if (this.type !== 'normal') {
  this.controls = new ControlSign(this.type);
  this.controls.position = new powerupjs.Vector2(position.x, position.y - this.controls.height)
  }
}

Sign.prototype = Object.create(powerupjs.SpriteGameObject.prototype);

Sign.prototype.update = function(delta) {
  powerupjs.SpriteGameObject.prototype.update.call(this, delta)
  var player = powerupjs.GameStateManager.get(ID.game_state_playing).player
  if (player.boundingBox.intersects(this.boundingBox)) {
    if (this.type !== 'normal') {
      this.controls.visible = true;
    }
  }
  else {
    this.controls.visible = false
  }
}
 
function ControlSign(type) {
  powerupjs.AnimatedGameObject.call(this, 1, ID.layer_overlays_2);
  this.type = type
  this.loadAnimation(sprites.walking_controls, 'walking', true, 0.25);
  this.loadAnimation(sprites.jumping_controls, 'jumping', true, 0.25);
  this.loadAnimation(sprites.warning_symbol, 'warning', false, 1);
  this.setScale();
  this.layer = ID.layer_overlays_1
  this.playAnimation(type)
}

ControlSign.prototype = Object.create(powerupjs.AnimatedGameObject.prototype);

ControlSign.prototype.setScale = function() {
  if (this.type === 'walking') {
    this.scale = 0.9
  }
  else if (this.type === 'jumping') {
    this.scale = 0.95
  }
  else if (this.type === 'warning') {
    this.scale = 1
  }
}

ControlSign.prototype.draw = function() {
  powerupjs.AnimatedGameObject.prototype.draw.call(this);

}