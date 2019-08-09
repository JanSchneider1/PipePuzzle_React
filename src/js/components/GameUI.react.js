const { Game } = require("../_game");
const { HUD } = require(".//HUD.react");
const { Tilemap } = require(".//Tilemap.react");

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

module.exports = { GameUI };