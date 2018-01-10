"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var BodyParser = require("body-parser");
var HTTP = require("http-status-codes");
var hal_1 = require("hal");
var app = express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(function (req, resp, next) {
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Methods", "POST, GET, DELETE, OPTIONS");
    resp.header("Access-Control-Allow-Headers", "Origin, X-Requested-with,Content-type, Accept");
    resp.header("Content-Type", "application/hal+json");
    next();
});
var quotes = [{
        title: "Newest quote",
        description: 'A man can walk 500 miles, and maybe 500 miles more.',
        rating: 2,
        date: new Date("Wed Sep 20 2017")
    },
    {
        title: "Highest rated quote",
        description: 'Some crappy quote',
        rating: 3,
        date: new Date("2017-09-18")
    },
    {
        title: "Lowest rated quote",
        description: 'Another crappy quote',
        rating: 1,
        date: new Date("2017-09-19")
    }];
app.get("/", function (req, resp) {
    var res = new hal_1.Resource({}, "http://localhost:3000/");
    res.link("CreateQuote", "http://localhost:3000/quotes/create");
    res.link("GetListOfQuotes", "http://localhost:3000/quotes/list");
    resp.status(HTTP.OK).json(res);
});
app.post("/quotes/create", function (req, resp) {
    var title = req.body.title;
    var description = req.body.description;
    var rating = 0;
    var date = new Date();
    quotes.push({ title: title, description: description, rating: rating, date: date });
    resp.status(HTTP.CREATED).send("New Quote Added");
});
app.get("/quotes/list", function (req, resp) {
    var res = new hal_1.Resource({}, "http://localhost:3000/quotes/list");
    for (var i = 0; i < quotes.length; i++) {
        var title = quotes[i].title;
        var description = quotes[i].description;
        var rating = quotes[i].rating;
        var quote = new hal_1.Resource({ title: title, description: description, rating: rating }, "http://localhost:3000/quotes/" + i);
        res.link(quotes[i].title, "/quotes/" + i);
        res.embed("quote", quote);
    }
    resp.status(HTTP.OK).json(res);
});
app.get("/quotes/:id", function (req, resp) {
    var id = req.params.id;
    var res = new hal_1.Resource(quotes[id], "/quotes/" + id);
    res.link("Quote: " + "Delete quote", "http://localhost:3000/quotes/" + id + "/delete");
    res.link("Quote: " + "Upvote quote", "http://localhost:3000/quotes/" + id + "/upvote");
    res.link("Quote: " + "Downvote quote", "http://localhost:3000/quotes/" + id + "/downvote");
    resp.status(HTTP.OK).send(res);
});
app.delete("/quotes/:id/delete", function (req, resp) {
    var result;
    var id = req.params.id;
    quotes.splice(id, 1);
    result = "Deleted";
    resp.status(HTTP.NO_CONTENT).send(result);
});
app.post("/quotes/:id/downvote", function (req, resp) {
    var result;
    var id = req.params.id;
    quotes[id].rating--;
    result = "Downvoted";
    resp.status(HTTP.OK).send(result);
});
app.post("/quotes/:id/upvote", function (req, resp) {
    var result;
    var id = req.params.id;
    quotes[id].rating++;
    result = "Upvoted";
    resp.status(HTTP.OK).send(result);
});
app.options("*", function (req, resp) {
    resp.status(HTTP.OK).json("*");
});
console.log("Server started on port 3000");
app.listen(3000);
