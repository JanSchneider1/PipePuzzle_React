const React = require("react");
const { create } = require("react-test-renderer");
const { shallow } = require("enzyme");

const { Tile } = require("../../src/js/components/Tile.react");
const { TileData } = require("../../src/js/_tiledata");

test("Creating Tile matches Snapshot", () => {
  const component = create(<Tile data={new TileData("-", 0)} />);
  let tree = component.toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="tile rotate-0"
    >
      <img
        alt="Tile"
        onClick={[Function]}
        src="/img/Empty_Tile.png"
      />
    </div>
  `);
});

describe("Test if created tile has the expected img src based on TileData", () => {
  test.each`
    type   | isLit    | expectedImgSrc
    ${"-"} | ${false} | ${"/img/Empty_Tile.png"}
    ${"S"} | ${false} | ${"/img/Start.png"}
    ${"E"} | ${false} | ${"/img/End.png"}
    ${"I"} | ${false} | ${"/img/I-Tile.png"}
    ${"L"} | ${false} | ${"/img/L-Tile.png"}
    ${"T"} | ${false} | ${"/img/T-Tile.png"}
    ${"X"} | ${false} | ${"/img/X-Tile.png"}
    ${"-"} | ${true}  | ${"/img/Empty_Tile.png"}
    ${"S"} | ${true}  | ${"/img/Start.png"}
    ${"E"} | ${true}  | ${"/img/End_Lit.png"}
    ${"I"} | ${true}  | ${"/img/I-Tile_Lit.png"}
    ${"L"} | ${true}  | ${"/img/L-Tile_Lit.png"}
    ${"T"} | ${true}  | ${"/img/T-Tile_Lit.png"}
    ${"X"} | ${true}  | ${"/img/X-Tile_Lit.png"}
  `(
    "Creating Tile with TileData{$type, 0} and isLit = $isLit renders component with expected img src = $expectedImgSrc",
    ({ type, isLit, expectedImgSrc }) => {
      let tileData = new TileData(type, 0);
      tileData.isLit = isLit;
      expect(
        shallow(<Tile data={tileData} />)
          .find("img")
          .prop("src")
      ).toEqual(expectedImgSrc);
    }
  );
});

describe('Test if created tile has expected "rotation"-class based on TileData', () => {
  test.each`
    rotation | expectedRotationClass
    ${0}     | ${"rotate-0"}
    ${1}     | ${"rotate-1"}
    ${2}     | ${"rotate-2"}
    ${3}     | ${"rotate-3"}
  `(
    'Creating Tile with TileData{"-", $rotation} has class = $expectedRotationClass',
    ({ rotation, expectedRotationClass }) => {
      expect(shallow(<Tile data={new TileData("-", rotation)} />).find("." + expectedRotationClass).length)
          .toBe(1);
    }
  );
});
