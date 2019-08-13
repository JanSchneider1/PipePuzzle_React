const React = require('react');

class StageCounter extends React.Component{
    render() {
        return (
            <div className="hud-stage-counter col-4">
                Stage: {this.props.stage}
            </div>
        );
    }
}

module.exports = { StageCounter };