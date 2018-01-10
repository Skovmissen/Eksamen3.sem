import * as express from 'express';
import * as BodyParser from 'body-parser';
import * as HTTP from 'http-status-codes';
import {Resource} from 'hal';
let app = express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use((req, resp, next) => {
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Methods", "POST, GET, DELETE, OPTIONS")
    resp.header("Access-Control-Allow-Headers", "Origin, X-Requested-with,Content-type, Accept");
    resp.header("Content-Type", "application/hal+json");
    next();
});

let quotes: any[] = [{
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

app.get("/", (req, resp) => {
    let res = new Resource({}, "http://localhost:3000/");
    res.link("CreateQuote", "http://localhost:3000/quotes/create");
    res.link("GetListOfQuotes", "http://localhost:3000/quotes/list")


    resp.status(HTTP.OK).json(res);
})

app.post("/quotes/create", (req, resp) => {
    let title = req.body.title;
    let description = req.body.description;
    let rating = 0;
    let date = new Date();
    quotes.push({ title, description, rating, date });
    resp.status(HTTP.CREATED).send("New Quote Added");
})

app.get("/quotes/list", (req, resp) => {

    let res = new Resource({}, "http://localhost:3000/quotes/list");

    for (let i = 0; i < quotes.length; i++) {
        let title = quotes[i].title;
        let description = quotes[i].description;
        let rating = quotes[i].rating;
        let quote = new Resource({ title, description, rating }, "http://localhost:3000/quotes/" + i);
        res.link(quotes[i].title, "/quotes/" + i)

        res.embed("quote", quote);
    }
    resp.status(HTTP.OK).json(res);
})
app.get("/quotes/:id", (req, resp) => {

    let id = req.params.id;
    let res = new Resource(quotes[id], "/quotes/" + id);
    res.link("Quote: " + "Delete quote", "http://localhost:3000/quotes/" + id + "/delete")
    res.link("Quote: " + "Upvote quote", "http://localhost:3000/quotes/" + id + "/upvote")
    res.link("Quote: " + "Downvote quote", "http://localhost:3000/quotes/" + id + "/downvote")
    resp.status(HTTP.OK).send(res)
});
app.delete("/quotes/:id/delete", (req, resp) => {
    let result;
    let id = req.params.id;
    quotes.splice(id, 1);
    result = "Deleted";

    resp.status(HTTP.NO_CONTENT).send(result);
});
app.post("/quotes/:id/downvote", (req, resp) => {
    let result;
    let id = req.params.id;
    quotes[id].rating--;
    result = "Downvoted";
    resp.status(HTTP.OK).send(result);
});
app.post("/quotes/:id/upvote", (req, resp) => {
    let result;
    let id = req.params.id;
    quotes[id].rating++;
    result = "Upvoted";
    resp.status(HTTP.OK).send(result);
});
app.options("*", (req, resp) => {
    resp.status(HTTP.OK).json("*");
});
console.log("Server started on port 3000");
app.listen(3000);