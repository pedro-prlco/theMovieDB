const BASE_URL = "https://api.themoviedb.org/3/";
const KEY = "aa1ab57aa675e652c1de3d6e5d3c5b04";

const POPULAR = "movie/popular?api_key=";
const LATEST = "movie/latest?api_key=";
const NOW_PLAYING = "movie/now_playing?api_key=";

var access_token;

function hasToken() {
    if (!localStorage.getItem("access_token"))
        return false;

    access_token = localStorage.getItem("access_token");

    if (access_token == "undefined")
        return false;

    return true;
}

function moviedb_getmovie(type, callback) {

    let link = "".concat(BASE_URL, "movie/", type, "?api_key=", KEY);
    let request = new XMLHttpRequest();

    console.log("GET: ".concat(link));

    request.open("GET", link);
    request.send();

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200)
            callback(request.responseText);
    };
}

function moviedb_gettv(type, callback) {

    let link = "".concat(BASE_URL, "tv/", type, "?api_key=", KEY);
    let request = new XMLHttpRequest();

    console.log("GET: ".concat(link));

    request.open("GET", link);
    request.send();

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200)
            callback(request.responseText);
    };
}

function moviedb_search(type, query, callback) {

    let link = "".concat(BASE_URL, "search/", type, "?api_key=", KEY, "&query=", query);
    let request = new XMLHttpRequest();

    console.log("GET: ".concat(link));

    request.open("GET", link);
    request.send();

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200)
            callback(request.responseText);
    };
}

function wFeedback(value) {
    $("#feedback").html(value);
}

function wDataResponse(value) {
    $("#dataresponse").html(value);
}