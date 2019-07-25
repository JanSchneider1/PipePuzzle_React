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
    render() {
        return (
            <div className={"tile " + this.applyRotationClass()}>
                <img alt="Tile" src={this.getImgBasedOnType()}/>
            </div>
        );
    }

    applyRotationClass(){
        switch (this.props.rotation) {
            case '0':
                return "rotate-0";
            case '1':
                return "rotate-1";
            case '2':
                return "rotate-2";
            case '3':
                return "rotate-3";
        }
    }

    getImgBasedOnType(){
        switch(this.props.type){
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

class Tilemap extends React.Component{
    render() {
        return (
            <div className="tilemap container-fluid">
                <div className="row">
                    <Tile type={tileMapData[0][0]} rotation="0"/>
                    <Tile type={tileMapData[0][1]} rotation="0"/>
                    <Tile type={tileMapData[0][2]} rotation="0"/>
                    <Tile type={tileMapData[0][3]} rotation="0"/>
                    <Tile type={tileMapData[0][4]} rotation="0"/>
                    <Tile type={tileMapData[0][5]} rotation="0"/>
                </div>
                <div className="row">
                    <Tile type={tileMapData[1][0]} rotation="0"/>
                    <Tile type={tileMapData[1][1]} rotation="0"/>
                    <Tile type={tileMapData[1][2]} rotation="0"/>
                    <Tile type={tileMapData[1][3]} rotation="0"/>
                    <Tile type={tileMapData[1][4]} rotation="0"/>
                    <Tile type={tileMapData[1][5]} rotation="2"/>
                </div>
                <div className="row">
                    <Tile type={tileMapData[2][0]} rotation="0"/>
                    <Tile type={tileMapData[2][1]} rotation="0"/>
                    <Tile type={tileMapData[2][2]} rotation="0"/>
                    <Tile type={tileMapData[2][3]} rotation="0"/>
                    <Tile type={tileMapData[2][4]} rotation="0"/>
                    <Tile type={tileMapData[2][5]} rotation="0"/>
                </div>
            </div>
        );
    }
}

class Game extends React.Component{
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
var tileMapData = [
    ["-", "L", "L", "I", "I", "-"],
    ["S", "T", "L", "T", "X", "E"],
    ["-", "T", "I", "T", "L", "-"],
];

ReactDOM.render(<Game tileMapData={tileMapData}/>, document.getElementById('app'));