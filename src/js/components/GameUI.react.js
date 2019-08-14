const React = require('react');

const { Game } = require("../_game");
const { HUD } = require(".//HUD.react");
const { Tilemap } = require(".//Tilemap.react");
const { GameOver } = require(".//GameOver.react");

class GameUI extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            game: new Game(6, 3),
            turns: 0,
            stage: 1,
            normalAtStage: 2,
            hardAtStage: 5,
            type: 'game-6by3',
            timer: {
                seconds: 59,
                minutes: 2,
            },
            gameOver: false,
        };
        this.onStageComplete = this.onStageComplete.bind(this);
        this.onTileClick = this.onTileClick.bind(this);
        this.onTimerTick = this.onTimerTick.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }

    resetGame(){
        this.setState((state) => ({
            game: new Game(6, 3),
            turns: 0,
            stage: 1,
            normalAtStage: 2,
            hardAtStage: 5,
            type: 'game-6by3',
            timer: {
                seconds: 59,
                minutes: 2,
            },
            gameOver: false,
        }));
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
        this.setState((state) => ({
            gameOver: true
        }));
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
            type = 'game-12by7';
        }
        else if (this.state.stage + 1 > this.state.normalAtStage){
            nextGame = new Game(9, 5);
            type = 'game-9by5';
        }
        else {
            nextGame = new Game(6, 3);
            type = 'game-6by3';
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
            <div className={"game " + this.state.type}>
                <GameOver stage={this.state.stage} gameOver={this.state.gameOver} resetGame={this.resetGame}/>
                <HUD turns={this.state.turns}
                     stage={this.state.stage}
                     timer={this.state.timer}
                     onTimerTick={this.onTimerTick}
                />
                <Tilemap type={this.state.type}
                         tileMapData={this.state.game.tileMapData}
                         onStageComplete={this.onStageComplete}
                         onTileClick={this.onTileClick}
                />
                <a href="https://github.com/JanSchneider1/React_Tutorial" target="_blank"><i className="fab fa-github github-icon"> </i></a>
            </div>
        );
    }
}

module.exports = { GameUI };