const ReactDOM = require('react-dom');
const React = require('react');

const { GameUI } = require("./components/GameUI.react");

ReactDOM.render(<GameUI
    // Edit to configure game start settings
    startTime={{min: 1, sec: 30}}
    addTimeOnComplete={{easy: 15, normal: 25, hard: 35}}
    normalAtStage={4}
    hardAtStage={8}

/>, document.getElementById('app'));