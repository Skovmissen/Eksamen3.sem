import * as Express from 'express';
let app = Express();
import * as Http from 'http';
let http = new Http.Server(app);
import * as Socket from 'socket.io';
let io = Socket(http);

app.get('/', (req, resp) => {
    resp.sendFile(__dirname + "/index.html");
});

let users: any = {};
io.on('connection', function (socket) {

    socket.on('setUsername', function (data) {
        console.log("User: " + data + " Connected");
        if (data in users) {
            socket.emit('userExists', data + ' username is taken! Try some other username.');
        } else {
            socket.id = data;
            users[socket.id] = socket;
            socket.emit('userSet', { username: data });
            
        }
    });

    socket.on('msg', function (data) {
        //Send message to everyone

        let msg = data.message;

        if (msg.substring(0, 3) === "/w ") {
            msg = msg.substring(3);
            let index = msg.indexOf(' ');
            if (index !== -1) {
                let name = msg.substring(0, index);
                msg = msg.substring(index + 1);

                if (name in users) {
                    users[name].emit('privateMessage', {message: msg, user: socket.id});
                    socket.emit('privateMessage', {message: data.message, user: socket.id});    
                }
            }
        }
        else {
            io.sockets.emit('newmsg', data);
        }

    });
    socket.on('disconnect', function (data) {
        console.log(data.user + "Diconnected");
        
        delete users[socket.id];

    })

});




http.listen(3000, () => {
    console.log("Listening on port 3000");

});