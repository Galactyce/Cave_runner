function Item(type, position) {
  powerupjs.SpriteGameObject.call(this, this.sprite, 1, 0, ID.layer_objects_2, ID.items);
  this.type = type;
  this.position = position;
  this.setType(type)
  this.reset()
}

Item.prototype = Object.create(powerupjs.SpriteGameObject.prototype);

Item.prototype.setType = function(type) {
  switch(type) {
    case 'wrench': 
    this.sprite = sprites.wrench_floor;
  }
}

Item.prototype.checkPickedUp = function() {
  for (var i=0; i<window.GAMEDATA.pickedUpItems.length; i++) {
    if (window.GAMEDATA.pickedUpItems[i] === this.type) return false
  }
  return true
}

Item.prototype.update = function(delta) {
  this.visible = this.checkPickedUp();
  powerupjs.SpriteGameObject.prototype.update.call(this, delta)
  var player = powerupjs.GameStateManager.get(ID.game_state_playing).player;
  if (player.boundingBox.intersects(this.boundingBox) && this.visible) {
    player.isByInteractable = true;
    if (powerupjs.Keyboard.keys[69].pressed) {
      this.visible = false;
      powerupjs.GameStateManager.get(ID.game_state_playing).inventorySlot.contains = this.type
      window.GAMEDATA.currentItem = this.type
      player.holding = window.GAMEDATA.currentItem
      window.GAMEDATA.pickedUpItems.push(this.type)
      player.isByInteractable = false
    }
  }
  else {
    player.isByInteractable = false
  }
}

Item.prototype.reset = function() {
  this.visible = true
}