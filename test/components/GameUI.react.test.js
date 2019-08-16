const React = require("react");
const { create } = require("react-test-renderer");
const { shallow } = require("enzyme");

const { GameUI } = require("../../src/js/components/GameUI.react");
const { Game } = require("../../src/js/_game");

var gameUI;

beforeEach(() => {
  gameUI = shallow(<GameUI
      startTime={{min: 1, sec: 30}}
      addTimeOnComplete={{easy: 15, normal: 30, hard: 45}}
      normalAtStage={2}
      hardAtStage={5}
  />).instance();
});

test("Triggering 'onLose' causes state: gameOver to be true", () => {
    // When
    gameUI.onLose();
    // Then
    expect(gameUI.state.gameOver).toBe(true);
});
