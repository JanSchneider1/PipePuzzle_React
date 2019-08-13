const React = require("react");
const { create } = require("react-test-renderer");
const { shallow } = require("enzyme");

const { StageCounter } = require("../../src/js/components/StageCounter.react");

test("Creating StageCounter matches Snapshot", () => {
  const component = create(<StageCounter stage={3} />);
  let tree = component.toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="hud-stage-counter col-4"
    >
      Stage: 
      3
    </div>
  `);
});
