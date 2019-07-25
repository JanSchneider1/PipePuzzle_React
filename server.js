var express = require('express');
var path = require('path');
var app = express();

// Everything inside of the 'resource' folder can be accessed by the client
var dir = path.join(__dirname, 'resources');
app.use(express.static(dir));

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

app.listen(port);

console.log(`Server is running at http://localhost:${port}/`);
