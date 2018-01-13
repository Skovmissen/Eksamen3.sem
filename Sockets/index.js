"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Express = require("express");
var app = Express();
var Http = require("http");
var http = new Http.Server(app);
var Socket = require("socket.io");
var io = Socket(http);
app.get('/', function (req, resp) {
    resp.sendFile(__dirname + "/index.html");
});
var users = {};
io.on('connection', function (socket) {
    socket.on("setUserName", function (data) {
        if (data in users || data.indexOf(" ") > -1 || data === "") {
            socket.emit("UserExists", "Username is taken or contains a space!");
        }
        else {
            socket.id = data;
            console.log(socket);
            users[socket.id] = socket; //man sætter en socket for hver der connecter så du emit på til den specifikke socket.
            console.log("User: " + data + " Connected to the server");
            socket.emit("userSet", { username: data });
        }
    });
    socket.on("msg", function (data) {
        var msg = data.message;
        if (msg.substring(0, 3) === "/w ") {
            msg = msg.substring(3);
            var index = msg.indexOf(' ');
            if (index !== -1) {
                var name_1 = msg.substring(0, index);
                msg = msg.substring(index + 1);
                if (name_1 in users) {
                    users[name_1].emit('privateMessage', { message: msg, user: socket.id });
                    socket.emit('privateMessage', { message: data.message, user: socket.id });
                }
            }
        }
        else {
            io.sockets.emit('newMsg', data);
        }
    });
});
http.listen(3000, function () {
    console.log("Listening on port 3000");
});
