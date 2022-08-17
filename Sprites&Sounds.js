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
ID.items = 4;
ID.subTiles = 5;
ID.inventory = 6;

powerupjs.Game.loadAssets = function() {
  var loadSprite = function(img, collisionMask) {
    return new SpriteSheet("Sprites/" + img, collisionMask)
  }

  sprites.cave_background_fronts = {
    '0': loadSprite("empty_background.png"),
    '1': loadSprite("cave_background_front.png")
  }



  sprites.cave_background_backs = {
    '0': loadSprite("empty_background.png"),
    '1': loadSprite("cave_background_back.png"),
    '2': loadSprite("cave_background_back2@3.png"),
    '3': loadSprite("cave_background_back3@3.png"),
    '4': loadSprite("cave_background_back4@4.png")

  }

  sprites.floor_items = {
    
  }

  sprites.interact_marker = loadSprite('interact_marker.png');
  sprites.normal_spike_block = loadSprite("normal_spike_block.png");
  sprites.cave_spikes = loadSprite("cave_spikes.png");
  sprites.platform = loadSprite('platform.png');
  sprites.checkpoint_campfire = loadSprite('checkpoint_campfire@4.png')
  sprites.checkpoint_campfire_unlit = loadSprite('checkpoint_campfire_unlit.png')
  sprites.cave_platform = loadSprite('cave_platform.png');
  sprites.ladder = loadSprite('ladder_tile.png')
  sprites.sign = loadSprite('sign.png');
  sprites.cube = loadSprite('cube.png');
  sprites.walking_controls = loadSprite('walking_controls@6.png');
  sprites.jumping_controls = loadSprite('jump_controls@3.png');
  sprites.warning_symbol = loadSprite('warning_symbol.png');
  sprites.demo_end = loadSprite('demo_end.png');
  sprites.single_cave_tile = loadSprite('single_cave_tile.png')
  sprites.idle = loadSprite("character_idle.png");
  sprites.run = loadSprite("character_run@4.png");
  sprites.wrench_idle = loadSprite("character_idle_wrench.png");
  sprites.wrench_run = loadSprite("character_run_wrench@4.png");
  sprites.text_box = loadSprite("text_box.png");
  sprites.metal_door = loadSprite("metal_door.png");
  sprites.lever_inactive = loadSprite("lever_inactive.png");
  sprites.rocket = loadSprite("rocket.png");
  sprites.rocket_base = loadSprite("rocket_base.png");
  sprites.flame_rising = loadSprite("flame_rising@2.png");
  sprites.flame_falling = loadSprite("flame_falling@2.png");
  sprites.lever_pull = loadSprite("leverflip@3.png");
  sprites.cave_tiles = loadSprite('cave-tiles@32.png');
  sprites.moss_tiles = loadSprite('moss@3.png')
  sprites.flying_bomb = loadSprite('flying_bomb@2.png');
  sprites.flying_bomb_lit = loadSprite('flying_bomb_lit@2.png');
  sprites.explode = loadSprite('explode@5.png');
  sprites.slime_bouncing = loadSprite('green_slime@2.png')
  sprites.moving_platform = loadSprite('moving_platform.png');
  sprites.moving_platform_small = loadSprite('moving_platform_small.png')
  sprites.lava_surface = loadSprite('lava_surface@2.png')
  sprites.lava_idle = loadSprite('lava_deep.png')
  sprites.workshop_background_back = loadSprite('workshop_background_back.png');
  sprites.workshop_background_front = loadSprite('workshop_background_front.png');
  sprites.inventory_empty = loadSprite('inventory_slot_empty.png');
  sprites.inventory_wrench = loadSprite('inventory_slot_wrench.png');
  sprites.broken_machine = loadSprite('broken_machine.png')
  sprites.working_machine = loadSprite('working_machine.png')
  sprites.wrench_floor = loadSprite('wrench_floor.png')
}