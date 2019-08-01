const { TileData } = require('../src/js/_tiledata.js');
const { Generator } = require('../src/js/_generator.js');
const Random = require('../src/js/_random.js');

var generator6By3;

beforeEach(() => {
    generator6By3 = new Generator(6, 3);
});

test("Creating Generator with negative width throws error", () => {
    expect(() => {new Generator(-1, 3)}).toThrowError();
});
test("Creating Generator with negative height throws error", () => {
    expect(() => {new Generator(3, -1)}).toThrowError();
});
test("Creating Generator with even height throws error", () => {
    expect(() => {new Generator(4, 4)}).toThrowError();
});
test("Creating Generator with width < 3 throws error", () => {
    expect(() => {new Generator(2, 3)}).toThrowError();
});
test("Creating Generator with height < 3 throws error", () => {
    expect(() => {new Generator(3, 2)}).toThrowError();
});
test("Creating Generator with width = 3 and height = 3 creates new generator without throwing error", () => {
    expect(new Generator(3, 3));
});

test("Test if creating createTemplate creates expected 2D-Array", () => {
    expect(generator6By3.createTemplate()).toEqual(
        [
            [new TileData('-', 0), null, null, null, null, new TileData('-', 0)],
            [new TileData('S', 0), null, null, null, null, new TileData('E', 2)],
            [new TileData('-', 0), null, null, null, null, new TileData('-', 0)]
        ]
    );
});

/*
describe('Test if getting random move returns a valid move with valid arguments', () => {
    test("Getting random move with 100% right returns [1,0]", () => {
        expect(Generator.randomDirection(100, 0, 0)).toEqual([1,0]);
    });
    test("Getting random move with 100% up returns [0,-1]", () => {
        expect(Generator.randomDirection(0, 100, 0)).toEqual([0,-1]);
    });
    test("Getting random move with 100% down returns [0,1]", () => {
        expect(Generator.randomDirection(0, 0, 100)).toEqual([0,1]);
    });
    test("Getting random move with sum of rates unequal to 100% throws error", () => {
        expect(() => {Generator.randomDirection(0, 10, 30)}).toThrowError();
    });
    test("Getting random move with negative rates throws error", () => {
        expect(() => {Generator.randomDirection(-1, 99, 2)}).toThrowError();
    });
    test("Getting random move throws error if random number is equal to 1", () => {
        Math.random = jest.fn(() => 1);
        expect(() => {Generator.randomDirection(30, 30, 40)}).toThrowError();
    });
    test("Getting random move return [1,0] if random number is in range", () => {
        Math.random = jest.fn(() => 0.29);
        expect(Generator.randomDirection(30, 30, 40)).toEqual([1,0]);
    });
    test("Getting random move return [0,-1] if random number is in range", () => {
        Math.random = jest.fn(() => 0.59);
        expect(Generator.randomDirection(30, 30, 40)).toEqual([0,-1]);
    });
    test("Getting random move return [0,-1] if random number is in range", () => {
        Math.random = jest.fn(() => 0.89);
        expect(Generator.randomDirection(30, 30, 40)).toEqual([0,1]);
    });
});
*/

describe('Test getting random tile return random tile', () => {
    test("Getting X-Tile if random is in range", () => {
        Random.randomInt = jest.fn(() => 0);
        expect(generator6By3.randomTile()).toEqual(new TileData('X', 0));
    });
    test("Getting T-Tile if random is in range", () => {
        Random.randomInt = jest.fn(() => 1);
        expect(generator6By3.randomTile()).toEqual(new TileData('T', 0));
    });
    test("Getting I-Tile if random is in range", () => {
        Random.randomInt = jest.fn(() => 2);
        expect(generator6By3.randomTile()).toEqual(new TileData('I', 0));
    });
    test("Getting L-Tile if random is in range", () => {
        Random.randomInt = jest.fn(() => 3);
        expect(generator6By3.randomTile()).toEqual(new TileData('L', 0));
    });
});

describe('Test getting straight tiles returns random straight tile', () => {
    test("Getting X-Tile if random is in range", () => {
        Random.randomInt = jest.fn(() => 0);
        expect(generator6By3.randomStraightTile()).toEqual(new TileData('X', 0));
    });
    test("Getting T-Tile if random is in range", () => {
        Random.randomInt = jest.fn(() => 1);
        expect(generator6By3.randomStraightTile()).toEqual(new TileData('T', 0));
    });
    test("Getting I-Tile if random is in range", () => {
        Random.randomInt = jest.fn(() => 2);
        expect(generator6By3.randomStraightTile()).toEqual(new TileData('I', 0));
    });
});

describe('Test getting angular tiles returns random angular tile', () => {
    test("Getting X-Tile if random is in range", () => {
        Random.randomInt = jest.fn(() => 0);
        expect(generator6By3.randomAngularTile()).toEqual(new TileData('X', 0));
    });
    test("Getting T-Tile if random is in range", () => {
        Random.randomInt = jest.fn(() => 1);
        expect(generator6By3.randomAngularTile()).toEqual(new TileData('T', 0));
    });
    test("Getting L-Tile if random is in range", () => {
        Random.randomInt = jest.fn(() => 2);
        expect(generator6By3.randomAngularTile()).toEqual(new TileData('L', 0));
    });
});

describe('Test getting random rotation return random rotation', () => {
    test("Return 0 if random is in range", () => {
        Math.random = jest.fn(() => 0.1);
        expect(Generator.randomRotation()).toEqual(0);
    });
    test("Return 1 if random is in range", () => {
        Math.random = jest.fn(() => 0.3);
        expect(Generator.randomRotation()).toEqual(1);
    });
    test("Return 2 if random is in range", () => {
        Math.random = jest.fn(() => 0.5);
        expect(Generator.randomRotation()).toEqual(2);
    });
    test("Return 3 if random is in range", () => {
        Math.random = jest.fn(() => 0.9);
        expect(Generator.randomRotation()).toEqual(3);
    });
});

/*
test("Filling up tile map results in an array without containing null elements if given tile map with null elements", () => {
    generator6By3.randomTile = jest.fn(() => new TileData('-', 0));
    let tilemap = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];
    expect(generator6By3.fillUp(tilemap)).toEqual([
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ]);
});*/