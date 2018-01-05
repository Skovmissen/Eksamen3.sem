import * as express from 'express';
import * as fs from 'fs';
import * as request from 'request';
let aa = require('express-async-await')

let app = aa(express());
const jokearray = [];

app.get("/Joke",  async function(req, resp){

     var options = {
        method: 'GET',
        url: 'https://api.chucknorris.io/jokes/random',
        headers:
            {
                accept: 'application/json'
            }
    };

     await request(options, function (error, response, body) {
        if (error) throw new Error(error);

        let chuckJoke = JSON.parse(body);
        console.log(chuckJoke.value);
        jokearray[1] = chuckJoke.value;
        console.log(jokearray);
        
    });
    var dadoptions = {
        method: 'GET',
        url: 'https://icanhazdadjoke.com/',
        headers:
            {
                accept: 'application/json'
            }
    };

    request(dadoptions, function (error, response, body) {
        if (error) throw new Error(error);

        let dadJoke = JSON.parse(body);
        console.log(dadJoke.joke);
        jokearray[0] = dadJoke.joke;
        resp.send("DadJoke = " + jokearray[0] + "\n" + " Chuck Norris Joke = " + jokearray[1])
    });
 });
app.get("/chuckJoke", (req, resp) => {

     var options = {
         method: 'GET',
         url: 'https://api.chucknorris.io/jokes/random',
         headers:
             {
                 accept: 'application/json'
             }
     };

     request(options, function (error, response, body) {
         if (error) throw new Error(error);

         let chuckJoke = JSON.parse(body);
         console.log(chuckJoke.value);
         jokearray[1] = chuckJoke.value;
         console.log(jokearray);
         resp.json(chuckJoke.value);
     });

 });


console.log("server started on port 3000")
app.listen(3000);