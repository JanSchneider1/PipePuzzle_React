const React = require("react");
const { create } = require("react-test-renderer");
const { shallow } = require("enzyme");

const { TurnCounter } = require("../src/js/components/TurnCounter.react");

test("Creating TurnCounter matches Snapshot", () => {
  const component = create(<TurnCounter turns={10} />);
  let tree = component.toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="hud-turn-counter col-4"
    >
      Turns: 
      10
    </div>
  `);
});
