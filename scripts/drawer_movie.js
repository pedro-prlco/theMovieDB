const posterOriginalBase = "https://image.tmdb.org/t/p/w500";

$(document).ready(() => {

    var movie = JSON.parse(localStorage.getItem("inspectedMovie"));
    console.log(movie);

    $("#movie_info_poster").attr("src", posterOriginalBase.concat(movie.poster_path));
    $(".movie_info h2").text(movie.original_title);
    $(".movie_info p").text(movie.overview);
});