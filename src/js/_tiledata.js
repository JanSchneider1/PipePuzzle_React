class TileData {
    constructor (type, rotation) {
        if (type !== 'S' && type !== 'E' && type !== 'I' && type !== 'L' && type !== 'T' && type !== 'X' && type !== '-'){
            throw new Error(type + " is not an legal argument for type of TileData");
        }
        if (rotation !== 0 && rotation !== 1 && rotation !== 2 && rotation !== 3){
            throw new Error(rotation + " is not an legal argument for rotation of TileData");
        }
        this.type = type;
        this.rotation = rotation;
        if (type === 'S') {
            this.isLit = true
        } else {
            this.isLit = false;
        }
    }

    goesUp(){
        if (this.type === "I" && (this.rotation === 1 || this.rotation === 3)){
            return true;
        }
        else if (this.type === "L" && (this.rotation === 0|| this.rotation === 1)){
            return true;
        }
        else if (this.type === "T" && (this.rotation === 1 || this.rotation === 2 || this.rotation === 3)){
            return true;
        }
        else if (this.type === "X"){
            return true;
        }
        else if (this.type === "E" && (this.rotation === 3)){
            return true;
        }
        else if (this.type === "S" && (this.rotation === 3)){
            return true;
        }
        return false;
    }

    goesRight(){
        if (this.type === "I" && (this.rotation === 0 || this.rotation === 2)){
            return true;
        }
        else if (this.type === "L" && (this.rotation === 1|| this.rotation === 2)){
            return true;
        }
        else if (this.type === "T" && (this.rotation === 0 || this.rotation === 2 || this.rotation === 3)){
            return true;
        }
        else if (this.type === "X"){
            return true;
        }
        else if (this.type === "E" && (this.rotation === 0)){
            return true;
        }
        else if (this.type === "S" && (this.rotation === 0)){
            return true;
        }
        return false;
    }

    goesDown(){
        if (this.type === "I" && (this.rotation === 1 || this.rotation === 3)){
            return true;
        }
        else if (this.type === "L" && (this.rotation === 2|| this.rotation === 3)){
            return true;
        }
        else if (this.type === "T" && (this.rotation === 0 || this.rotation === 1 || this.rotation === 3)){
            return true;
        }
        else if (this.type === "X"){
            return true;
        }
        else if (this.type === "E" && (this.rotation === 1)){
            return true;
        }
        else if (this.type === "S" && (this.rotation === 1)){
            return true;
        }
        return false;
    }

    goesLeft(){
        if (this.type === "I" && (this.rotation === 0 || this.rotation === 2)){
            return true;
        }
        else if (this.type === "L" && (this.rotation === 0|| this.rotation === 3)){
            return true;
        }
        else if (this.type === "T" && (this.rotation === 0 || this.rotation === 1 || this.rotation === 2)){
            return true;
        }
        else if (this.type === "X"){
            return true;
        }
        else if (this.type === "E" && (this.rotation === 2)){
            return true;
        }
        else if (this.type === "S" && (this.rotation === 2)){
            return true;
        }
        return false;
    }

    rotateClockWise(){
        this.rotation = (this.rotation + 1) % 4;
        return this.rotation;
    }
}

module.exports = { TileData };