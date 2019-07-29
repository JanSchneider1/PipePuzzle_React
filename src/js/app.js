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
            <div className={"tile " + this.applyRotationClass()}>
                <img alt="Tile" src={this.getImgBasedOnType()}/>
            </div>
        );
    }

    applyRotationClass(){
        switch (this.props.data.rotation) {
            case 0:
                return "rotate-0";
            case 1:
                return "rotate-1";
            case 2:
                return "rotate-2";
            case 3:
                return "rotate-3";
        }
    }

    getImgBasedOnType(){
        if (this.props.data.isLit){
            switch(this.props.data.type){
                case '-':
                    return "/img/Empty_Tile.png";
                case 'S':
                    return "/img/Start.png";
                case 'E':
                    return "/img/End_Lit.png";
                case 'X':
                    return "/img/X-Tile_Lit.png";
                case 'L':
                    return "/img/L-Tile_Lit.png";
                case 'I':
                    return "/img/I-Tile_Lit.png";
                case 'T':
                    return "/img/T-Tile_Lit.png";
            }
        }
        else{
            switch(this.props.data.type){
                case '-':
                    return "/img/Empty_Tile.png";
                case 'S':
                    return "/img/Start.png";
                case 'E':
                    return "/img/End.png";
                case 'X':
                    return "/img/X-Tile.png";
                case 'L':
                    return "/img/L-Tile.png";
                case 'I':
                    return "/img/I-Tile.png";
                case 'T':
                    return "/img/T-Tile.png";
            }
        }
    }
}

class Tilemap extends React.Component{
    render() {
        return (
            <div className="tilemap container-fluid">
                <div className="row">
                    <Tile data={this.props.tileMapData[0][0]}/>
                    <Tile data={this.props.tileMapData[0][1]}/>
                    <Tile data={this.props.tileMapData[0][2]}/>
                    <Tile data={this.props.tileMapData[0][3]}/>
                    <Tile data={this.props.tileMapData[0][4]}/>
                    <Tile data={this.props.tileMapData[0][5]}/>
                </div>
                <div className="row">
                    <Tile data={this.props.tileMapData[1][0]}/>
                    <Tile data={this.props.tileMapData[1][1]}/>
                    <Tile data={this.props.tileMapData[1][2]}/>
                    <Tile data={this.props.tileMapData[1][3]}/>
                    <Tile data={this.props.tileMapData[1][4]}/>
                    <Tile data={this.props.tileMapData[1][5]}/>
                </div>
                <div className="row">
                    <Tile data={this.props.tileMapData[2][0]}/>
                    <Tile data={this.props.tileMapData[2][1]}/>
                    <Tile data={this.props.tileMapData[2][2]}/>
                    <Tile data={this.props.tileMapData[2][3]}/>
                    <Tile data={this.props.tileMapData[2][4]}/>
                    <Tile data={this.props.tileMapData[2][5]}/>
                </div>
            </div>
        );
    }
}

class GameUI extends React.Component{
    render() {
        return (
            <div className="game">
                <HUD/>
                <Tilemap tileMapData={this.props.tileMapData}/>
            </div>
        );
    }
}
//=================================================================
const { TileData } = require("./_tiledata.js");
const { Game } = require("./_game.js");
var game = new Game();

ReactDOM.render(<GameUI tileMapData={game.tileMapData}/>, document.getElementById('app'));