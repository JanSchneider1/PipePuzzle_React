const { TileData } = require("./_tiledata.js");
const { Generator } = require("./_generator.js");

class Game{
    constructor(){
        this.tileMapData = this.generateTilemap();
        this.startPos = this.getStartPos();
        this.evaluateTileMap();
    }

    generateTilemap(){
        //return new Generator(6, 3).generate();
        return new Generator(9, 5).generate();
    }

    evaluateTileMap() {
        this.setAllTilesToUnlit();
        let visited = [];
        this.evaluateTileAtPos(this.startPos[0], this.startPos[1], visited);
    }

    evaluateTileAtPos(x, y, visited){
        this.getTileAtPos(x,y).isLit = true;
        visited.push([x,y]);
        const positions = this.getMatchingNeighborsOfTileAtPos(x, y);
        // Filter position, that have been visited
        const positionsToVisit = positions.filter(pos => {
            for (let i=0; i<visited.length; i++){
                let v = visited[i];
                if (v[0] === pos[0] && v[1] === pos[1]){
                    return false;
                }
            } return true;
        });
        if (positionsToVisit.length === 0) {return true;}
        positionsToVisit.forEach(pos => this.evaluateTileAtPos(pos[0], pos[1], visited));
    }

    getMatchingNeighborsOfTileAtPos(x, y){
        if (!this.isInBoundsOfTileMap(x, y)){
            throw Error("Trying to get matching neighbor tiles of out of bounds position (" + x + " ," + y);
        }
        let list = [];
        const tile = this.getTileAtPos(x,y);
        const up = this.getUpPos(x,y);
        const right = this.getRightPos(x,y);
        const down = this.getDownPos(x,y);
        const left = this.getLeftPos(x,y);

        if (up !== null && this.matchTilesInDirection(tile, this.getTileAtPos(up[0], up[1]), 'up')) {
            list.push(up);
        }
        if (right !== null && this.matchTilesInDirection(tile, this.getTileAtPos(right[0], right[1]), 'right')){
            list.push(right);
        }
        if (down !== null && this.matchTilesInDirection(tile, this.getTileAtPos(down[0], down[1]), 'down')){
            list.push(down);
        }
        if (left !== null && this.matchTilesInDirection(tile, this.getTileAtPos(left[0], left[1]), 'left')){
            list.push(left);
        }
        return list;
    }

    setAllTilesToUnlit(){
        for(var y = 0; y < this.tileMapData.length; y++) {
            for(var x = 0; x < this.tileMapData[y].length; x++) {
                this.tileMapData[y][x].isLit = false;
            }
        }
    }

    getStartPos(){
        for(var y = 0; y < this.tileMapData.length; y++) {
            for(var x = 0; x < this.tileMapData[y].length; x++) {
                var tile = this.tileMapData[y][x];
                if (tile.type === 'S') {
                    return [x, y];
                }
            }
        }
        return null;
    }

    getUpPos(x, y){
        if (this.isInBoundsOfTileMap(x, y-1)){
            return [x, y-1];
        }
        return null;
    }

    getRightPos(x, y){
        if (this.isInBoundsOfTileMap(x+1, y)){
            return [x+1, y];
        }
        return null;
    }

    getDownPos(x, y){
        if (this.isInBoundsOfTileMap(x, y+1)){
            return [x, y+1];
        }
        return null;
    }

    getLeftPos(x, y){
        if (this.isInBoundsOfTileMap(x-1, y)){
            return [x-1, y];
        }
        return null;
    }

    getTileAtPos(x, y){
        return this.tileMapData[y][x];
    }

    isInBoundsOfTileMap(x, y){
        return y >= 0 && y < this.tileMapData.length && x >= 0 && x < this.tileMapData[y].length;
    }

    matchTilesInDirection(tileA, tileB, direction){
        if (tileA === null|| tileB === null) {
            throw Error("Trying match tiles that are null (" + tileA + " ," + tileB);
        }
        if (direction === 'up'){
            return tileA.goesUp() && tileB.goesDown();
        }
        else if (direction === 'left'){
            return tileA.goesLeft() && tileB.goesRight();
        }
        else if (direction === 'down'){
            return tileA.goesDown() && tileB.goesUp();
        }
        else if (direction === 'right'){
            return tileA.goesRight() && tileB.goesLeft();
        }
        throw Error(direction + " is not a supported value for 'direction' (only 'up', 'left', 'down', 'right'");
    }
}

module.exports = { Game };