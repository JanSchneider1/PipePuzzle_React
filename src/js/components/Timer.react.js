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
        if (this.props.earnedSeconds >= 0 ){
            popup = (
                <div id="popup" className="container-fluid popup">
                    <p className="popup-text">You earned {this.props.earnedSeconds} sec.</p>
                </div>
            );
        }
        return (
            <div className="hud-timer col-4" id="timer">
                Time: {this.props.timer}
                {popup}
            </div>
        );
    }
}

module.exports = { Timer };