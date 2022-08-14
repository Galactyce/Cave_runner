window.DECORATION = [];

// ----CAVE TILES------
// # = 0
// R = 2
// L = 3
// @ = 1
// U = 4
// E = 5
// T = 6
// Y = 7
// I = 8
// B = 16
// H = 15
// J = 14
// K = 13
// O = 12
// P = 11
// Z = 10
// Q = 9
// W = 14
// C = 16
// $ = 17
// + = 18
// ^ = 19
// G = 26
// S = 23
// D = 20
// M = 22
// ? = 25
// % = 21
// - = platform
// N = single

// ----MOSS TILES------
// # = block
// . = background
// numbers = sheetIndex

window.DECORATION.push({
  ID: 1,
  cave_tiles: [
         
    "+@@@@@@@@@@@@@@@@@@@@@@@",
    "L.......................",
    "L.......................",
    "K..................SGGGH",
    "........SGGGGGG%.......R",
    ".......................R",
    "O-----.................R",
    "L......................R",
    "LSGGG%.................R",
    "L......................R",
    "L.......SGGGGGG%.......R",
    "L..................H###C",
    "L..................RBBBB",
    '$##################CBBBB'
  ],

  moss_tiles: [
         
    "###33333################",
    "#...3333................",
    "#...333.................",
    "#...333............#####",
    ".....33...#2331#.......#",
    ".....3......33.........#",
    "#----3......3..........#",
    "#...........3..........#",
    "##21##.................#",
    "#......................#",
    "#........#11####.......#",
    "#..................#333#",
    "#..................#333#",
    '#####################3##'
  ],

  lava_tiles: [
         
    "########################",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    '########################'
  ]
})



window.DECORATION.push({
  ID : 2,
  cave_tiles: [
         
    "@@@@@@@@@@@@@@@@@@@@@@@^",
    ".......................R",
    ".......................R",
    "O%-----GGGGGGGGGG%.....R",
    "L......................R",
    "L..SG%.................R",
    "L......................R",
    "L......SGG%..........SGG",
    "L......................R",
    "LSG%.........SGGG%.....R",
    "L......................R",
    "L...................S##C",
    "L....................RBB",
    '$###.################CBB'
  ],
  moss_tiles: [
         
    "########################",
    ".......................#",
    ".......................#",
    "#33333-##11212221#.....#",
    "#3333..................#",
    "#3.33#.................#",
    "#3.33..................#",
    "#...3..121...........22#",
    "#......................#",
    "#33#.........#333#.....#",
    "#33............3.......#",
    "#33..................###",
    "#3.....................#",
    '########################'
  ],

  lava_tiles: [
         
    "########################",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    '########################'
  ]
})

window.DECORATION.push({
  ID: 3,
  cave_tiles: [
         
    "+@@@@@@@@@@@@@@@@@@@@@@^",
    "L......................R",
    "K......................R",
    ".......................J",
    "........................",
    "###O....................",
    "BBB$##O.........H#######",
    "BBBBBBL.........RBBBBBBB",
    "BBB+@@K.........RBBBBBBB",
    "BB+K............J@@@^BBB",
    "B+K.................J@@^",
    "+K.....................R",
    "L......................R",
    '$######################C'
  ],
  moss_tiles: [
         
    "########################",
    "#......................#",
    "#......................#",
    ".......................#",
    ".......................#",
    "221#...................#",
    "#11321#.........221212##",
    "1333333.........3131313#",
    "#333333.........1#233232",
    "333#..3.........#223#132",
    "333...3.............##31",
    "3#3...................3#",
    "#.3....................#",
    '########################'
  ],

  lava_tiles: [
         
    "########################",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    '########################'
  ]
})

window.DECORATION.push({
  ID: 4,
  cave_tiles: [
         
    "+@@@.@@@@@@@@@@@@@@@@@@^",
    "L......................R",
    "L......................R",
    "L......................R",
    "L---GG%................R",
    "L......................R",
    "L......................R",
    "LGG%...................R",
    "L......................R",
    "L......SGG%............R",
    "L............SGG%......R",
    "L......................R",
    "L......................R",
    '$######################C'
  ],
  moss_tiles: [
         
    "#213############333333##",
    "#..3.............33333.#",
    "#..3.............3333..#",
    "#.................33...#",
    "3---213...........33...#",
    "3.....3............3...#",
    "3..................3...#",
    "312#...................#",
    "#......................#",
    "#.......1221...........#",
    "#.............2212.....#",
    "#......................#",
    "#......................#",
    '########################'
  ],
  lava_tiles: [
         
    "########################",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    '########################'
  ]
})

window.DECORATION.push({
  ID: 5,
  cave_tiles: [
         
    "+@@@@@@@@@@@@@@@@@@@@@@^",
    "L......................J",
    "L.......................",
    "L.......................",
    "L..................S#--#",
    "L...................#..R",
    "L...................#..R",
    "L......................R",
    "L......................R",
    "L......................R",
    "GGGG%...............H#.R",
    "L...................RB.R",
    "L...................RB.R",
    '$###################CB.C'
  ],
  moss_tiles: [
         
    "########################",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    '########################'
  ],
  lava_tiles: [
         
    "########################",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    '########################'
  ]
})


window.DECORATION.push({
  ID: 6,
  cave_tiles: [
         
    "+@@@@@@@@@@@@@@@@@@?@K.R",
    "...................?...R",
    "...................?...R",
    "L-----###---.......?.H#C",
    "L..................?.RBB",
    "L...........---####?.RBB",
    "L..................?.RBB",
    "L..######..........?.RBB",
    "L..................?.RBB",
    "L..........####....?.RBB",
    "L..................M.RBB",
    "L..#######...........RBB",
    "L....................RBB",
    '$####################CBB'
  ],
  moss_tiles: [
         
    "########################",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    '########################'
  ],

  lava_tiles: [
         
    "########################",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    '########################'
  ]
})

window.DECORATION.push({
  ID: 7,
  cave_tiles: [
         
    "@@@^BBBBBBBBBBBBB+@@@@@^",
    "...RBBBBBBBBBBBBBL.....R",
    "...RBBBBBBBBBBBBBL.....R",
    "G%.RBBBBBBBBBBBBBL...SGG",
    "BL.RBBBBBBBBBBBBBL.....R",
    "BL.J@@@@@@@@@@@@@K.....R",
    "BL.....................R",
    "BL.....................R",
    "BL.....................R",
    "BL.....................R",
    "BL---------------------R",
    "BL.....................R",
    "BL.....................R",
    'B$#####################C'
  ],
  moss_tiles: [
         
    "########################",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    '########################'
  ],

  lava_tiles: [
         
    "########################",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "#......................#",
    "##TTTTTTTTTTTTTTTTTTTTT#",
    "##DDDDDDDDDDDDDDDDDDDDD#",
    '########################'
  ]
})
