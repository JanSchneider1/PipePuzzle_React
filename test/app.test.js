const sum = require('app.js');

test('Create a new TileData', () => {
    expect(new TileData('S', 0)).toBe(new TileData('S', 0));
});