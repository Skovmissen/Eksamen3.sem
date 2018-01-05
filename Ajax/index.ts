import * as express from "express";
import * as request from "request";
import * as fs from "fs";
import { stringify } from "querystring";
let app = express();

const jokeArray: any[] = [];
app.get("/", (req, resp) => {
    resp.sendFile(__dirname + "/index.html");
});
app.get("/dadJoke", (req, resp) => {
    let options = {
        method: "GET",
        url: "http://icanhazdadjoke.com/",
        headers:
            {
                accept: 'application/json'
            }
    }
    request(options, function (error, response, body) {
        let data = JSON.parse(body)
        let joke = data.joke;
        let rating = 0;
        jokeArray.push({ joke, rating });
        let jokeNumber = jokeArray.length - 1;
        console.log(joke);
        let jokeObj = {
            joke: joke,
            id: jokeNumber
        }
        resp.send(jokeObj)
    });
});
app.get("/chuckJoke", (req, resp) => {
    let options = {
        method: "GET",
        url: "https://api.chucknorris.io/jokes/random",
        headers:
            {
                accept: 'application/json'
            }
    }
    request(options, function (error, response, body) {
        let data = JSON.parse(body)
        let joke = data.value;
        let rating = 0;
        jokeArray.push({ joke, rating });
        let jokeNumber = jokeArray.length - 1;
        console.log(joke);
        let jokeObj = {
            joke: joke,
            id: jokeNumber
        }
        resp.send(jokeObj)
    });
});
app.put("/upvoteDadJoke/:id", (req, resp) => {
    let id = req.params.id;
    jokeArray[id].rating++
    console.log(jokeArray);

    fs.writeFileSync("database.txt", JSON.stringify(jokeArray) );
    resp.send("Dad Wins");
})
app.put("/upvoteChuckJoke/:id", (req, resp) => {
    let id = req.params.id;
    jokeArray[id].rating++
    console.log(jokeArray);
    fs.writeFileSync("database.txt", jokeArray.toString());
    resp.send("Chuck Wins");
})








console.log("Server running")
app.listen(3000);