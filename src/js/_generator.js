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
    }

    generate(){
        var tilemap = this.template();
    }

    template(){
        let tilemap = [];
        for (let y=0; y<this.height; y++){
            tilemap.push([]);
        }
        // Add start and end point
        const centerHeight = (this.height-1) / 2;
        tilemap[centerHeight][0] = new TileData('S', 0);
        tilemap[centerHeight][this.width-1] = new TileData('E', 2);
        return tilemap;
    }
}

module.exports = { Generator };