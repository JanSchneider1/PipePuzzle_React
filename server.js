var express = require('express');
var app = express();
var path = require('path');

let port = 8080;

app.get('/', function(req, res) {
    console.log("Sending HTML page 'app.html' to client");
    res.sendFile(path.join(__dirname + '/src/html/app.html'));
});

app.get('/app.js', function(req, res) {
    console.log("Sending JS file 'app.js' to client");
    res.sendFile(path.join(__dirname + '/build/js/app.js'));
});

app.get('/app.less', function(req, res) {
    console.log("Sending LESS file 'app.less' to client");
    res.sendFile(path.join(__dirname + '/src/css/app.less'));
});

/* Images */
app.get('/img/Empty_Tile.png', function(req, res) {
    res.sendFile(path.join(__dirname + '/resources/img/Empty_Tile.png'));
});
app.get('/img/End.png', function(req, res) {
    res.sendFile(path.join(__dirname + '/resources/img/End.png'));
});
app.get('/img/I-Tile.png', function(req, res) {
    res.sendFile(path.join(__dirname + '/resources/img/I-Tile.png'));
});
app.get('/img/I-Tile_Lit.png', function(req, res) {
    res.sendFile(path.join(__dirname + '/resources/img/I-Tile_Lit.png'));
});
app.get('/img/L-Tile.png', function(req, res) {
    res.sendFile(path.join(__dirname + '/resources/img/L-Tile.png'));
});
app.get('/img/L-Tile_Lit.png', function(req, res) {
    res.sendFile(path.join(__dirname + '/resources/img/L-Tile_Lit.png'));
});
app.get('/img/Start.png', function(req, res) {
    res.sendFile(path.join(__dirname + '/resources/img/Start.png'));
});
app.get('/img/T-Tile.png', function(req, res) {
    res.sendFile(path.join(__dirname + '/resources/img/T-Tile.png'));
});
app.get('/img/T-Tile_Lit.png', function(req, res) {
    res.sendFile(path.join(__dirname + '/resources/img/T-Tile_Lit.png'));
});
app.get('/img/X-Tile.png', function(req, res) {
    res.sendFile(path.join(__dirname + '/resources/img/X-Tile.png'));
});
app.get('/img/X-Tile_Lit.png', function(req, res) {
    res.sendFile(path.join(__dirname + '/resources/img/X-Tile_Lit.png'));
});

app.listen(port);

console.log(`Server is running at http://localhost:${port}/`);
