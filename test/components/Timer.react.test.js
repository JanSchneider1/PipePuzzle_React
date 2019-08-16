const React = require("react");
const { create } = require("react-test-renderer");
const { shallow } = require("enzyme");

const { Timer } = require("../../src/js/components/Timer.react");
const { TimerClock } = require("../../src/js/_timerclock");

beforeEach(() => {
  jest.useFakeTimers();
});

test("Creating Timer matches Snapshot", () => {
  const component = create(
    <Timer timer={new TimerClock(3, 59).getFormattedTime()} earnedSeconds={3} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="hud-timer col-4"
      id="timer"
    >
      Time: 
      3:59
      <div
        className="container-fluid popup"
        id="popup"
      >
        <p
          className="popup-text"
        >
          You earned 
          3
           sec.
        </p>
      </div>
    </div>
  `);
});
