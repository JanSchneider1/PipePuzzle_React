const { TileData } = require("./_tiledata.js");
const Random = require("./_random.js");

class Generator{
    constructor(width, height){
        if (width < 4 || height < 3){
            throw Error(`Invalid values for width = ${width} and height = ${height}`);
        }
        if ((height % 2) !== 1){
            throw Error(`Height = ${height} must be odd number!`);
        }
        this.width = width;
        this.height = height;
        this.probabilities = {
            // Probability for X-Tiles
            x : 0.05,
            // Probability for T-Tiles
            t : 0.1,
            // Probability for L-Tiles & I-Tiles
            l_i: 0.85,
            // Probability to go right
            right: 0.4,
            // Probability to go right after going right
            rightAfterRight: 0.2
        };
    }

    generate(){
        /* Create a new tile map based on template meaning an array with
         * with right dimensions respecting to this.width and this.height
         * And also filling in Start- and End-tile (and '-' tiles)
         * Other tiles in the array are instantiated with null */
        var tilemap = this.createTemplate();
        /* Makes sure that tilemap has at least one possible solution.
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
        // The position where we want to find a good tile for (start next from startPos)
        let currentPos = [this.startPos[0]+1, this.startPos[1]];
        // The direction we are coming from
        let currentDirection = 'right';
        // The direction we are trying to go (randomized)
        let nextDirection = this.randomDirection(currentDirection);
        // Loop through until we want to figure out the tile before the end pos in the last column
        while(this.endPos[0] - currentPos[0] !== 1) {
            // Check for out of bounds -> just go right
            if (nextDirection === 'up' && currentPos[1]-1 < 0){
                nextDirection= 'right';
            }
            else if (nextDirection === 'down' && currentPos[1]+1 >= this.height){
                nextDirection = 'right';
            }
            // Set tile
            tilemap[currentPos[1]][currentPos[0]] =
                (currentDirection === nextDirection) ? this.randomStraightTile() : this.randomAngularTile();

            // Prepare next step
            currentDirection = nextDirection;
            nextDirection = this.randomDirection(currentDirection);
            // Goto new position and determine next pos
            if (currentDirection === 'right'){
                currentPos[0]++;
            }
            else if(currentDirection === 'up'){
                currentPos[1]--;
            }
            else if(currentDirection === 'down'){
                currentPos[1]++;
            }
            else{
                throw new Error(`CurrentDirection = ${currentDirection} is not a valid value for direction`);
            }
        }
        // Find way to end pos in last column

        // Go straight if no turning necessary
        if (currentPos[1] === this.endPos[1]) {
            tilemap[currentPos[1]][currentPos[0]] = this.randomStraightTile();
        }
        else{
            // First tile must be angular as we go up or down
            tilemap[currentPos[1]][currentPos[0]] = this.randomAngularTile();
            // Go up / down until we are on the same level as endPos
            while (this.endPos[1] !== currentPos[1]){
                if (this.endPos[1] > currentPos[1]) {
                    currentPos[1]++;
                }
                else{ currentPos[1]--; }
                tilemap[currentPos[1]][currentPos[0]] = this.randomStraightTile();
            }
            // Last tile is angular as we come from above / below
            tilemap[this.endPos[1]][this.endPos[0]-1] = this.randomAngularTile();
        }
        return tilemap;
    }

    randomStraightTile(){
        const random = Random.randomInt(this.probabilities.x, this.probabilities.t, this.probabilities.l_i);
        switch (random) {
            case 0: return new TileData('X', 0);
            case 1: return new TileData('T', 0);
            case 2: return new TileData('I', 0);
        }
    }

    randomAngularTile(){
        const random = Random.randomInt(this.probabilities.x, this.probabilities.t, this.probabilities.l_i);
        switch (random) {
            case 0: return new TileData('X', 0);
            case 1: return new TileData('T', 0);
            case 2: return new TileData('L', 0);
        }
    }

    randomTile(){
        const random = Random.randomInt(
            this.probabilities.x,
            this.probabilities.t,
            (this.probabilities.l_i / 2),
            (this.probabilities.l_i / 2)
        );
        switch (random) {
            case 0: return new TileData('X', 0);
            case 1: return new TileData('T', 0);
            case 2: return new TileData('I', 0);
            case 3: return new TileData('L', 0);
        }
    }

    getProbabilityRightForDirection(direction){
        return direction === 'right' ? this.probabilities.rightAfterRight : this.probabilities.right;
    }

    getProbabilityUpForDirection(direction) {
        switch (direction) {
            case 'right':
                return (1 - this.probabilities.rightAfterRight) / 2;
            case 'up':
                return 1 - this.probabilities.right;
            case 'down':
                return 0;
        }
        throw Error(`Invalid direction given (direction = ${direction})`);
    }

    getProbabilityDownForDirection(direction){
        switch (direction) {
            case 'right': return (1 - this.probabilities.rightAfterRight)/2;
            case 'up': return 0;
            case 'down': return 1 - this.probabilities.right;
        }
        throw Error(`Invalid direction given (direction = ${direction})`);
    }

    randomDirection(currentDirection){
        let random = Random.randomInt(
            this.getProbabilityRightForDirection(currentDirection),
            this.getProbabilityUpForDirection(currentDirection),
            this.getProbabilityDownForDirection(currentDirection)
        );
        switch (random) {
            case 0: return 'right';
            case 1: return 'up';
            case 2: return 'down';
        }
    }

    fillUp(tilemap){
        for(var y = 0; y < tilemap.length; y++) {
            for(var x = 0; x < tilemap[y].length; x++) {
                if (tilemap[y][x] === null)
                    tilemap[y][x] = this.randomTile();
            }
        }
        return tilemap;
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
        return Math.floor(Math.random() * 4);
    }
}

module.exports = { Generator };