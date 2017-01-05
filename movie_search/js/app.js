// Use OMDb's 'By Search' parameters to return movie data based on the value of the search field
// Display search results on the page
// The data should load inside the #movies <ul>
// Please see the comments in index.html for samples of the HTML you'll need to dynamically create with JavaScript
// For each movie returned, render an <li> displaying these items inside:
// Movie title
// Year of release
// Movie poster image
// Render an <img> that displays a poster image via the src attribute
// Make sure you use the exact class names provided in the CSS
// Display a placeholder icon when the API does not return poster data
// The app should not display broken images when no poster image data is returned
// If the "Poster" parameter returns "N/A", render the placeholder icon shown in the index.html comments
// Let users know when search returns no movie data
// If the search returns no movie data, display the text "No movies found that match: 'title'."
// See a sample of the code you'll need to display in the index.html comments


// #movies <ul>
// id="search"
// id="js-no-movies" Display this <li> if the search form returns no movie data
// id="js-poster-placeholder" Display this placeholder icon if movie returns no movie poster. this icon should replace '<img class="movie-poster" src="">'.

// Shorthand for $( document ).ready()
$(function() {
    var movieList = $('#movies'),
        searchVal = $('#search'),
        noMoviesList = $('#js-no-movies'),
        posterPlaceholder = $('#js-poster-placeholder'),
        imdbURL = 'http://www.omdbapi.com/?',
        options = {
            s: 'cats',
            y: 2015,
            type: 'movie'
        };

    // Request data from the OMDb API to display movie information
    // The data will return in JSON format by imbd's default setting
    function getJSON() {
        $.getJSON(imdbURL, options, displayResults)
        .fail(function() {
            console.log('error');
        });
    }

    //   <li>
    //     <div class="poster-wrap">
    //       <img class="movie-poster" src="http://ia.media-imdb.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_SX300.jpg">
    //     </div>
    //     <span class="movie-title">Batman</span>
    //     <span class="movie-year">1989</span>
    //   </li>
    function displayResults(data) {


        $.each(data.Search, function( i, item ) {
            var results = '<li>',
                itemPoster = item.Poster;

            // Check if there is a poster available
            if (item.Poster === 'N/A') {
                itemPoster = '<i class="material-icons poster-placeholder" id="js-poster-placeholder">crop_original</i>';
            }

            results += '<div class="poster-wrap">' +
                       '<img class="movie-poster" src="'+ itemPoster +'">' +
                       '</div>' + '<span class="movie-title">' + item.Title +
                       '</span>' + '<span class="movie-year">' + item.Year + '</span>';


            results += '</li>';

            movieList.append(results);
        });

    }

    getJSON();
});
