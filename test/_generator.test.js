const { TileData } = require('../src/js/_tiledata.js');
const { Generator } = require('../src/js/_generator.js');
const Random = require('../src/js/_random.js');

var generator;

beforeEach(() => {
    generator = new Generator(6, 3);
});

describe('Test if creating a Generator with invalid height or width throws error', () => {
    test("Creating Generator with negative width throws error", () => {
        expect(() => {new Generator(-1, 3)})
            .toThrow(new Error("Invalid values for width = -1 and height = 3"));
    });
    test("Creating Generator with negative height throws error", () => {
        expect(() => {new Generator(3, -1)})
            .toThrow(new Error("Invalid values for width = 3 and height = -1"));
    });
    test("Creating Generator with even height throws error", () => {
        expect(() => {new Generator(4, 4)})
            .toThrow(new Error("Height = 4 must be odd number!"));
    });
    test("Creating Generator with width < 3 throws error", () => {
        expect(() => {new Generator(2, 3)})
            .toThrow(new Error("Invalid values for width = 2 and height = 3"));
    });
    test("Creating Generator with height < 3 throws error", () => {
        expect(() => {new Generator(3, 2)})
            .toThrow(new Error("Invalid values for width = 3 and height = 2"));
    });
});
test("Creating Generator with width = 4 and height = 3 creates new generator without throwing error", () => {
    expect(new Generator(4, 3));
});

test("Test if creating createTemplate creates expected 2D-Array", () => {
    expect(generator.createTemplate()).toEqual(
        [
            [new TileData('-', 0), null, null, null, null, new TileData('-', 0)],
            [new TileData('S', 0), null, null, null, null, new TileData('E', 2)],
            [new TileData('-', 0), null, null, null, null, new TileData('-', 0)]
        ]
    );
});

describe('Test getting random tile return random tile', () => {
    test("Getting X-Tile if random is in range", () => {
        Random.randomInt = jest.fn(() => 0);
        expect(generator.randomTile()).toEqual(new TileData('X', 0));
    });
    test("Getting T-Tile if random is in range", () => {
        Random.randomInt = jest.fn(() => 1);
        expect(generator.randomTile()).toEqual(new TileData('T', 0));
    });
    test("Getting I-Tile if random is in range", () => {
        Random.randomInt = jest.fn(() => 2);
        expect(generator.randomTile()).toEqual(new TileData('I', 0));
    });
    test("Getting L-Tile if random is in range", () => {
        Random.randomInt = jest.fn(() => 3);
        expect(generator.randomTile()).toEqual(new TileData('L', 0));
    });
});

describe('Test getting straight tiles returns random straight tile', () => {
    test("Getting X-Tile if random is in range", () => {
        Random.randomInt = jest.fn(() => 0);
        expect(generator.randomStraightTile()).toEqual(new TileData('X', 0));
    });
    test("Getting T-Tile if random is in range", () => {
        Random.randomInt = jest.fn(() => 1);
        expect(generator.randomStraightTile()).toEqual(new TileData('T', 0));
    });
    test("Getting I-Tile if random is in range", () => {
        Random.randomInt = jest.fn(() => 2);
        expect(generator.randomStraightTile()).toEqual(new TileData('I', 0));
    });
});

describe('Test getting angular tiles returns random angular tile', () => {
    test("Getting X-Tile if random is in range", () => {
        Random.randomInt = jest.fn(() => 0);
        expect(generator.randomAngularTile()).toEqual(new TileData('X', 0));
    });
    test("Getting T-Tile if random is in range", () => {
        Random.randomInt = jest.fn(() => 1);
        expect(generator.randomAngularTile()).toEqual(new TileData('T', 0));
    });
    test("Getting L-Tile if random is in range", () => {
        Random.randomInt = jest.fn(() => 2);
        expect(generator.randomAngularTile()).toEqual(new TileData('L', 0));
    });
});

describe('Test getting random direction returns expected direction', () => {
    test("Return right if random is 0 and direction is up", () => {
        Random.randomInt = jest.fn(() => 0);
        expect(generator.randomDirection('up')).toEqual('right');
    });
    test("Return up if random is 1 and direction is up", () => {
        Random.randomInt = jest.fn(() => 1);
        expect(generator.randomDirection('up')).toEqual('up');
    });
    test("Return down if random is 2 and direction is up", () => {
        Random.randomInt = jest.fn(() => 2);
        expect(generator.randomDirection('up')).toEqual('down');
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

test("Filling up tile map results in an array without containing null elements if given tile map with null elements", () => {
    generator.randomTile = jest.fn(() => new TileData('-', 0));
    let tilemap = [
        [new TileData('T', 0), null, null],
        [new TileData('S', 0), null, null],
        [new TileData('L', 0), null, null],
    ];
    expect(generator.fillUp(tilemap)).toEqual([
        [new TileData('T', 0), new TileData('-', 0), new TileData('-', 0)],
        [new TileData('S', 0), new TileData('-', 0), new TileData('-', 0)],
        [new TileData('L', 0), new TileData('-', 0), new TileData('-', 0)],
    ]);
});

test("Creating a random solution with an endpoint on the left of start point throws error", () => {
    // Given
    let tilemap = [
        [new TileData('-', 0), new TileData('-', 0), new TileData('-', 0), new TileData('-', 0)],
        [new TileData('E', 0), new TileData('-', 0), new TileData('-', 0), new TileData('S', 0)],
        [new TileData('-', 0), new TileData('-', 0), new TileData('-', 0), new TileData('-', 0)],
    ];
    generator.startPos = [3, 1];
    generator.endPos = [0, 1];
    generator.width = 4;
    generator.height = 3;
    // When
    expect(() => {generator.createRandomSolution(tilemap)})
        // Then
        .toThrow(new Error("Start-Pos(3,1) should be on the left of End-Pos(0,1)"));
});


describe('Creating a random solution returns expected result', () => {
    test("4x3 Generator with randomDirection of up goes expected path", () => {
        // Mocks
        generator = new Generator(4, 3);
        generator.randomStraightTile = jest.fn(() => new TileData('I', 0));
        generator.randomAngularTile = jest.fn(() => new TileData('L', 0));
        generator.randomDirection = jest.fn(() => 'up');
        // Given
        let tilemap = [
            [new TileData('-', 0), null, null, new TileData('-', 0)],
            [new TileData('S', 0), null, null, new TileData('E', 0)],
            [new TileData('-', 0), null, null, new TileData('-', 0)],
        ];
        generator.startPos = [0, 1];
        generator.endPos = [3, 1];
        // When
        expect(generator.createRandomSolution(tilemap))
        // Then
            .toEqual(
                [
                    [new TileData('-', 0), new TileData('L', 0), new TileData('L', 0), new TileData('-', 0)],
                    [new TileData('S', 0), new TileData('L', 0), new TileData('L', 0), new TileData('E', 0)],
                    [new TileData('-', 0), null, null, new TileData('-', 0)],
                ]
            );
    });

    test("4x3 Generator with randomDirection of down goes expected path", () => {
        // Mocks
        generator = new Generator(4, 3);
        generator.randomStraightTile = jest.fn(() => new TileData('I', 0));
        generator.randomAngularTile = jest.fn(() => new TileData('L', 0));
        generator.randomDirection = jest.fn(() => 'down');
        // Given
        let tilemap = [
            [new TileData('-', 0), null, null, new TileData('-', 0)],
            [new TileData('S', 0), null, null, new TileData('E', 0)],
            [new TileData('-', 0), null, null, new TileData('-', 0)],
        ];
        generator.startPos = [0, 1];
        generator.endPos = [3, 1];
        // When
        expect(generator.createRandomSolution(tilemap))
        // Then
            .toEqual(
                [
                    [new TileData('-', 0), null, null, new TileData('-', 0)],
                    [new TileData('S', 0), new TileData('L', 0), new TileData('L', 0), new TileData('E', 0)],
                    [new TileData('-', 0), new TileData('L', 0), new TileData('L', 0), new TileData('-', 0)],
                ]
            );
    });

    test("4x5 Generator with randomDirection of up goes expected path", () => {
        // Mocks
        generator = new Generator(4, 5);
        generator.randomStraightTile = jest.fn(() => new TileData('I', 0));
        generator.randomAngularTile = jest.fn(() => new TileData('L', 0));
        generator.randomDirection = jest.fn(() => 'up');
        // Given
        let tilemap = [
            [new TileData('-', 0), null, null, new TileData('-', 0)],
            [new TileData('-', 0), null, null, new TileData('-', 0)],
            [new TileData('S', 0), null, null, new TileData('E', 0)],
            [new TileData('-', 0), null, null, new TileData('-', 0)],
            [new TileData('-', 0), null, null, new TileData('-', 0)]
        ];
        generator.startPos = [0, 2];
        generator.endPos = [3, 2];
        // When
        expect(generator.createRandomSolution(tilemap))
        // Then
            .toEqual(
                [
                    [new TileData('-', 0), new TileData('L', 0), new TileData('L', 0), new TileData('-', 0)],
                    [new TileData('-', 0), new TileData('I', 0), new TileData('I', 0), new TileData('-', 0)],
                    [new TileData('S', 0), new TileData('L', 0), new TileData('L', 0), new TileData('E', 0)],
                    [new TileData('-', 0), null, null, new TileData('-', 0)],
                    [new TileData('-', 0), null, null, new TileData('-', 0)]
                ]
            );
    });

    test("6x3 Generator with randomDirection of right only goes right", () => {
        // Mocks
        generator = new Generator(6, 3);
        generator.randomStraightTile = jest.fn(() => new TileData('I', 0));
        generator.randomAngularTile = jest.fn(() => new TileData('L', 0));
        generator.randomDirection = jest.fn(() => 'right');
        // Given
        let tilemap = [
            [new TileData('-', 0), null, null, null, null, new TileData('-', 0)],
            [new TileData('S', 0), null, null, null, null, new TileData('E', 0)],
            [new TileData('-', 0), null, null, null, null, new TileData('-', 0)],
        ];
        generator.startPos = [0, 1];
        generator.endPos = [5, 1];
        // When
        expect(generator.createRandomSolution(tilemap))
        // Then
            .toEqual(
                [
                    [new TileData('-', 0), null, null, null, null, new TileData('-', 0)],
                    [new TileData('S', 0), new TileData('I', 0), new TileData('I', 0), new TileData('I', 0), new TileData('I', 0), new TileData('E', 0)],
                    [new TileData('-', 0), null, null, null, null, new TileData('-', 0)],
                ]
            );
    });

    test("5x7 Generator with randomDirection of up goes expected path", () => {
        // Mocks
        generator = new Generator(5, 7);
        generator.randomStraightTile = jest.fn(() => new TileData('I', 0));
        generator.randomAngularTile = jest.fn(() => new TileData('L', 0));
        generator.randomDirection = jest.fn(() => 'up');
        // Given
        let tilemap = [
            [new TileData('-', 0), null, null, null, new TileData('-', 0)],
            [new TileData('-', 0), null, null, null, new TileData('-', 0)],
            [new TileData('-', 0), null, null, null, new TileData('-', 0)],
            [new TileData('S', 0), null, null, null, new TileData('E', 0)],
            [new TileData('-', 0), null, null, null, new TileData('-', 0)],
            [new TileData('-', 0), null, null, null, new TileData('-', 0)],
            [new TileData('-', 0), null, null, null, new TileData('-', 0)]
        ];
        generator.startPos = [0, 3];
        generator.endPos = [4, 3];
        // When
        expect(generator.createRandomSolution(tilemap))
        // Then
            .toEqual(
                [
                    [new TileData('-', 0), new TileData('L', 0), new TileData('I', 0), new TileData('L', 0), new TileData('-', 0)],
                    [new TileData('-', 0), new TileData('I', 0), null, new TileData('I', 0), new TileData('-', 0)],
                    [new TileData('-', 0), new TileData('I', 0), null, new TileData('I', 0), new TileData('-', 0)],
                    [new TileData('S', 0), new TileData('L', 0), null, new TileData('L', 0), new TileData('E', 0)],
                    [new TileData('-', 0), null, null, null, new TileData('-', 0)],
                    [new TileData('-', 0), null, null, null, new TileData('-', 0)],
                    [new TileData('-', 0), null, null, null, new TileData('-', 0)]
                ]
            );
    });

    test("5x7 Generator with randomDirection of down goes expected path", () => {
        // Mocks
        generator = new Generator(5, 7);
        generator.randomStraightTile = jest.fn(() => new TileData('I', 0));
        generator.randomAngularTile = jest.fn(() => new TileData('L', 0));
        generator.randomDirection = jest.fn(() => 'down');
        // Given
        let tilemap = [
            [new TileData('-', 0), null, null, null, new TileData('-', 0)],
            [new TileData('-', 0), null, null, null, new TileData('-', 0)],
            [new TileData('-', 0), null, null, null, new TileData('-', 0)],
            [new TileData('S', 0), null, null, null, new TileData('E', 0)],
            [new TileData('-', 0), null, null, null, new TileData('-', 0)],
            [new TileData('-', 0), null, null, null, new TileData('-', 0)],
            [new TileData('-', 0), null, null, null, new TileData('-', 0)]
        ];
        generator.startPos = [0, 3];
        generator.endPos = [4, 3];
        // When
        expect(generator.createRandomSolution(tilemap))
        // Then
            .toEqual(
                [
                    [new TileData('-', 0), null, null, null, new TileData('-', 0)],
                    [new TileData('-', 0), null, null, null, new TileData('-', 0)],
                    [new TileData('-', 0), null, null, null, new TileData('-', 0)],
                    [new TileData('S', 0), new TileData('L', 0), null, new TileData('L', 0), new TileData('E', 0)],
                    [new TileData('-', 0), new TileData('I', 0), null, new TileData('I', 0), new TileData('-', 0)],
                    [new TileData('-', 0), new TileData('I', 0), null, new TileData('I', 0), new TileData('-', 0)],
                    [new TileData('-', 0), new TileData('L', 0), new TileData('I', 0), new TileData('L', 0), new TileData('-', 0)]
                ]
            );
    });
});

describe('Test if getting probability for right returns expected value', () => {
    test("Probability for right is 'probability.rightAfterRight' if direction is right", () => {
        expect(generator.getProbabilityRightForDirection('right')).toBe(generator.probabilities.rightAfterRight);
    });
});

describe('Test if getting probability for up returns expected value', () => {
    generator = new Generator(6, 3);
    generator.probabilities = {
        right: 0.4,
        rightAfterRight: 0.2
    };

    test.each`
    direction  | expectedResult
    
    ${'right'} | ${0.4}
    ${'up'}    | ${0.6}
    ${'down'}  | ${0}
   
    `(`Probability for up is $expectedResult when direction is $direction`, ({direction, expectedResult}) => {
        expect(generator.getProbabilityUpForDirection(direction)).toBe(expectedResult);
    });
});

test("Getting probability for up throws error when direction is left", () => {
    expect(() => {generator.getProbabilityUpForDirection('left')})
        .toThrow(new Error("Invalid direction given (direction = left)"));
});

describe('Test if getting probability for down returns expected value', () => {
    generator = new Generator(6, 3);
    generator.probabilities = {
        right: 0.4,
        rightAfterRight: 0.2
    };

    test.each`
    direction  | expectedResult
    
    ${'right'} | ${0.4}
    ${'up'}    | ${0}
    ${'down'}  | ${0.6}
   
    `(`Probability for down is $expectedResult when direction is $direction`, ({direction, expectedResult}) => {
        expect(generator.getProbabilityDownForDirection(direction)).toBe(expectedResult);
    });
});

test("Getting probability for down throws error when direction is left", () => {
    expect(() => {generator.getProbabilityDownForDirection('left')})
        .toThrow(new Error("Invalid direction given (direction = left)"));
});

test("Default value for properties of tiles adds up to one", () => {
    expect(generator.probabilities.x + generator.probabilities.l_i + generator.probabilities.t).toBe(1.0);
});