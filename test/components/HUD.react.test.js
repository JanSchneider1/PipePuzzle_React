const React = require("react");
const { create } = require("react-test-renderer");
const { shallow } = require("enzyme");

const { HUD } = require("../../src/js/components/HUD.react");

test("Creating HUD matches Snapshot", () => {
  const component = create(
    <HUD timer={{ minutes: 3, seconds: 59 }} turns={10} stage={3} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="hud container-fluid"
    >
      <div
        className="row"
      >
        <div
          className="hud-turn-counter col-4"
        >
          Turns: 
          10
        </div>
        <div
          className="hud-timer col-4"
          id="timer"
        >
          Time: 
          3
          :
          59
        </div>
        <div
          className="hud-stage-counter col-4"
        >
          Stage: 
          3
        </div>
      </div>
    </div>
  `);
});
