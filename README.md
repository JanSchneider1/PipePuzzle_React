# Node/Express setup with React

This application contains a simple server template delivering a plain
HTML file on http://localhost:8080/.

The application comes with a Node and Express Backend which functionality
is specified in the 'server.js'

It lets you start building your React Components in  the 'app.js' file.

# Guide

### 1. Make shure you have [Node.js](https://nodejs.org/en/) installed
### 2. Open the Project in your IDE
### 3. Install all NPM packages

NPM is a package manager and will automatically install all dependencies of this project.
So type this command in your console when your'e in the directory of this project:

    npm install
    
### 4. Start Babel watching over your src folder

If you want to use JSX (JavaScriptXML) with React you need to make
Babel translate it to valid JS that even IE can execute.
You have to execute the following script each time you start up the project:

    npm run -s watch
    
Now your js files in the src folder will be found translated in your /build/js folder.
Babel will automatically compile as you make changes to your files as it now watching you!

### 5. Start up the server

To start up the server you just need to execute:

    node server.js
    
Now you can enjoy a wonderful 'HelloWorld' on http://localhost:8080/