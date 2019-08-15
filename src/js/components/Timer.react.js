const React = require('react');

class Timer extends React.Component{
    componentDidMount(){
        this.clock = setInterval(
            () => this.props.onTimerTick(),
            1000
        );
    }

    componentWillUnmount(){
        clearInterval(this.clock);
    }

    render() {
        let popup;
        if (this.props.addedTimeSeconds >= 0 || this.props.addedTimeMinutes >= 0 ){
            popup = (
                <div id="popup" className="container-fluid popup">
                    <p className="popup-text">{this.props.addedTimeMinutes + ":" + this.props.addedTimeSeconds}</p>
                </div>
            );

        }
        return (
            <div className="hud-timer col-4" id="timer">
                Time: {this.props.timer.minutes}:{this.props.timer.seconds}
                {popup}
            </div>
        );
    }
}

module.exports = { Timer };