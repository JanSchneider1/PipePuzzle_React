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
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        const tile = game.getTileAtPos(this.props.x, this.props.y);
        tile.rotateClockWise();
        game.evaluateTileMap();
        if (game.isSolved){
            console.log("Finished");
            this.props.nextStage();
        }
        else{
            this.props.updateTileMapData();
        }
    }

    render() {
        return (
            <div className={"tile " + this.applyRotationClass()}>
                <img onClick={this.handleClick} alt="Tile" src={this.getImgBasedOnType()}/>
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
    constructor(props){
        super(props);
        this.state = {
            tileMapData : this.props.tileMapData
        };
        this.updateTileMapData = this.updateTileMapData.bind(this);
        this.nextStage = this.nextStage.bind(this);
    }

    updateTileMapData() {
        this.setState({
                tileMapData: this.state.tileMapData
        });
    };

    nextStage(){
        game = new Game();
        this.setState({
            tileMapData: game.tileMapData
        });
    }

    createTiles(){
        const rows = [];
        for (let y=0; y < this.state.tileMapData.length; y++){
            let tiles = [];
            for (let x=0; x < this.state.tileMapData[y].length; x++){
                console.log(this.state.tileMapData[y][x].type);
                tiles.push(
                    <Tile data={this.state.tileMapData[y][x]} x={x} y={y} updateTileMapData={this.updateTileMapData} nextStage={this.nextStage}/>
                );
            }
            rows.push(
                <div className="row">
                    {tiles}
                </div>
            );
        }
        return rows;
    }

    render() {
        return (
            <div className="tilemap container-fluid">
                {this.createTiles()}
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