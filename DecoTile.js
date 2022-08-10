

function CaveDecoTile(sheetIndex, index, special) {
  this.scale = 1
  this.special = typeof special !== 'undefined' ? special : 'none'
  powerupjs.SpriteGameObject.call(this, this.sprite, this.scale, 0, ID.layer_objects);
  if (this.special === 'none')
  this.sprite = sprites.cave_tiles;
  if (this.special === 'platform') 
  this.sprite = sprites.cave_platform;
  if (this.special === 'single') 
  this.sprite = sprites.single_cave_tile;
  this.sheetIndex = sheetIndex
  this.index = index
  this.visible = true
}

CaveDecoTile.prototype = Object.create(powerupjs.SpriteGameObject.prototype)



CaveDecoTile.prototype.update = function(delta) {
  powerupjs.SpriteGameObject.prototype.update.call(this, delta);
}


CaveDecoTile.prototype.draw = function() {
  if (!this.visible) return
  powerupjs.SpriteGameObject.prototype.draw.call(this);
}


function MossDecoTile(sheetIndex, index) {
  this.scale = 1
  this.sprite = sprites.moss_tiles;
  powerupjs.SpriteGameObject.call(this, this.sprite, 1, 0);
  if (this.sheetIndex == 2) {
    this.layer = ID.layer_overlays_1
  }
  this.sheetIndex = sheetIndex
  this.index = index
  this.visible = true
}

MossDecoTile.prototype = Object.create(powerupjs.SpriteGameObject.prototype)

MossDecoTile.prototype.draw = function() {
  powerupjs.SpriteGameObject.prototype.draw.call(this)
}