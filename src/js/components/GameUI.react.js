const React = require('react');
const $ = require("jquery");

const { Game } = require("../_game");
const { TimerClock } = require("../_timerclock");
const { HUD } = require(".//HUD.react");
const { Tilemap } = require(".//Tilemap.react");
const { GameOver } = require(".//GameOver.react");

class GameUI extends React.Component{
    constructor(props){
        super(props);
        this.timer = new TimerClock(this.props.startTime.min, this.props.startTime.sec);
        // Set start state
        this.state = {
            game: new Game(6, 3),
            turns: 0,
            stage: 1,
            type: 'game-6by3',
            displayTime: this.timer.getFormattedTime(),
            gameOver: false,
        };
        this.onStageComplete = this.onStageComplete.bind(this);
        this.onTileClick = this.onTileClick.bind(this);
        this.onTimerTick = this.onTimerTick.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }

    resetGame(){
        this.timer.resetTime();
        this.setState({
            game: new Game(6, 3),
            turns: 0,
            stage: 1,
            type: 'game-6by3',
            displayTime: this.timer.getFormattedTime(),
            gameOver: false,
            earnedSeconds: -1,
        });
    }

    onTileClick(x, y){
        const tile = this.state.game.getTileAtPos(x, y);
        tile.rotateClockWise();
        this.state.game.evaluateTileMap();
        if (this.state.game.isSolved){
            setTimeout(() => this.onStageComplete(), 500);
        }
        this.setState((state) => ({
            game: state.game,
            turns: ++state.turns
        }));
    }

    onLose(){
        this.setState({gameOver: true});
    }

    onStageComplete(){
        let nextGame;
        let type;
        let addTime;
        if (this.state.stage + 1 > this.props.hardAtStage){
            nextGame = new Game(12, 7);
            type = 'game-12by7';
            addTime = this.props.addTimeOnComplete.hard - this.state.turns;
        }
        else if (this.state.stage + 1 > this.props.normalAtStage){
            nextGame = new Game(9, 5);
            type = 'game-9by5';
            addTime = this.props.addTimeOnComplete.normal - this.state.turns;
        }
        else {
            nextGame = new Game(6, 3);
            type = 'game-6by3';
            addTime = this.props.addTimeOnComplete.easy - this.state.turns;
        }
        if (addTime < 0) { addTime = 0; }
        this.timer.addSeconds(addTime);
        this.setState((state) => ({
            earnedSeconds: addTime,
            displayTime: this.timer.getFormattedTime(),
            turns: 0,
            stage: ++state.stage,
            game: nextGame,
            type: type
        }));
        this.forceAnimationToResetAndPlay();
    }

    // Workaround to trigger animation of timer and popup
    forceAnimationToResetAndPlay(){
        // Timer
        const timer = $('#timer');
        timer.removeClass('flash');
        setTimeout(() => timer.addClass('flash'), 100);
        // Popup
        const popup = $('#popup');
        popup.removeClass('popup');
        popup.css('display', 'none');
        setTimeout(() => {
            popup.addClass('popup');
            popup.css('display', 'block');
        }, 100);
    }

    onTimerTick() {
        this.timer.subSeconds(1);
        this.setState({displayTime: this.timer.getFormattedTime()});
        if (this.state.displayTime === '0:00'){ this.onLose() }
    }

    render() {
        return (
            <div>
                <GameOver stage={this.state.stage} gameOver={this.state.gameOver} resetGame={this.resetGame}/>
                <HUD turns={this.state.turns}
                     stage={this.state.stage}
                     displayTime={this.state.displayTime}
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