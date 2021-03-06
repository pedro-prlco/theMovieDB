const catholder = "<li class='movies' id='ms_'><h2 class='category_title'></h2><ul class='movies_display_ul'></ul></li>";
const movieBtn =
    "<button class='card' style='width: 18rem; border: none;'>" +
    "<div class='card_body'>" +
    "<div class='card_body_labels'>" +
    "<h2 class='card_title'>Nome Aqui</h2>" +
    "<p class='card_rate'>0.0</p>" +
    "<p class='card_year'>2000</p>" +
    "</div>" +
    "</div>" +
    "<img src='https://flxt.tmsimg.com/assets/p7825626_p_v10_af.jpg' class='card-img-top' alt='...'>" +
    "</button>";
const posterOriginalBase = "https://image.tmdb.org/t/p/original";

//caso estou desenhando seção de filme ou série
function drawFetchedData(data, session, productionType) {

    console.log(data);

    var size = (data.results.length > 4) ? 4 : data.results.length;

    for (i = 0; i < size; i++) {
        var date = (productionType == "movie") ? data.results[i].release_date : data.results[i].first_air_date;
        var name = (productionType == "movie") ? data.results[i].original_title : data.results[i].name;
        addMovieBtn(getIdFromSessionName(session), data.results[i].id, name, data.results[i].poster_path, " ★ " + data.results[i].vote_average, date.split('-')[0], productionType);
    }
}

//caso estou desenhando resultados de pesquisa
function drawFetchedDataWOutSession(data, session) {

    console.log(data);

    for (i = 0; i < data.results.length; i++) {
        if (data.results[i].backdrop_path != null) {
            addMovieBtn(getIdFromSessionName(session), data.results[i].id, data.results[i].original_title, data.results[i].poster_path, " ★ " + data.results[i].vote_average, data.results[i].release_date.split('-')[0], "movie");
        }
    }
}

function addMovieSession(parent, name, whendone) {
    var old = $(parent).html();
    $(parent).html(old + " " + catholder);
    $("#ms_").attr("id", getIdFromSessionName(name));
    $("#ms_".concat(name.replace(" ", "_"), " .category_title")).text(name);
    whendone();
}

function addMovieBtn(parent, id, original_title, poster_path, rating, year, productionType) {
    var old = $("#" + parent + " .movies_display_ul").html();
    $("#" + parent + " .movies_display_ul").html(old + " <li id=" + id + ">" + movieBtn + "</li>");
    $("#" + parent + " .movies_display_ul #" + id + " h5").html(original_title);
    $("#" + parent + " .movies_display_ul #" + id + " img").attr("src", posterOriginalBase.concat(poster_path));
    $("#" + parent + " .movies_display_ul #" + id + " button").attr("onclick", "openMovie(".concat("\'", id, "_", productionType, "\')"));
    $("#" + parent + " .movies_display_ul #" + id + " .card_title").html(original_title);
    $("#" + parent + " .movies_display_ul #" + id + " .card_rate").html(rating);
    $("#" + parent + " .movies_display_ul #" + id + " .card_year").html(year);
}

function openMovie(movieId) {

    var id = movieId.split("_")[0];
    var type = movieId.split("_")[1];

    console.log("Open".concat(type, " ", id));

    if (type == "movie") {
        moviedb_getmovie(id, (response) => {
            localStorage.setItem("productionType", "movie");
            localStorage.setItem("inspectedMovie", response);
            location.href = "movie.html";
        });
    }
    else {
        moviedb_gettv(id, (response) => {
            localStorage.setItem("productionType", "tv");
            localStorage.setItem("inspectedMovie", response);
            location.href = "movie.html";
        });
    }
}

function getIdFromSessionName(session) {
    return "ms_".concat(session.replace(" ", "_"));
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}