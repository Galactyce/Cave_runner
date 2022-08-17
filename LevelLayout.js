window.LEVELS = []

// # = Block
// @ = Door
// - = Platform
// D = Danger
// K = Spike Block
// H = Ladder
// . = background
// p = moving platform track


window.LEVELS.push({
  entered: true,
  checked: false,
  ID: 1,
  movingPlatforms: [],
  levers: [],
  subRoomDoors: [],
  backgrounds: [1, 1],
  items: [],
  brokenMachines: [],
  cutscenes: [],
  doors : [{x: 1440, y: 120, width: 60, height: 60,  destX: 160, destY: 120, ID: 1},
    {x: -30, y: 360, width: 60, height: 60,  destX: 1360, destY: 300, ID: 2}],
  platforms: [],
  signs: [{text: '', pos: new powerupjs.Vector2(200, 700), type: 'walking'}, 
  {text: '', pos: new powerupjs.Vector2(1000, 700), type: 'jumping'},
  {text: '', pos: new powerupjs.Vector2(200, 275), type: 'warning'}],
  tiles: [
         
          "########################",
          "#......................@",
          "#......................@",
          "#..................#####",
          "@.......########.......#",
          "@......................#",
          "#-----.................#",
          "#......................#",
          "######.................#",
          "#......................#",
          "#.......########.......#",
          "#..................#####",
          "#..................#####",
          "########################",]
})

window.LEVELS.push({
  entered: false,
  checked: false,
  ID: 2,
  movingPlatforms: [],
  backgrounds: [1, 2],
  cutscenes: [],
  levers: [],
  platforms: [],
  signs: [],
  brokenMachines: [],
  items: [],
  subRoomDoors: [],
  doors : [{x: -20, y: 160, width: 80, height: 80, destX: 1360, destY: 120, ID: 0},
     {x: 240, y: 830, width: 60, height: 60, destX: 240, destY: 60, ID: 3}],
  tiles: [
         
    "########################",
    "@......................#",
    "@......................#",
    "##-----###########.....#",
    "#......................#",
    "#..###.................#",
    "#.....................C#",
    "#......####..........###",
    "#......................#",
    "####.........#####.....#",
    "#......................#",
    "#...................####",
    "#...H................###",
    "####H###################",]
})

window.LEVELS.push({
  entered: false,
  checked: false,
  ID: 3,
  movingPlatforms: [],
  backgrounds: [0, 3],
  levers: [],
  signs: [],
  items: [],
  brokenMachines: [],
  cutscenes: [
    {parts: new Array(['hideplayer', 0], ['switchroom', 2000, 2], ['end']), rect: new powerupjs.Rectangle(0, 0, 1, 1), 
    triggerArea: 3, triggerID: 1, reusable: false, index: 0}
  ],
  subRoomDoors: [],
  platforms: [{x: 600, y: 150, destX: 600, destY: 400, id: 1, active: false}],
  doors : [{x: 1440, y: 360, width: 80, height: 80, destX: 80, destY: 360, ID: 0}, 
    {x: -30, y: 180, width: 40, height: 120, destX: 1360, destY: 180, ID: 4}],
  tiles: [
         
    "########################",
    "#......................#",
    "#......................#",
    "@......................#",
    "@......................@",
    "####...................@",
    "#######.........########",
    "#######.........########",
    "#######.........########",
    "#####...........########",
    "####...............#####",
    "###...................##",
    "#DDDDDDDDDDDDDDDDDDDDDD#",
    "########################",]
})

window.LEVELS.push({
  entered: false,
  checked: false,

  ID: 4,
  movingPlatforms: [{x: 380, y: 240, destX: 800, destY: 300, vX: 200, vY: 0, size: 'big', triggerID: undefined},
  {x: 1080, y: 600, destX: 1080, destY: 300, vX: 0, vY: -200, size: 'big', triggerID: undefined}],
  levers: [{x: 60, y: 300, id: 1}],
  platforms: [],
  backgrounds: [0, 2],
  cutscenes: [],
  brokenMachines: [],
  items: [],
  signs: [],
  subRoomDoors: [],
  doors : [{x: 240, y: -70, width: 60, height: 60, destX: 240, destY: 780, ID: 1}],
  tiles: [
         
    "####H###################",
    "#...H..................#",
    "#...H..................#",
    "#...H..PPPPPPPPPPP.....#",
    "#---###KKKKKKKKKK...P..#",
    "#...................P..#",
    "#...................P..#",
    "####................P..#",
    "#...................p..#",
    "#......####.........P..#",
    "@............####...P..#",
    "@......................#",
    "#DDDDDDDDDDDDDDDDDDDDDD#",
    "########################",]
})

window.LEVELS.push({
  entered: false,
  checked: false,
  ID: 5,
  movingPlatforms: [{x: 200, y: 280, destX: 970, destY: 280, vX: -200, vY: 0, size: 'big', triggerID: undefined},
   {x: 300, y: 640, destX: 1000, destY: 640, vX: -200, vY: 0, size: 'big', triggerID: undefined},
  {x: 1270, y: 480, destX: 1270, destY: 260, vX: 0, vY: 200, size: 'small', triggerID: undefined}],
  levers: [],
  platforms: [],
  brokenMachines: [],
  backgrounds: [1, 1],
  cutscenes: [],
  signs: [],
  items: [],
  subRoomDoors: [],
  doors : [{x: 1380, y: 180, width: 40, height: 120, destX: 60, destY: 180, ID: 2}, {x: 1350, y: 820, width: 40, height: 120, destX: 1350, destY: 90, ID: 5}],
  tiles: [
         
    "########################",
    "#...............K......#",
    "#......................@",
    "#..........K.........C.@",
    "#...PPPPPPPPPPPPPPP##--#",
    "#....KKKKKKKKKKKKKKK#..#",
    "#...................#..#",
    "#...............K......#",
    "#......................#",
    "#.........K............#",
    "#####PPPPPPPPPPPPPPP##H#",
    "#...................##H#",
    "#DDDDDDDDDDDDDDDDDDD##H#",
    "######################H#",]
})


window.LEVELS.push({
  entered: false,
  checked: false,
  ID: 6,
  movingPlatforms: [],
  levers: [],
  brokenMachines: [],
  backgrounds: [1, 1],
  platforms: [],
  signs: [],
  items: [],
  cutscenes: [],
  subRoomDoors: [],
  doors : [{x: 1350, y: -100, width: 40, height: 120, destX: 1350, destY: 750, ID: 4}, 
    {x: -40, y: 60, width: 40, height: 120, destX: 1350, destY: 100, ID: 6}],
  tiles: [
         
    "######################H#",
    "...................#..H#",
    "...................#H.H#",
    "#-----###---.......#H###",
    "#..................#H###",
    "#...........---#####H###",
    "#..................#H###",
    "#..######..........#H###",
    "#..................#H###",
    "#..........####....#H###",
    "#..................#H###",
    "#..#######..........H###",
    "#...................H###",
    "########################",]
})

window.LEVELS.push({
  entered: false,
  checked: false,
  ID: 7,
  movingPlatforms: [],
  levers: [],
  signs: [],
  brokenMachines: [],
  backgrounds: [1, 4],
  platforms: [],
  cutscenes: [],
  items: [],
  subRoomDoors: [],
  doors : [{x: 1440, y: 60, width: 40, height: 120, destX: 60, destY: 100, ID: 5},
  {x: -20, y: 420, width: 40, height: 120, destX: 1400, destY: 420, ID: 7}],
  tiles: [
         
    "########################",
    "##################......",
    "##################..H...",
    "##################..H###",
    "##################..H..#",
    "##################..H..#",
    "###.................H..#",
    "###.................H..#",
    "....................H..#",
    "...C................H..#",
    "##---------------------#",
    "##LLLLLLLLLLLLLLLLLLLLL#",
    "##LLLLLLLLLLLLLLLLLLLLL#",
    "########################",]
})

window.LEVELS.push({
  entered: false,
  checked: false,
  ID: 8,
  movingPlatforms: [],
  levers: [],
  signs: [],
  items: [],
  brokenMachines: [],
  backgrounds: [1, 4],
  platforms: [],
  cutscenes: [],
  subRoomDoors: [{x: 1100, y: 680, destX: 450, destY: 300, subRoomID: 0}],
  doors : [{x: 1440, y: 420, width: 40, height: 120, destX: 60, destY: 420, ID: 6},
    {x: 1260, y: 0, width: 180, height: 10, destX: 1260, destY: 660, ID: 8}],
  tiles: [
         
    "####################.H##",
    "#..................#.H##",
    "#..................#.H##",
    "#..................#.H##",
    "#....................H##",
    "#H......-.....-......H##",
    "#H###KKKKKKKKKKK#####H##",
    "#H..................#H##",
    "#H..................#H.@",
    "#H......-...-...-...#H.@",
    "#H..................####",
    "#----...-...-...#....###",
    "#DDDDDDDDDDDDDDD#....###",
    "########################"]
})

window.LEVELS.push({
  entered: false,
  checked: false,
  ID: 9,
  movingPlatforms: [{x: 100, y: 660, destX: 100, destY: 300, vX: 0, vY: 200, size: "big", triggerID: 1}],
  levers: [],
  signs: [],
  items: [],
  brokenMachines: [{x: 300, y: 680, triggerID: 1, active: false}],
  backgrounds: [1, 1],
  platforms: [],
  cutscenes: [{parts: new Array(['hideplayer', 0], ['showimage', new powerupjs.Vector2(0, 0), sprites.demo_end, 0],
   ['end']), rect: new powerupjs.Rectangle(1330, 60, 60, 180), 
  triggerArea: 8, triggerID: 0, reusable: false, index: 1}],
  subRoomDoors: [],
  doors : [{x: 1240, y: 780, width: 180, height: 20, destX: 1260, destY: 70, ID: 7}],
  tiles: [
         
    "########################",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......####...--...#####",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#....................H##",
    "#....................H##",
    "####################-H##"]
})
