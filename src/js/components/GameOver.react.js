const React = require('react');

class GameOverReact extends React.Component{
    render() {
        if (!this.props.gameOver){
            return null;
        }
        return (
            <div className="game-over shadow-lg">
                <p className="game-over-header">Game Over!</p>
                <p>You have reached stage:</p>
                <p className="game-over-stage-counter">{this.props.stage}</p>
                <button className="btn" onClick={this.props.resetGame}>Try Again!</button>
            </div>
        );
    }
}

module.exports = { GameOver: GameOverReact };