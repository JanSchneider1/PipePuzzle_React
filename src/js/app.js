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
        this.state = {
            data: this.props.data
        };
    }

    handleClick(){
        console.log(this.props.x + " / " + this.props.y);
        const tile = game.getTileAtPos(this.props.x, this.props.y);
        this.setState({
            data: tile
        });
        tile.rotateClockWise();
        game.evaluateTileMap();
        this.props.updateTileMapData();
    }

    render() {
        if (this.state.data.type === 'E' && this.state.data.isLit){
            //alert('Stage cleared!');
        }
        return (
            <div className={"tile " + this.applyRotationClass()}>
                <img onClick={this.handleClick} alt="Tile" src={this.getImgBasedOnType()}/>
            </div>
        );
    }

    applyRotationClass(){
        switch (this.state.data.rotation) {
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
        if (this.state.data.isLit){
            switch(this.state.data.type){
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
            switch(this.state.data.type){
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
    }

    updateTileMapData() {
        this.setState({tileMapData: this.state.tileMapData});
    };

    createTiles(){
        const rows = [];
        for (let y=0; y < this.state.tileMapData.length; y++){
            let tiles = [];
            for (let x=0; x < this.state.tileMapData[y].length; x++){
                tiles.push(
                    <Tile data={this.state.tileMapData[y][x]} x={x} y={y} updateTileMapData={this.updateTileMapData}/>
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
        console.log(game.tileMapData);
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