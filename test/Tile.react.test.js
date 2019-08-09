const React = require('react');
const { create } = require('react-test-renderer');

const { Tile } = require("../src/js/components/Tile.react");
const { TileData } = require("../src/js/_tiledata");

test('Creating Tile matches Snapshot', () => {
    const component = create(
        <Tile data={new TileData('-',0)}/>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});