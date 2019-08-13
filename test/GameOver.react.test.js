const React = require("react");
const { create } = require("react-test-renderer");
const { shallow } = require("enzyme");

const { GameOver } = require("../src/js/components/GameOver.react");

test("Creating GameOver matches Snapshot", () => {
  const component = create(<GameOver gameOver={true} />);
  let tree = component.toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="game-over shadow-lg"
    >
      <p
        className="game-over-header"
      >
        Game Over!
      </p>
      <p>
        You have reached stage:
      </p>
      <p
        className="game-over-stage-counter"
      />
      <button
        className="btn"
      >
        Try Again!
      </button>
    </div>
  `);
});

test("Creating GameOver with gameOver = false renders null", () => {
  const component = create(<GameOver gameOver={false} />);
  let tree = component.toJSON();
  expect(tree).toBe(null);
});
