const BASE_URL = "https://api.themoviedb.org/3/";
const KEY = "aa1ab57aa675e652c1de3d6e5d3c5b04";

const POPULAR = "movie/popular?api_key=";
const LATEST = "movie/latest?api_key=";
const NOW_PLAYING = "movie/now_playing?api_key=";

var access_token;

// https://api.themoviedb.org/3//authentication/token/new?api_key=aa1ab57aa675e652c1de3d6e5d3c5b04

$(document).ready(function () {

    if (initApi()) {


        $("#populars").bind("click", function () {

            let link = "".concat(BASE_URL, POPULAR, KEY);
            console.log(link);
            let request = new XMLHttpRequest();
            request.open("GET", link);
            request.send();

            request.onreadystatechange = function () {
                wDataResponse(request.responseText);
            };
        });

        $("#latest").bind("click", function () {

            let link = "".concat(BASE_URL, LATEST, KEY);
            console.log(link);
            let request = new XMLHttpRequest();
            request.open("GET", link);
            request.send();

            request.onreadystatechange = function () {
                wDataResponse(request.responseText);
            };
        });


        $("#now_playing").bind("click", function () {

            let link = "".concat(BASE_URL, NOW_PLAYING, KEY);
            console.log(link);
            let request = new XMLHttpRequest();
            request.open("GET", link);
            request.send();

            request.onreadystatechange = function () {
                wDataResponse(request.responseText);
            };
        });
    }
});

function initApi() {

    let link = "".concat(BASE_URL, "/authentication/token/new?api_key=", KEY);
    let request = new XMLHttpRequest();

    if (!hasToken()) {

        request.open("GET", link);
        request.send();

        request.onreadystatechange = function () {
            console.log(request.responseText);
            access_token = request.responseText.access_token;
            localStorage.setItem("access_token", access_token);
        }
    }
    else {
        console.log("Fetch access_token: " + access_token);
    }

    wFeedback(access_token);

    return true;
}

function hasToken() {
    if (!localStorage.getItem("access_token"))
        return false;

    access_token = localStorage.getItem("access_token");

    return true;
}

function wFeedback(value) {
    $("#feedback").html(value);
}

function wDataResponse(value) {
    $("#dataresponse").html(value);
}