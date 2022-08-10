var sprites = {};


var ID = {};

ID.layer_background = 1;
ID.layer_background_1 = 2;
ID.layer_background_2 = 3;
ID.layer_background_3 = 4;
ID.layer_tiles = 10;
ID.layer_objects = 20;
ID.layer_objects_1 = 21;
ID.layer_objects_2 = 22;
ID.layer_overlays = 30;
ID.layer_overlays_1 = 31;
ID.layer_overlays_2 = 32;

ID.tiles = 1;
ID.player = 2;
ID.deco = 3;


powerupjs.Game.loadAssets = function() {
  var loadSprite = function(img, collisionMask) {
    return new SpriteSheet("Sprites/" + img, collisionMask)
  }
  sprites.cave_background_front = loadSprite("cave_background_front.png");
  sprites.cave_background_back = loadSprite("cave_background_back.png");
  sprites.normal_spike_block = loadSprite("normal_spike_block.png");
  sprites.cave_spikes = loadSprite("cave_spikes.png");
  sprites.platform = loadSprite('platform.png');
  sprites.checkpoint = loadSprite('checkpoint_gem.png')
  sprites.cave_platform = loadSprite('cave_platform.png');
  sprites.ladder = loadSprite('ladder_tile.png')
  sprites.block = loadSprite('block.png');
  sprites.single_cave_tile = loadSprite('single_cave_tile.png')
  sprites.idle = loadSprite("character_idle.png", true);
  sprites.run = loadSprite("character_run@4.png", true);
  sprites.cave_tiles = loadSprite('cave-tiles@32.png');
  sprites.moss_tiles = loadSprite('moss@3.png')
  sprites.flying_bomb = loadSprite('flying_bomb@2.png');
  sprites.flying_bomb_lit = loadSprite('flying_bomb_lit@2.png');
  sprites.flying_bomb_explode = loadSprite('flying_bomb_explode@5.png');
  sprites.slime_bouncing = loadSprite('green_slime@2.png', true)
  sprites.moving_platform = loadSprite('moving_platform.png')
}