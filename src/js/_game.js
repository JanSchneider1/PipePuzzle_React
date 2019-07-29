const { TileData } = require("./_tiledata.js");

class Game{
    constructor(){
        this.tileMapData = [
            [new TileData("-", 0), new TileData("L", 0), new TileData("L", 0), new TileData("I", 0), new TileData("I", 0), new TileData("-", 0)],
            [new TileData("S", 0), new TileData("T", 0), new TileData("L", 0), new TileData("T", 0), new TileData("X", 0), new TileData("E", 2)],
            [new TileData("-", 0), new TileData("T", 0), new TileData("I", 0), new TileData("T", 0), new TileData("L", 0), new TileData("-", 0)],
        ];
    }
    evaluateTilemap(tilemap) {
        var startTile = this.findStartTile(tilemap);
    }

    findStartTile(tilemap){
        for(var i = 0; i < tilemap.length; i++) {
            for(var j = 0; j < tilemap[i].length; j++) {
                var tile = tilemap[i][j];
                if (tile.type === 'S') {
                    return tile;
                }
            }
        }
        return null;
    }
}

module.exports = { Game };