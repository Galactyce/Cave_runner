function Inventory(position) {
  powerupjs.SpriteGameObject.call(this, this.sprite, 1, 0, ID.layer_overlays_1, ID.inventory);
  this.position = position
  this.contains = 'nothing'
  this.sprite = null;
}

Inventory.prototype = Object.create(powerupjs.SpriteGameObject.prototype)

Inventory.prototype.draw = function() {
  if (this.contains === 'nothing') {
    this.sprite = sprites.inventory_empty
  }
  else if (this.contains === 'wrench') {
    this.sprite = sprites.inventory_wrench
  }
  powerupjs.SpriteGameObject.prototype.draw.call(this)
}