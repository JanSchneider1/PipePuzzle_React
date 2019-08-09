const React = require('react');
const { create } = require('react-test-renderer');
const { shallow } = require('enzyme');

const { Tile } = require("../src/js/components/Tile.react");
const { TileData } = require("../src/js/_tiledata");

test('Creating Tile matches Snapshot', () => {
    const component = create(
        <Tile data={new TileData('-',0)}/>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

describe('Test if created tile has the expected type', () => {
    test.each`
    
    type    | isLit    | expectedImgSrc
    ${'-'}  | ${false} | ${"/img/Empty_Tile.png"}
    ${'S'}  | ${false} | ${"/img/Start.png"}
    ${'E'}  | ${false} | ${"/img/End.png"}
    ${'I'}  | ${false} | ${"/img/I-Tile.png"}
    ${'L'}  | ${false} | ${"/img/L-Tile.png"}
    ${'T'}  | ${false} | ${"/img/T-Tile.png"}
    ${'X'}  | ${false} | ${"/img/X-Tile.png"}
    ${'-'}  | ${true}  | ${"/img/Empty_Tile.png"}
    ${'S'}  | ${true}  | ${"/img/Start.png"}
    ${'E'}  | ${true}  | ${"/img/End_Lit.png"}
    ${'I'}  | ${true}  | ${"/img/I-Tile_Lit.png"}
    ${'L'}  | ${true}  | ${"/img/L-Tile_Lit.png"}
    ${'T'}  | ${true}  | ${"/img/T-Tile_Lit.png"}
    ${'X'}  | ${true}  | ${"/img/X-Tile_Lit.png"}
    
    `('Creating Tile with TileData{$type, 0} and isLit = $isLit renders component with expected img src = $expectedImgSrc', ({ type, isLit, expectedImgSrc }) => {
        let tileData = new TileData(type, 0);
        tileData.isLit = isLit;
        expect(shallow(<Tile data={tileData}/>).find('img').prop('src')).toEqual(expectedImgSrc);
    })
});
