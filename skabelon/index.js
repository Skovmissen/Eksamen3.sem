"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Express = require("express");
var app = Express();
app.set('port', (process.env.PORT || 3000));
app.get("/", function (req, resp) {
    resp.sendFile(__dirname + "/index.html");
});
app.listen(app.get('port'));
