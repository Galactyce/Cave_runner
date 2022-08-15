var TileType = {
  background: 0,
  normal: 1,
  platform: 2,
  danger: 3,
  ladder: 4
}

function Tile(type, index, dangerType) {
  this.scale = 1
  powerupjs.SpriteGameObject.call(this, this.sprite, this.scale, 0, ID.layer_overlays);
  this.sprite = sprites.single_cave_tile;
  this.dangerType = typeof dangerType !== 'undefined' ? dangerType : 'spike_block'
  this.sheetIndex = 0
  this.index = index
  this.typeBlock = type 
  this.visible = false
  this.reset();
}

Tile.prototype = Object.create(powerupjs.SpriteGameObject.prototype)

Tile.prototype.reset = function() {
  if (this.typeBlock === 'ground') {
    this.sheetIndex = 0;
    this.scale = 1
    this.type = TileType.normal
  }
  else if (this.typeBlock === 'background') {
    this.type = TileType.background
  }
  else if (this.typeBlock === 'platform') {
    this.sprite = sprites.platform;
    this.scale = 1;
    this.type = TileType.platform
  }
  else if (this.typeBlock === 'danger') {
    this.visible = true
    if (this.dangerType === 'spike_block')
    this.sprite = sprites.normal_spike_block;
    else if (this.dangerType === 'cave_spike') 
    this.sprite = sprites.cave_spikes;
    else 
    this.visible = false;
    this.type = TileType.danger
    
  }
  else if (this.typeBlock === 'ladder') {
    this.visible = true
    this.sprite = sprites.ladder;
    this.scale = 1;
    this.type = TileType.ladder
  }
  else {
    this.type = TileType.background
  }
}

Tile.prototype.update = function(delta) {
  powerupjs.SpriteGameObject.prototype.update.call(this, delta);
}


Tile.prototype.draw = function() {
  if (this.typeBlock === 'background'|| !this.visible) return
  powerupjs.SpriteGameObject.prototype.draw.call(this);

}
