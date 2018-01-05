"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var request = require("request");
var fs = require("fs");
var app = express();
var jokeArray = [];
app.get("/", function (req, resp) {
    resp.sendFile(__dirname + "/index.html");
});
app.get("/dadJoke", function (req, resp) {
    var options = {
        method: "GET",
        url: "http://icanhazdadjoke.com/",
        headers: {
            accept: 'application/json'
        }
    };
    request(options, function (error, response, body) {
        var data = JSON.parse(body);
        var joke = data.joke;
        var rating = 0;
        jokeArray.push({ joke: joke, rating: rating });
        var jokeNumber = jokeArray.length - 1;
        console.log(joke);
        var jokeObj = {
            joke: joke,
            id: jokeNumber
        };
        resp.send(jokeObj);
    });
});
app.get("/chuckJoke", function (req, resp) {
    var options = {
        method: "GET",
        url: "https://api.chucknorris.io/jokes/random",
        headers: {
            accept: 'application/json'
        }
    };
    request(options, function (error, response, body) {
        var data = JSON.parse(body);
        var joke = data.value;
        var rating = 0;
        jokeArray.push({ joke: joke, rating: rating });
        var jokeNumber = jokeArray.length - 1;
        console.log(joke);
        var jokeObj = {
            joke: joke,
            id: jokeNumber
        };
        resp.send(jokeObj);
    });
});
app.put("/upvoteDadJoke/:id", function (req, resp) {
    var id = req.params.id;
    jokeArray[id].rating++;
    console.log(jokeArray);
    fs.writeFileSync("database.txt", JSON.stringify(jokeArray));
    resp.send("Dad Wins");
});
app.put("/upvoteChuckJoke/:id", function (req, resp) {
    var id = req.params.id;
    jokeArray[id].rating++;
    console.log(jokeArray);
    fs.writeFileSync("database.txt", jokeArray.toString());
    resp.send("Chuck Wins");
});
console.log("Server running");
app.listen(3000);
