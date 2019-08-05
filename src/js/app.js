class TurnCounter extends React.Component{
    render() {
        return (
            <div className="hud-turn-counter col-4">
                {this.props.turns}
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
                {this.props.stage}
            </div>
        );
    }
}

class HUD extends React.Component{
    render() {
        return (
            <div className="hud container-fluid">
                <div className="row">
                    <TurnCounter turns={this.props.turns}/>
                    <Timer/>
                    <StageCounter stage={this.props.stage}/>
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
        this.props.onTileClick(this.props.x, this.props.y);
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
    }

    createTiles(){
        const rows = [];
        for (let y=0; y < this.props.tileMapData.length; y++){
            let tiles = [];
            for (let x=0; x < this.props.tileMapData[y].length; x++){
                tiles.push(
                    <Tile turns={this.props.turns}
                          data={this.props.tileMapData[y][x]}
                          x={x}
                          y={y}
                          onTileClick={this.props.onTileClick}
                    />
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
    constructor(props){
        super(props);
        this.state = {
            game: new Game(),
            turns: 0,
            stage: 1
        };
        this.onStageComplete = this.onStageComplete.bind(this);
        this.onTileClick = this.onTileClick.bind(this);
    }

    increaseTurns(){

    }

    onTileClick(x, y){
        const tile = this.state.game.getTileAtPos(x, y);
        tile.rotateClockWise();
        this.state.game.evaluateTileMap();
        if (this.state.game.isSolved){
            this.onStageComplete();
        }
        else{
            this.setState((state) => ({
                game: this.state.game
            }));
        }
    }

    onStageComplete(){
        this.setState((state) => ({
            turns: 0,
            stage: ++this.state.stage,
            game: new Game()
        }));
    }

    render() {
        return (
            <div className="game">
                <HUD turns={this.state.turns}
                     stage={this.state.stage}
                />
                <Tilemap turns={this.state.turns}
                         stage={this.state.stage}
                         onStageComplete={this.onStageComplete}
                         tileMapData={this.state.game.tileMapData}
                         onTileClick={this.onTileClick}
                />
            </div>
        );
    }
}
//=================================================================
const { TileData } = require("./_tiledata.js");
const { Game } = require("./_game.js");
ReactDOM.render(<GameUI/>, document.getElementById('app'));