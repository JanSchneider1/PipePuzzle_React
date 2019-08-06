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
                    <Timer timer={this.props.timer} onTimerTick={this.props.onTimerTick}/>
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
                    <Tile data={this.props.tileMapData[y][x]}
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
            game: new Game(6, 3),
            turns: 0,
            stage: 1,
            normalAtStage: 2,
            hardAtStage: 5,
            type: '6by3',
            timer: {
                seconds: 59,
                minutes: 2,
            }
        };
        this.onStageComplete = this.onStageComplete.bind(this);
        this.onTileClick = this.onTileClick.bind(this);
        this.onTimerTick = this.onTimerTick.bind(this);
    }

    onTileClick(x, y){
        const tile = this.state.game.getTileAtPos(x, y);
        tile.rotateClockWise();
        this.state.game.evaluateTileMap();
        if (this.state.game.isSolved){
            setTimeout(() => this.onStageComplete(), 500);
        }
        this.setState((state) => ({
            game: this.state.game,
            turns: ++this.state.turns
        }));
        /*
        else{
            this.setState((state) => ({
                game: this.state.game,
                turns: ++this.state.turns
            }));
        }*/
    }

    onLose(){
        alert("GAME OVER");
    }

    onTimerTick(){
        let minutes = parseInt(this.state.timer.minutes);
        let seconds = parseInt(this.state.timer.seconds);
        if (seconds-1 < 0){
            if (minutes === 0){
                this.onLose();
            }
            else{
                minutes--;
                seconds = 59;
            }
        }
        else{
            seconds = seconds <= 10 ? `0${seconds-1}` : seconds-1;
        }
        this.setState((state) => ({
            timer:{
                seconds: seconds,
                minutes: minutes
            }
        }));
    }

    onStageComplete(){
        // Generate stage of size based on current difficulty
        let nextGame;
        let type;
        if (this.state.stage + 1 > this.state.hardAtStage){
            nextGame = new Game(12, 7);
            type = '12by7';
        }
        else if (this.state.stage + 1 > this.state.normalAtStage){
            nextGame = new Game(9, 5);
            type = '9by5';
        }
        else {
            nextGame = new Game(6, 3);
            type = '6by3';
        }

        this.setState((state) => ({
            turns: 0,
            stage: ++this.state.stage,
            game: nextGame,
            type: type
        }));
    }

    render() {
        return (
            <div className={"game " + "game-" + this.state.type}>
                <HUD turns={this.state.turns}
                     stage={this.state.stage}
                     timer={this.state.timer}
                     onTimerTick={this.onTimerTick}
                />
                <Tilemap tileMapData={this.state.game.tileMapData}
                         onStageComplete={this.onStageComplete}
                         onTileClick={this.onTileClick}
                />
            </div>
        );
    }
}
//=================================================================
const { Game } = require("./_game.js");
ReactDOM.render(<GameUI/>, document.getElementById('app'));