class TurnCounter extends React.Component{
    render() {
        return (
            <div className="hud-turn-counter col-4">
                10
            </div>
        );
    }
}

class Timer extends React.Component{
    render() {
        return (
            <div className="hud-timer col-4">
                3:00
            </div>
        );
    }
}

class StageCounter extends React.Component{
    render() {
        return (
            <div className="hud-stage-counter col-4">
                1
            </div>
        );
    }
}

class HUD extends React.Component{
    render() {
        return (
            <div className="hud container-fluid">
                <div className="row">
                    <TurnCounter/>
                    <Timer/>
                    <StageCounter/>
                </div>
            </div>
        );
    }
}

class Tile extends React.Component{
    render() {
        return (
            <div className="tile col">
                <p>Tile</p>
            </div>
        );
    }
}

class Tilemap extends React.Component{
    render() {
        return (
            <div className="tilemap container-fluid">
                <div className="row">
                    <Tile/>
                    <Tile/>
                    <Tile/>
                    <Tile/>
                    <Tile/>
                    <Tile/>
                </div>
                <div className="row">
                    <Tile/>
                    <Tile/>
                    <Tile/>
                    <Tile/>
                    <Tile/>
                    <Tile/>
                </div>
                <div className="row">
                    <Tile/>
                    <Tile/>
                    <Tile/>
                    <Tile/>
                    <Tile/>
                    <Tile/>
                </div>
            </div>
        );
    }
}

class Game extends React.Component{
    render() {
        return (
            <div className="game">
                <HUD/>
                <Tilemap/>
            </div>
        );
    }
}

//=================================================================
ReactDOM.render(<Game/>, document.getElementById('app'));