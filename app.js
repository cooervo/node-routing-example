"use strict";
const http = require('http');
const router = require("./router.js");

const PORT = 8080;

//Create a server
var server = http.createServer(function (request, response) {

    router.home(request, response);
    router.user(request, response);

}).listen(PORT, function () {
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
})

