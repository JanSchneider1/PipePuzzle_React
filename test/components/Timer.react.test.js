const React = require("react");
const { create } = require("react-test-renderer");
const { shallow } = require("enzyme");

const { Timer } = require("../../src/js/components/Timer.react");

test("Creating Timer matches Snapshot", () => {
  const component = create(<Timer timer={{ minutes: 3, seconds: 59 }} />);
  let tree = component.toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="hud-timer col-4"
    >
      Time: 
      3
      :
      59
    </div>
  `);
});
