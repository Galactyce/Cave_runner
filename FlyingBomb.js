function FlyingBomb(position) {
  powerupjs.AnimatedGameObject.call(this, 1, ID.layer_overlays);
  this.loadAnimation(sprites.flying_bomb, "flying", true, 0.4);
  this.loadAnimation(sprites.flying_bomb_lit, "lit", true, 0.2);
  this.loadAnimation(sprites.explode, "explode", true, 0.03);

  this.position = position;
  this.startPosition = position;
  this.playAnimation("flying");

  this.origin = new powerupjs.Vector2(this.width / 2, this.height / 2)

  this.waitTime = Date.now()
  this.exploding = false;
  this.lit = false;
  this.spawnTime = 0
  this.reset();
}

FlyingBomb.prototype = Object.create(powerupjs.AnimatedGameObject.prototype);

FlyingBomb.prototype.ignite = function () {
  this.playAnimation("lit");
};

FlyingBomb.prototype.reset = function () {
  this.velocity.x = Math.random() * 500 - 250;
  this.newXPos = Math.random() * 100 - 50 + 200;
  this.newYPos = Math.random() * 100 - 50 + 200;
  this.distance = Math.random() * 300 + 200;
  this.progress = 0;
  this.exploding = false
  this.playAnimation("flying");

  if (this.position.x > powerupjs.Game.size.x - 100) {
    this.velocity.x = Math.abs(this.velocity.x) * -1;

    // alert("Y: " + this.newYPos + ", " + 'X:' + this.newXPos)
  } else if (this.position.x < 60) {
    // this.newXPos = (Math.abs(this.newXPos)) * -1;
    this.velocity.x = Math.abs(this.velocity.x);
    // alert("Y: " + this.newYPos + ", " + 'X:' + this.newXPos)
  } else if (this.position.y > powerupjs.Game.size.y - 100) {
    this.newYPos = Math.abs(this.newYPos) * -1;
    this.velocity.y = Math.abs(this.velocity.y) * -1;
  } else if (this.position.y < 60) {
    this.newYPos = Math.abs(this.newYPos);
    this.newXPos = Math.abs(this.newXPos);
    this.velocity.y = Math.abs(this.velocity.y);
  }
};

FlyingBomb.prototype.draw = function () {
  if (Date.now() > this.spawnTime + 5000)
  powerupjs.AnimatedGameObject.prototype.draw.call(this);
};

FlyingBomb.prototype.update = function (delta) {
  if (!(Date.now() > this.spawnTime + 5000)) return

  powerupjs.AnimatedGameObject.prototype.update.call(this, delta);
  var playingState = powerupjs.GameStateManager.get(ID.game_state_playing);
  var player = playingState.player;
  var distanceX =
  player.position.x- this.position.x 
  var distanceY =
   player.position.y - this.position.y;
  if (!this.lit) {
    var slope = this.newYPos / this.newXPos;
    this.velocity.y = slope * this.position.x * delta;
    this.progress += 2;
    if (
      this.progress > this.distance ||
      this.position.y < 60 ||
      this.position.x > powerupjs.Game.size.x - 100 ||
      this.position.y > powerupjs.Game.size.y - 100 ||
      this.position.x < 60
    ) {
      this.reset();
    }
  } else {
    this.velocity.x = 0;
    this.velocity.y = 0;
  }

  if (Math.abs(distanceX) < 150 && Math.abs(distanceY)  < 150 && Date.now() > this.waitTime + 1000) {
    if (!this.lit) {
      this.explodeTime = Date.now();
      this.lit = true;
    }
   
  }
  if (this.lit) {
    if (!this.exploding)
    this.playAnimation("lit");

    if (Date.now() >= this.explodeTime + 1000) {
      if (!this.exploding) {
      this.playAnimation('explode')
      this.origin = new powerupjs.Vector2(
        this.sprite.width / 2,
        this.sprite.height / 2
      );
      this.animateTime = Date.now();
      this.exploding = true
    }
      var playingState = powerupjs.GameStateManager.get(
        ID.game_state_playing
      );
      var player = playingState.player;

   
      if (Math.abs(distanceX) < 150 && Math.abs(distanceY)  < 150) {
        player.reset()
      }
      if (Date.now() > this.animateTime + 150) {
      this.waitTime = Date.now();
      this.spawnTime = Date.now()
      this.lit = false;
      this.position = this.startPosition.copy()
      this.reset();
      }
  }
  }
  // alert(this.position.x + ", " + this.position.y)
};
