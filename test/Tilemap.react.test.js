const React = require("react");
const { create } = require("react-test-renderer");
const { shallow } = require("enzyme");

const { TileData } = require("../src/js/_tiledata.js");
const { Tilemap } = require("../src/js/components/Tilemap.react");

test("Creating Tile matches Snapshot", () => {
  // Given
  let tileMapData = [
    [new TileData("X", 0), new TileData("I", 1), new TileData("-", 0)],
    [new TileData("S", 0), new TileData("X", 0), new TileData("T", 0)],
    [new TileData("X", 0), new TileData("I", 1), new TileData("L", 0)]
  ];
  const component = create(<Tilemap tileMapData={tileMapData} />);
  let tree = component.toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="tilemap container-fluid"
    >
      <div
        className="row"
      >
        <div
          className="tile rotate-0"
        >
          <img
            alt="Tile"
            onClick={[Function]}
            src="/img/X-Tile.png"
          />
        </div>
        <div
          className="tile rotate-1"
        >
          <img
            alt="Tile"
            onClick={[Function]}
            src="/img/I-Tile.png"
          />
        </div>
        <div
          className="tile rotate-0"
        >
          <img
            alt="Tile"
            onClick={[Function]}
            src="/img/Empty_Tile.png"
          />
        </div>
      </div>
      <div
        className="row"
      >
        <div
          className="tile rotate-0"
        >
          <img
            alt="Tile"
            onClick={[Function]}
            src="/img/Start.png"
          />
        </div>
        <div
          className="tile rotate-0"
        >
          <img
            alt="Tile"
            onClick={[Function]}
            src="/img/X-Tile.png"
          />
        </div>
        <div
          className="tile rotate-0"
        >
          <img
            alt="Tile"
            onClick={[Function]}
            src="/img/T-Tile.png"
          />
        </div>
      </div>
      <div
        className="row"
      >
        <div
          className="tile rotate-0"
        >
          <img
            alt="Tile"
            onClick={[Function]}
            src="/img/X-Tile.png"
          />
        </div>
        <div
          className="tile rotate-1"
        >
          <img
            alt="Tile"
            onClick={[Function]}
            src="/img/I-Tile.png"
          />
        </div>
        <div
          className="tile rotate-0"
        >
          <img
            alt="Tile"
            onClick={[Function]}
            src="/img/L-Tile.png"
          />
        </div>
      </div>
    </div>
  `);
});
