const { TurnCounter } = require("../Components/TurnCounter.react");
const { StageCounter } = require("../Components/StageCounter.react");
const { Timer } = require("../Components/Timer.react");

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