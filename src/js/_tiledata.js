export class TileData {
    constructor (type, rotation) {
        this.type = type;
        this.rotation = rotation;
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
        return false;
}
}