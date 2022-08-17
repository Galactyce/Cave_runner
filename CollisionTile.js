var CollisionTileTypes = {
  background : 0,
  normal : 1
}

function CollisionTile(type, index) {
  powerupjs.SpriteGameObject.call(this, sprites.cube, 1, 0, ID.layer_objects)
  this.tileType = type;
  this.type = undefined
  this.index = index
  this.visible = true
  this.reset()
}

CollisionTile.prototype = Object.create(powerupjs.SpriteGameObject.prototype)

CollisionTile.prototype.reset = function() {
  if (this.tileType === 'background') {
    this.type = TileType.background
  }
  else if (this.tileType === 'normal') {
    this.type = TileType.normal
  }
  else {
    this.type = TileType.background
  }
}

CollisionTile.prototype.draw = function() {
  if (this.tileType === 'background') return
  powerupjs.SpriteGameObject.prototype.draw.call(this)
}