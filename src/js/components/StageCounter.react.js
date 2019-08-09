class StageCounter extends React.Component{
    render() {
        return (
            <div className="hud-stage-counter col-4">
                {this.props.stage}
            </div>
        );
    }
}

module.exports = { StageCounter };