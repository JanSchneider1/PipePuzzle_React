const { TileData } = require("./_tiledata.js");

/* This generator generates tile maps of a generic size having at least one
 * possible solution.
 *
 * The generator generates tile maps in the following steps:
 * 1. Generate a createTemplate aka an array with the correct dimensions and start and end tile
 * 2. Generate a random path in the dimensions of the tilemap from start to end
 * 3. Build this random path with fitting random tiles
 * 4. Fill up the tilemap with other random tiles
 * 5. Shuffle the tiles (meaning rotate them)
 */

class Generator{
    constructor(width, height){
        if (width < 3 || height < 3){
            throw Error(`Invalid values for width = ${width} and height = ${height} must both at least 3`);
        }
        if ((height % 2) !== 1){
            throw Error(`Height = ${height} must be odd number!`);
        }
        this.width = width;
        this.height = height;
    }

    generate(){
        var tilemap = this.createTemplate();
        this.createRandomSolution(tilemap);
        this.fillup(tilemap);
        return tilemap;
    }

    createTemplate(){
        // Generate 2D-Array
        let tilemap = [];
        for (let y=0; y<this.height; y++){
            tilemap.push([]);
            for (let x=0; x<this.width; x++){
                tilemap[y].push(null);
            }
        }
        // Generate first and last column
        const heightCenter = (this.height-1) / 2;
        const lastColumn = this.width-1;

        // Add '-' tiles on first and last column
        for (let i=0; i<this.height; i++){
            tilemap[i][0] = new TileData('-', 0);
            tilemap[i][lastColumn] = new TileData('-', 0);
        }

        // Add Start- and End-Pos
        tilemap[heightCenter][0] = new TileData('S', 0);
        tilemap[heightCenter][lastColumn] = new TileData('E', 2);
        this.startPos = [0, heightCenter];
        this.endPos = [lastColumn, heightCenter];

        return tilemap;
    }

    createRandomSolution(tilemap){
        if (this.endPos[0] < this.startPos[0]){
            throw Error(`Start-Pos(${this.startPos}) should be on the left of End-Pos(${this.endPos})`);
        }
        let currentPos = [this.startPos[0]+1, this.startPos[1]];
        let currentDirection = 'right';
        let nextDirection = Generator.randomDirection(20, 40, 40);
        while(this.endPos[0] - currentPos[0] !== 1) {
            // Check for out of bounds
            if (nextDirection === 'up' && currentPos[1]-1 < 0){
                nextDirection= 'right';
            }
            else if (nextDirection === 'down' && currentPos[1]+1 >= this.height){
                nextDirection = 'right';
            }
            // Set tile
            tilemap[currentPos[1]][currentPos[0]] =
                (currentDirection === nextDirection) ? Generator.getRandomStraightTile() : Generator.getRandomAngularTile();

            currentDirection = nextDirection;

            // Goto new position
            if (currentDirection === 'right'){
                currentPos[0]++;
                nextDirection = Generator.randomDirection(20, 40, 40);
            }
            else if(currentDirection === 'up'){
                currentPos[1]--;
                nextDirection = Generator.randomDirection(40, 60, 0);
            }
            else if(currentDirection === 'down'){
                currentPos[1]++;
                nextDirection = Generator.randomDirection(40, 0, 60);
            }
        }
        // Last column
        if (currentPos[1] === this.endPos[1]) {
            tilemap[currentPos[1]][currentPos[0]] = Generator.getRandomStraightTile();
        }
        else{
            tilemap[currentPos[1]][currentPos[0]] = Generator.getRandomAngularTile();
            while (this.endPos[1] === currentPos[1]){
                if (this.endPos[1] > currentPos[1]) {
                    currentPos[1]++;
                }
                else if(this.endPos[1] < currentPos[1]){
                    currentPos[1]--;
                }
                tilemap[currentPos[1]][currentPos[0]] = Generator.getRandomStraightTile();
            }
            tilemap[this.endPos[1]][this.endPos[0]-1] = Generator.getRandomAngularTile();
        }
        return tilemap;
    }

    static getRandomStraightTile(){
        const random = Math.random() * 100;
        switch (true) {
            case (random < 5): return new TileData('X', 0);
            case (random < 15): return new TileData('T', 0);
            case (random < 100): return new TileData('I', 0);
        }
    }

    static getRandomAngularTile(){
        const random = Math.random() * 100;
        switch (true) {
            case (random < 5): return new TileData('X', 0);
            case (random < 15): return new TileData('T', 0);
            case (random < 100): return new TileData('L', 0);
        }
    }

    static randomRotation(){
        const randomRotation = Math.floor(Math.random() * 3);
        switch (randomRotation) {
            case 0:
                return 1;
            case 1:
                return 2;
            case 2:
                return 3;
            case 3:
                return 4
        }
    }

    static getRandomTile(){
        const random = Math.random() * 100;
        switch (true) {
            case (random < 10): return new TileData('X', 0);
            case (random < 30): return new TileData('T', 0);
            case (random < 65): return new TileData('I', 0);
            case (random < 100): return new TileData('L', 0);
        }
    }

    static randomDirection(rateOfRight, rateOfUp, rateOfDown){
        if (rateOfRight < 0 || rateOfUp < 0 || rateOfDown < 0){
            throw Error(`RateOfRight = ${rateOfRight}, rateOfUp = ${rateOfUp} and rateOfDown = ${rateOfDown} cannot be negative`);
        }
        if (rateOfRight + rateOfUp + rateOfDown !== 100){
            throw Error(`Sum of rateOfRight = ${rateOfRight}, rateOfUp = ${rateOfUp} and rateOfDown = ${rateOfDown} must be equal to 100`);
        }
        const random = Math.random() * 100;
        switch (true) {
            case (random < rateOfRight): return 'right';
            case (random < (rateOfRight + rateOfUp)): return 'up';
            case (random < (rateOfRight + rateOfUp + rateOfDown)): return 'down';
        }
        throw Error ("Falling through switch while using random number");
    }

    fillup(tilemap){
        for(var y = 0; y < tilemap.length; y++) {
            for(var x = 0; x < tilemap[y].length; x++) {
                if (tilemap[y][x] === null)
                    tilemap[y][x] = Generator.getRandomTile();
            }
        }
    }

    shuffle(tilemap){
        for(var y = 0; y < tilemap.length; y++) {
            for(var x = 0; x < tilemap[y].length; x++) {
                tilemap[y][x].rotation = Generator.randomRotation();
            }
        }
    }
}

module.exports = { Generator };