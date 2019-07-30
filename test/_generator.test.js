const { TileData } = require('../src/js/_tiledata.js');
const { Generator } = require('../src/js/_generator.js');

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

test("Test if creating template creates a 2D-array of the correct size and places start / end tiles correctly", () => {
    expect(generator6By3.template()).toEqual(
        [
            [],
            [new TileData('S', 0), undefined, undefined, undefined, undefined, new TileData('E', 2)],
            []
        ]
    );
});