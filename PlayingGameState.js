function PlayingState() {
  powerupjs.GameObject.call(this);

  this.currentLevelIndex = 0;
  this.levelIDs = [];
  this.levels = [];
  this.currentCheckpoint = undefined;
  this.loadPlayer(new powerupjs.Vector2(200, 200))
  this.writeLevelsStatus()
  this.loadLevelsStatus();
  this.loadLevels();
  this.goToLevel(this.currentLevelIndex, null)
}



PlayingState.prototype = Object.create(powerupjs.GameObject.prototype);

PlayingState.prototype.loadPlayer = function (position) {
  this.player = new Player(position);
  powerupjs.Game.started = true
};

Object.defineProperty(PlayingState.prototype, "currentLevel", {
  get: function () {
      return this.levelIDs[this.currentLevelIndex];
  }
});

PlayingState.prototype.handleInput = function (delta) {
  this.currentLevel.handleInput(delta);
  this.player.handleInput(delta)

};

PlayingState.prototype.update = function (delta) {
  this.currentLevel.update(delta);
  this.player.update(delta)

};

PlayingState.prototype.draw = function () {
  this.currentLevel.draw();
  this.player.draw()
  this.currentLevel.moss_deco.draw()
  this.currentLevel.enemies.draw()

};

PlayingState.prototype.reset = function () {
  this.currentLevel.reset();
  this.player.reset()
};


PlayingState.prototype.nextLevel = function() {
   if (this.currentLevelIndex >= window.LEVELS.length - 1) return
  this.goToLevel(this.currentLevelIndex + 1)
  window.LEVELS[this.currentLevelIndex].locked = false
  this.writeLevelsStatus()
}

PlayingState.prototype.goToLevel = function (levelIndex, doorEntered) {
  if (levelIndex < 0 || levelIndex >= window.LEVELS.length)
      return;
      // if (doorEntered !== null)
      // this.currentLevelIndex = doorEntered.ID
      this.levelIDs[levelIndex] = (this.levels[levelIndex])
   this.currentLevelIndex = levelIndex;
  this.writeLevelsStatus()

};


PlayingState.prototype.loadLevels = function () {
  for (var currLevel = 0; currLevel < window.LEVELS.length; currLevel++) {     
    this.levels.push(new Level(currLevel)) 
  };
  this.goToLevel(this.currentLevelIndex, null)
};

PlayingState.prototype.loadLevelsStatus = function () {
  if (localStorage && localStorage.platformLevels) {
      window.LEVELS = JSON.parse(localStorage.platformLevels);
      window.DECORATION = JSON.parse(localStorage.platformLevelsDeco)
      window.ENEMIES = JSON.parse(localStorage.platformLevelsEnemies)

  }
};

PlayingState.prototype.writeLevelsStatus = function () {
  if (!localStorage)
      return;
  localStorage.platformLevels = JSON.stringify(window.LEVELS);
  localStorage.platformLevelsDeco = JSON.stringify(window.DECORATION);
  localStorage.platformLevelsEnemies = JSON.stringify(window.ENEMIES);

};