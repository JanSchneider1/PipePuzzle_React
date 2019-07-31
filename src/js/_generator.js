const { TileData } = require("./_tiledata.js");

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
        this.probabilities = {x : 5, t : 10, li: 85, updown: 80, right: 20};
    }

    generate(){
        /* Create a new tile map based on template meaning an array with
         * with right dimensions respecting to this.width and this.height
         * And also filling in Start- and End-tile (and '-' tiles)
         * Other tiles in the array are instantiated with null */
        var tilemap = this.createTemplate();
        /* Makes shure that tilemap has at least one possible solution.
         * Places tiles according to a custom algorithm to form a random solution. */
        this.createRandomSolution(tilemap);
        // Fills up each tile that is still equal to null with a random tile
        this.fillUp(tilemap);
        // Gives every tile a random rotation
        Generator.shuffle(tilemap);
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
        let nextDirection = this.randomDirection(20, 40, 40);
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
                (currentDirection === nextDirection) ? this.randomStraightTile() : this.randomAngularTile();

            currentDirection = nextDirection;

            // Goto new position
            if (currentDirection === 'right'){
                currentPos[0]++;
                nextDirection = this.randomDirection(20, 40, 40);
            }
            else if(currentDirection === 'up'){
                currentPos[1]--;
                nextDirection = this.randomDirection(40, 60, 0);
            }
            else if(currentDirection === 'down'){
                currentPos[1]++;
                nextDirection = this.randomDirection(40, 0, 60);
            }
        }
        // Last column
        if (currentPos[1] === this.endPos[1]) {
            tilemap[currentPos[1]][currentPos[0]] = this.randomStraightTile();
        }
        else{
            tilemap[currentPos[1]][currentPos[0]] = this.randomAngularTile();
            while (this.endPos[1] === currentPos[1]){
                if (this.endPos[1] > currentPos[1]) {
                    currentPos[1]++;
                }
                else if(this.endPos[1] < currentPos[1]){
                    currentPos[1]--;
                }
                tilemap[currentPos[1]][currentPos[0]] = this.randomStraightTile();
            }
            tilemap[this.endPos[1]][this.endPos[0]-1] = this.randomAngularTile();
        }
        return tilemap;
    }

    randomStraightTile(){
        const random = Math.random() * 100;
        switch (true) {
            case (random < this.probabilities.x): return new TileData('X', 0);
            case (random < 15): return new TileData('T', 0);
            case (random < 100): return new TileData('I', 0);
        }
    }

    randomAngularTile(){
        const random = Math.random() * 100;
        switch (true) {
            case (random < 5): return new TileData('X', 0);
            case (random < 15): return new TileData('T', 0);
            case (random < 100): return new TileData('L', 0);
        }
    }

    randomTile(){
        const random = Math.random() * 100;
        switch (true) {
            case (random < 10): return new TileData('X', 0);
            case (random < 30): return new TileData('T', 0);
            case (random < 65): return new TileData('I', 0);
            case (random < 100): return new TileData('L', 0);
        }
    }

    randomDirection(rateOfRight, rateOfUp, rateOfDown){
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

    fillUp(tilemap){
        for(var y = 0; y < tilemap.length; y++) {
            for(var x = 0; x < tilemap[y].length; x++) {
                if (tilemap[y][x] === null)
                    tilemap[y][x] = this.randomTile();
            }
        }
    }

    static shuffle(tilemap){
        for(var y = 0; y < tilemap.length; y++) {
            for(var x = 0; x < tilemap[y].length; x++) {
                if (tilemap[y][x].type !== 'S' && tilemap[y][x].type !== 'E' && tilemap[y][x].type !== '-'){
                    tilemap[y][x].rotation = Generator.randomRotation();
                }
            }
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
}

module.exports = { Generator };