const React = require('react');
const $ = require("jquery");

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
                seconds: 30,
                minutes: 1,
            },
            gameOver: false,
            addTimeOnComplete: {
                easy: 15,
                normal: 30,
                hard: 45,
            }
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
            addTimeOnComplete: {
                easy: 15,
                normal: 30,
                hard: 45,
            },
            earnedSeconds: -1,
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
        let addTime;
        if (this.state.stage + 1 > this.state.hardAtStage){
            nextGame = new Game(12, 7);
            type = 'game-12by7';
            addTime = this.state.addTimeOnComplete.hard - this.state.turns;
        }
        else if (this.state.stage + 1 > this.state.normalAtStage){
            nextGame = new Game(9, 5);
            type = 'game-9by5';
            addTime = this.state.addTimeOnComplete.normal - this.state.turns;
        }
        else {
            nextGame = new Game(6, 3);
            type = 'game-6by3';
            addTime = this.state.addTimeOnComplete.easy - this.state.turns;
        }
        if (addTime < 0) { addTime = 0; }
        this.addTime(addTime);
        this.setState((state) => ({
            turns: 0,
            stage: ++state.stage,
            game: nextGame,
            type: type
        }));
        // Force animation to reset and play
        $('#timer').removeClass('flash');
        setTimeout(() => $('#timer').addClass('flash'), 100);
        // Reset popup animation
        $('#popup').removeClass('popup');
        $('#popup').css('display', 'none');
        setTimeout(() => {
            $('#popup').addClass('popup');
            $('#popup').css('display', 'block');
        }, 100);
    }

    addTime(timeInSeconds){
        let minutes = Math.floor((this.state.timer.seconds + timeInSeconds) / 60);
        let seconds = (this.state.timer.seconds + timeInSeconds) % 60;
        this.setState((state) => ({
            earnedSeconds: timeInSeconds,
            timer: {
                minutes: state.timer.minutes + minutes,
                seconds: seconds
            }
        }));
    }

    render() {
        return (
            <div className={"game " + this.state.type}>
                <GameOver stage={this.state.stage} gameOver={this.state.gameOver} resetGame={this.resetGame}/>
                <HUD turns={this.state.turns}
                     stage={this.state.stage}
                     timer={this.state.timer}
                     earnedSeconds={this.state.earnedSeconds}
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