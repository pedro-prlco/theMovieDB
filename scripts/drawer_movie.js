const posterOriginalBase = "https://image.tmdb.org/t/p/w500";

const genreLi = "<li>GENRE_HERE</li>";

$(document).ready(() => {

    var movie = JSON.parse(localStorage.getItem("inspectedMovie"));
    console.log(movie);

    $("#movie_info_poster").attr("src", posterOriginalBase.concat(movie.poster_path));
    $(".movie_info h2").text(movie.original_title);
    $(".movie_info p").text(movie.overview);

    movie.production_companies.forEach(element => {
        var old = $("ul").html();
        $("ul").html(old + " " + genreLi.replace("GENRE_HERE", element.name));
    });

    movie.genres.forEach(element => {
        var old = $("ul").html();
        $("ul").html(old + " " + genreLi.replace("GENRE_HERE", element.name));
    });

    movie.spoken_languages.forEach(element => {
        var old = $("ul").html();
        $("ul").html(old + " " + genreLi.replace("GENRE_HERE", element.english_name));
    });

});