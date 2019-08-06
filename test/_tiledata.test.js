const { TileData } = require('../src/js/_tiledata.js');

describe('Test if TileData is defined', () => {
    test.each`
    type       | rotation
    
    ${'X'}     | ${0}
    ${'X'}     | ${1}
    ${'X'}     | ${2}
    ${'X'}     | ${3}
    
    ${'L'}     | ${0}
    ${'L'}     | ${1}
    ${'L'}     | ${2}
    ${'L'}     | ${3}
    
    ${'I'}     | ${0}
    ${'I'}     | ${1}
    ${'I'}     | ${2}
    ${'I'}     | ${3}
 
    ${'T'}     | ${0}
    ${'T'}     | ${1}
    ${'T'}     | ${2}
    ${'T'}     | ${3}
    
    ${'-'}     | ${0}
    ${'-'}     | ${1}
    ${'-'}     | ${2}
    ${'-'}     | ${3}
    
    ${'E'}     | ${0}
    ${'E'}     | ${1}
    ${'E'}     | ${2}
    ${'E'}     | ${3}
    
    ${'S'}     | ${0}
    ${'S'}     | ${1}
    ${'S'}     | ${2}
    ${'S'}     | ${3}
    
    `('TileData with type $type and rotation $rotation is defined', ({ type, rotation }) => {
        expect(new TileData(type, rotation)).toBeDefined();
    })
});

describe('Test if invalid arguments throw an error', () => {
    test("Tile with type 'P' throws Error", () => {
        expect(() => {
            new TileData('P', 3)
        }).toThrowError("P is not an legal argument for type of TileData");
    });
    test("Tile with type ' ' throws Error", () => {
        expect(() => {
            new TileData(' ', 3)
        }).toThrowError(" is not an legal argument for type of TileData");
    });
    test("Tile with type null throws Error", () => {
        expect(() => {
            new TileData(null, 3)
        }).toThrowError("null is not an legal argument for type of TileData");
    });
    test("Tile with type 'x' throws Error", () => {
        expect(() => {
            new TileData('x', 3)
        }).toThrowError("x is not an legal argument for type of TileData");
    });
    test("Tile with rotation 90 throws Error", () => {
        expect(() => {
            new TileData('X', 90)
        }).toThrowError("90 is not an legal argument for rotation of TileData");
    });
    test("Tile with rotation null throws Error", () => {
        expect(() => {
            new TileData('X', null)
        }).toThrowError("null is not an legal argument for rotation of TileData");
    });
    test("Tile with type '2' throws Error", () => {
        expect(() => {
            new TileData('X', '2')
        }).toThrowError("2 is not an legal argument for rotation of TileData");
    });
});

describe('Test if TileData contains correct data', () => {
    test.each`
    type    | rotation | goesUp   | goesRight | goesDown | goesLeft
    
    ${'-'}  | ${0}     | ${false} | ${false}  | ${false} | ${false}
    ${'-'}  | ${1}     | ${false} | ${false}  | ${false} | ${false}
    ${'-'}  | ${2}     | ${false} | ${false}  | ${false} | ${false}
    ${'-'}  | ${3}     | ${false} | ${false}  | ${false} | ${false}
    
    ${'S'}  | ${0}     | ${false} | ${true}   | ${false} | ${false}
    ${'S'}  | ${1}     | ${false} | ${false}  | ${true}  | ${false}
    ${'S'}  | ${2}     | ${false} | ${false}  | ${false} | ${true}
    ${'S'}  | ${3}     | ${true}  | ${false}  | ${false} | ${false}
    
    ${'E'}  | ${0}     | ${false} | ${true}   | ${false} | ${false}
    ${'E'}  | ${1}     | ${false} | ${false}  | ${true}  | ${false}
    ${'E'}  | ${2}     | ${false} | ${false}  | ${false} | ${true}
    ${'E'}  | ${3}     | ${true}  | ${false}  | ${false} | ${false}
    
    ${'I'}  | ${0}     | ${false} | ${true}   | ${false} | ${true}
    ${'I'}  | ${1}     | ${true}  | ${false}  | ${true}  | ${false}
    ${'I'}  | ${2}     | ${false} | ${true}   | ${false} | ${true}
    ${'I'}  | ${3}     | ${true}  | ${false}  | ${true}  | ${false}
    
    ${'L'}  | ${0}     | ${true}  | ${false}  | ${false} | ${true}
    ${'L'}  | ${1}     | ${true}  | ${true}   | ${false} | ${false}
    ${'L'}  | ${2}     | ${false} | ${true}   | ${true}  | ${false}
    ${'L'}  | ${3}     | ${false} | ${false}  | ${true}  | ${true}
    
    ${'T'}  | ${0}     | ${false} | ${true}   | ${true}  | ${true}
    ${'T'}  | ${1}     | ${true}  | ${false}  | ${true}  | ${true}
    ${'T'}  | ${2}     | ${true}  | ${true}   | ${false} | ${true}
    ${'T'}  | ${3}     | ${true}  | ${true}   | ${true}  | ${false}
    
    ${'X'}  | ${0}     | ${true}  | ${true}   | ${true}  | ${true}
    ${'X'}  | ${1}     | ${true}  | ${true}   | ${true}  | ${true}
    ${'X'}  | ${2}     | ${true}  | ${true}   | ${true}  | ${true}
    ${'X'}  | ${3}     | ${true}  | ${true}   | ${true}  | ${true}
    
    `('TileData with type $type and rotation $rotation contains following data:' +
        ' goesUp = $goesUp, goesRight = $goesRight, goesDown = $goesDown, goesLeft = $goesLeft', ({ type, rotation, goesUp, goesRight, goesDown, goesLeft }) => {
        expect(new TileData(type, rotation).goesUp()).toBe(goesUp);
        expect(new TileData(type, rotation).goesRight()).toBe(goesRight);
        expect(new TileData(type, rotation).goesDown()).toBe(goesDown);
        expect(new TileData(type, rotation).goesLeft()).toBe(goesLeft);
    })
});

describe('Test if rotateClockWise changes the rotation of TileBase', () => {
    test.each`
    type       | rotation | expectedRotation
    
    ${'X'}     | ${0}     | ${1}
    ${'X'}     | ${1}     | ${2}
    ${'X'}     | ${2}     | ${3}
    ${'X'}     | ${3}     | ${0}
    
    `('TileData with type $type and rotation $rotation new rotation after rotating clockwise is $expectedRotation ', ({ type, rotation, expectedRotation }) => {
        expect(new TileData(type, rotation).rotateClockWise()).toEqual(expectedRotation);
    })
});

test("TileData with type 'S' are lit by default", () => {
    expect(new TileData('S', 0).isLit).toBe(true);
});

test("TileData with type 'X' aren't lit by default", () => {
    expect(new TileData('X', 0).isLit).toBe(false);
});