const { Game } = require('../src/js/_game.js');
const { TileData } = require('../src/js/_tiledata.js');

var game = new Game();

beforeEach(() => {
    game.tileMapData = [
        [new TileData("-", 0), new TileData("L", 0), new TileData("L", 0), new TileData("I", 0), new TileData("I", 0), new TileData("-", 0)],
        [new TileData("S", 0), new TileData("T", 0), new TileData("L", 0), new TileData("T", 0), new TileData("X", 0), new TileData("E", 2)],
        [new TileData("-", 0), new TileData("T", 0), new TileData("I", 0), new TileData("T", 0), new TileData("L", 0), new TileData("-", 0)],
    ];
});

describe('Test if x and y are in bounds of tilemap and return true', () => {
    test.each`
    x    | y
   
    ${0} | ${0}
    ${5} | ${2}
    ${3} | ${2}
   
    `(`(x = $x, y = $y) is in bounds of tilemap (xMax = ${game.tileMapData[0].length-1}, yMax = ${game.tileMapData.length-1})`, ({x, y}) => {
        expect(game.isInBoundsOfTileMap(x,y)).toBe(true);
    })
});

describe('Test if x and y are in out of bounds of tilemap and return false', () => {
    test.each`
    x    | y
   
    ${-1} | ${0}
    ${0}  | ${-1}
    ${-1} | ${-1}
    ${10} | ${0}
    ${0}  | ${10}
    ${10} | ${10}
   
    `(`(x = $x, y = $y) is out of bounds of tilemap (xMax = ${game.tileMapData[0].length-1}, yMax = ${game.tileMapData.length-1})`, ({x, y}) => {
        expect(game.isInBoundsOfTileMap(x,y)).toBe(false);
    })
});

test("getTileAtPos with x = 5 and y = 1 returns element of array[1][5]", () => {
    expect(game.getTileAtPos(5,1)).toEqual(game.tileMapData[1][5]);
});

describe('Test if tiles matches is true', () => {
    test.each`
    tileA                   | tileB                   | direction 
   
    ${new TileData('I', 1)} | ${new TileData('I', 1)} | ${'up'}
    ${new TileData('I', 0)} | ${new TileData('I', 0)} | ${'right'}
    ${new TileData('I', 1)} | ${new TileData('I', 1)} | ${'down'}
    ${new TileData('I', 0)} | ${new TileData('I', 0)} | ${'left'}
   
    `('$tileA matches $tileB in direction $direction', ({tileA, tileB, direction}) => {
        expect(game.matchTilesInDirection(tileA, tileB, direction)).toBe(true);
    })
});

describe('Test if tiles matches is false', () => {
    test.each`
    tileA                   | tileB                   | direction 
   
    ${new TileData('I', 0)} | ${new TileData('I', 0)} | ${'up'}
    ${new TileData('I', 1)} | ${new TileData('I', 1)} | ${'right'}
    ${new TileData('I', 0)} | ${new TileData('I', 0)} | ${'down'}
    ${new TileData('I', 1)} | ${new TileData('I', 1)} | ${'left'}
   
    `('$tileA doesn\'t matches $tileB in direction $direction', ({tileA, tileB, direction}) => {
        expect(game.matchTilesInDirection(tileA, tileB, direction)).toBe(false);
    })
});

test("Invalid direction 'south' throws error when trying to match tiles", () => {
    expect(() => game.matchTilesInDirection(new TileData('I', 0), new TileData('I', 0), 'south')).toThrowError();
});
test("When tileA is null throw error on matching tiles", () => {
    expect(() => game.matchTilesInDirection(null, new TileData('I', 0), 'up')).toThrowError();
});
test("When tileB is null throw error on matching tiles", () => {
    expect(() => game.matchTilesInDirection(new TileData('I', 0), null, 'up')).toThrowError();
});

test("getUpPos returns (0,1) when given (0,2)", () => {
    expect(game.getUpPos(0,2)).toEqual([0,1]);
});
test("getUpPos returns null when given (0,0)", () => {
    expect(game.getUpPos(0,0)).toBe(null);
});

test("getRightPos returns (1,2) when given (0,2)", () => {
    expect(game.getRightPos(0,2)).toEqual([1,2]);
});
test("getRightPos returns null when given (5,0)", () => {
    expect(game.getRightPos(5,0)).toBe(null);
});

test("getLeftPos returns (0,2) when given (1,2)", () => {
    expect(game.getLeftPos(1,2)).toEqual([0,2]);
});
test("getLeftPos returns null when given (0,0)", () => {
    expect(game.getLeftPos(0,0)).toBe(null);
});

test("getDownPos returns (0,2) when given (0,1)", () => {
    expect(game.getDownPos(0,1)).toEqual([0,2]);
});
test("getDownPos returns null when given (2,0)", () => {
    expect(game.getDownPos(0,2)).toBe(null);
});

test("getStartPos return (0,1)", () => {
    expect(game.getStartPos()).toEqual([0,1]);
});

test("getMatchingNeighborsOfTileAtPos throws error when x and y is out of bounds", () => {
    expect(() => game.getMatchingNeighborsOfTileAtPos(-1, -1)).toThrowError();
});

describe('Test if getMatchingNeighborsOfTileAtPos return the expected list of tiles', () => {
    test.each`
    x    | y    | expectedList 

    ${0} | ${0} | ${[]}
    ${0} | ${1} | ${[[1, 1]]}
    ${1} | ${1} | ${[[2, 1], [0, 1]]}
    ${4} | ${1} | ${[[5, 1], [4, 2], [3, 1]]}
    ${4} | ${2} | ${[[4, 1], [3, 2]]}
   
    `(`The matching neighbor tiles of ($x, $y) are $expectedList`, ({x, y, expectedList}) => {
        expect(game.getMatchingNeighborsOfTileAtPos(x,y)).toEqual(expectedList);
    })
});

test("Return null when try to get start pos on empty tilemap", () => {
    game.tileMapData = [];
    expect(game.getStartPos()).toEqual(null);
});

test("Evaluating tilemap does lit up correct tiles", () => {
    // Given
    game.tileMapData = [
        [new TileData("-", 0), new TileData("I", 0), new TileData("-", 0)],
        [new TileData("S", 0), new TileData("X", 0), new TileData("E", 2)],
        [new TileData("-", 0), new TileData("L", 0), new TileData("-", 0)],
    ];
    // When
    game.evaluateTileMap();
    // Then
    expect(game.getTileAtPos(0,0).isLit).toBe(false);
    expect(game.getTileAtPos(1,0).isLit).toBe(false);
    expect(game.getTileAtPos(2,0).isLit).toBe(false);

    expect(game.getTileAtPos(0,1).isLit).toBe(true);
    expect(game.getTileAtPos(1,1).isLit).toBe(true);
    expect(game.getTileAtPos(2,1).isLit).toBe(true);

    expect(game.getTileAtPos(0,2).isLit).toBe(false);
    expect(game.getTileAtPos(1,2).isLit).toBe(true);
    expect(game.getTileAtPos(2,2).isLit).toBe(false);
});

test("Evaluating tilemap does lit up correct tiles", () => {
    // Given
    game.tileMapData = [
        [new TileData("X", 0), new TileData("X", 0), new TileData("X", 0)],
        [new TileData("S", 0), new TileData("X", 0), new TileData("X", 2)],
        [new TileData("X", 0), new TileData("X", 0), new TileData("X", 0)],
    ];
    // When
    game.evaluateTileMap();
    // Then
    expect(game.getTileAtPos(0,0).isLit).toBe(true);
    expect(game.getTileAtPos(1,0).isLit).toBe(true);
    expect(game.getTileAtPos(2,0).isLit).toBe(true);

    expect(game.getTileAtPos(0,1).isLit).toBe(true);
    expect(game.getTileAtPos(1,1).isLit).toBe(true);
    expect(game.getTileAtPos(2,1).isLit).toBe(true);

    expect(game.getTileAtPos(0,2).isLit).toBe(true);
    expect(game.getTileAtPos(1,2).isLit).toBe(true);
    expect(game.getTileAtPos(2,2).isLit).toBe(true);
});

test("Evaluating tilemap does lit up correct tiles", () => {
    // Given
    game.tileMapData = [
        [new TileData("X", 0), new TileData("I", 1), new TileData("-", 0)],
        [new TileData("S", 0), new TileData("X", 0), new TileData("T", 0)],
        [new TileData("X", 0), new TileData("I", 1), new TileData("L", 0)],
    ];
    // When
    game.evaluateTileMap();
    // Then
    expect(game.getTileAtPos(0,0).isLit).toBe(false);
    expect(game.getTileAtPos(1,0).isLit).toBe(true);
    expect(game.getTileAtPos(2,0).isLit).toBe(false);

    expect(game.getTileAtPos(0,1).isLit).toBe(true);
    expect(game.getTileAtPos(1,1).isLit).toBe(true);
    expect(game.getTileAtPos(2,1).isLit).toBe(true);

    expect(game.getTileAtPos(0,2).isLit).toBe(false);
    expect(game.getTileAtPos(1,2).isLit).toBe(true);
    expect(game.getTileAtPos(2,2).isLit).toBe(true);
});
