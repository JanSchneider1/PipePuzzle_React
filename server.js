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

app.get('/app.min.js', function(req, res) {
    console.log("Sending JS file 'app.min.js' to client");
    res.sendFile(path.join(__dirname + '/build/minified/js/app.min.js'));
});

app.get('/app_deploy.js', function(req, res) {
    console.log("Sending JS file 'app.js' to client");
    res.sendFile(path.join(__dirname + '/build/js/app_deploy.js'));
});

app.get('/app.less', function(req, res) {
    console.log("Sending LESS file 'app.less' to client");
    res.sendFile(path.join(__dirname + '/src/css/app.less'));
});

app.get('/app.css', function(req, res) {
    console.log("Sending CSS file 'app.css' to client");
    res.sendFile(path.join(__dirname + '/build/css/app.css'));
});

app.get('/app.min.css', function(req, res) {
    console.log("Sending CSS file 'app.min.css' to client");
    res.sendFile(path.join(__dirname + '/build/minified/css/app.min.css'));
});

app.listen(port);

console.log(`Server is running at http://localhost:${port}/`);
