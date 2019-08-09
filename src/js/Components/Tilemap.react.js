const { Tile } = require("../Components/Tile.react");

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

module.exports = { Tilemap };