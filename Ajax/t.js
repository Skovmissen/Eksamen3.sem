"use strict";
var dadjoke;
var chuckjoke;
function getDadJoke() {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/dadJoke",
        success: function (data) {
            console.log(data.joke);
            dadjoke = {
                joke: data.joke,
                id: data.id
            };
            var div = document.getElementById("dadJoke");
            div.innerText = data.joke;
        }
    });
}
;
function getChuckJoke() {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/chuckJoke",
        success: function (data) {
            console.log(data.joke);
            chuckjoke = {
                joke: data.joke,
                id: data.id
            };
            var div = document.getElementById("chuckJoke");
            div.innerText = data.joke;
        }
    });
}
;
function getJokes() {
    getDadJoke();
    getChuckJoke();
}
function upvoteDadJoke() {
    $.ajax({
        type: "PUT",
        url: "http://localhost:3000/upvoteDadJoke/" + dadjoke.id,
        success: function (data) {
            getJokes();
        }
    });
}
function upvoteChuckJoke() {
    $.ajax({
        type: "PUT",
        url: "http://localhost:3000/upvoteDadJoke/" + chuckjoke.id,
        success: function (data) {
            getJokes();
        }
    });
}
$("#dadBest").click(function () {
    upvoteDadJoke();
});
$("#chuckBest").click(function () {
    upvoteChuckJoke();
});
var dadjoke;
var chuckjoke;
function getDadJoke() {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/dadJoke",
        success: function (data) {
            console.log(data.joke);
            dadjoke = {
                joke: data.joke,
                id: data.id
            };
            var div = document.getElementById("dadJoke");
            div.innerText = data.joke;
        }
    });
}
;
function getChuckJoke() {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/chuckJoke",
        success: function (data) {
            console.log(data.joke);
            chuckjoke = {
                joke: data.joke,
                id: data.id
            };
            var div = document.getElementById("chuckJoke");
            div.innerText = data.joke;
        }
    });
}
;
function getJokes() {
    getDadJoke();
    getChuckJoke();
}
function upvoteDadJoke() {
    $.ajax({
        type: "PUT",
        url: "http://localhost:3000/upvoteDadJoke/" + dadjoke.id,
        success: function (data) {
            getJokes();
        }
    });
}
function upvoteChuckJoke() {
    $.ajax({
        type: "PUT",
        url: "http://localhost:3000/upvoteDadJoke/" + chuckjoke.id,
        success: function (data) {
            getJokes();
        }
    });
}
$("#dadBest").click(function () {
    upvoteDadJoke();
});
$("#chuckBest").click(function () {
    upvoteChuckJoke();
});
window.onload = getJokes();
$("#newJokes").click(function () {
    getJokes();
});
