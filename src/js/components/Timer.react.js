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
        return (
            <div className="hud-timer col-4">
                {this.props.timer.minutes}:{this.props.timer.seconds}
            </div>
        );
    }
}

module.exports = { Timer };