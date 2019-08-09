const React = require('react');

const { TurnCounter } = require(".//TurnCounter.react");
const { StageCounter } = require(".//StageCounter.react");
const { Timer } = require(".//Timer.react");

class HUD extends React.Component{
    render() {
        return (
            <div className="hud container-fluid">
                <div className="row">
                    <TurnCounter turns={this.props.turns}/>
                    <Timer timer={this.props.timer} onTimerTick={this.props.onTimerTick}/>
                    <StageCounter stage={this.props.stage}/>
                </div>
            </div>
        );
    }
}

module.exports = { HUD };