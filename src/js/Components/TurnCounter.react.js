class TurnCounter extends React.Component{
    render() {
        return (
            <div className="hud-turn-counter col-4">
                {this.props.turns}
            </div>
        );
    }
}

module.exports = { TurnCounter };