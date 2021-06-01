const catholder = "<ul class='movies_list' id='ms_'><li class='movies'><h2 class='category_title'></h2><ul class='movies_display_ul'></ul></li></ul>";
const movieBtn = "<div class='card' style='width: 18rem; border: none;'><img src='https://flxt.tmsimg.com/assets/p7825626_p_v10_af.jpg' class='card-img-top' alt='...'><div class='card-body' style='position: absolute; top: 63%; background-color: rgba(0, 0, 0, .5); width: 18rem;'><h5>Inception</h5><a href='#' class='btn btn-primary' style='background-color: red; border: none;'>Mais</a></div></div>";
const posterOriginalBase = "https://image.tmdb.org/t/p/original";

$(document).ready(function () {

    addMovieSession(".container-fluid", "No Cinema", () => {
        moviedb_get("now_playing", (response) => {

            data = JSON.parse(response);
            drawFetchedData(data, "No Cinema");

            addMovieSession(".container-fluid", "Em alta", () => {

                moviedb_get("popular", (response) => {

                    data = JSON.parse(response);
                    drawFetchedData(data, "Em alta");

                    addMovieSession(".container-fluid", "Top rated", () => {
                        moviedb_get("top_rated", (response) => {

                            data = JSON.parse(response);
                            drawFetchedData(data, "Top rated");
                        });
                    });
                });
            });
        });
    });
});


function drawFetchedData(data, session) {
    console.log(data);

    for (i = 0; i < 4; i++) {
        if (i < data.results.length)
            addMovieBtn(getIdFromSessionName(session), data.results[i])
    }
}

function addMovieSession(parent, name, whendone) {
    var old = $(parent).html();
    $(parent).html(old + " " + catholder);
    $("#ms_").attr("id", getIdFromSessionName(name));
    $("#ms_".concat(name.replace(" ", "_"), " .category_title")).text(name);
    whendone();
}

function addMovieBtn(parent, movie) {
    var old = $("#" + parent + " .movies_display_ul").html();
    $("#" + parent + " .movies_display_ul").html(old + " <li id=" + movie.id + ">" + movieBtn + "</li>");
    $("#" + parent + " .movies_display_ul #" + movie.id + " h5").html(movie.original_title);
    $("#" + parent + " .movies_display_ul #" + + movie.id + " img").attr("src", posterOriginalBase.concat(movie.poster_path));
}

function getIdFromSessionName(session) {
    return "ms_".concat(session.replace(" ", "_"));
}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}