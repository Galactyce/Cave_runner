function Door(position, destination, subRoomID, startRoom) {
  powerupjs.SpriteGameObject.call(this, sprites.metal_door, 1, 0, ID.layer_objects_2);
  this.position = position;
  this.spawnArea = destination
  this.subRoomID = subRoomID;
  this.startRoom = startRoom
}

Door.prototype = Object.create(powerupjs.SpriteGameObject.prototype);

