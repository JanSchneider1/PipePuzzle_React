const { TileData } = require("./_tiledata.js");

class Game{
    constructor(){

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