const React = require('react');
const $ = require("jquery");

const { Game } = require("../_game");
const { TimerClock } = require("../_timerclock");
const { HUD } = require(".//HUD.react");
const { Tilemap } = require(".//Tilemap.react");
const { GameOver } = require(".//GameOver.react");

const defaultState = {

};

const settings = {

};

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
            timer: new TimerClock(1, 30),
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
            timer: new TimerClock(1, 30),
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
        this.setState({
            gameOver: true
        });
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
        this.addTimeToTimer(addTime);
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

    onTimerTick() {
        this.setState((state) => ({
            timer: state.timer.subSeconds(1)
        }));
        if (this.state.timer.getFormattedTime() === '0:00'){
            this.onLose();
        }
        console.log(this.state.timer.getFormattedTime());
    }

    addTimeToTimer(timeInSeconds){
        this.setState((state) =>({
            earnedSeconds: timeInSeconds,
            timer: state.timer.addSeconds(timeInSeconds)
        }));
    }

    render() {
        return (
            <div>
                <GameOver stage={this.state.stage} gameOver={this.state.gameOver} resetGame={this.resetGame}/>
                <HUD turns={this.state.turns}
                     stage={this.state.stage}
                     timer={this.state.timer.getFormattedTime()}
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