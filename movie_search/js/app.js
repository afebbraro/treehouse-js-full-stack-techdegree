
// If the search returns no movie data, display the text "No movies found that match: 'title'."
// See a sample of the code you'll need to display in the index.html comments


// #movies <ul>
// id="search"
// id="js-no-movies" Display this <li> if the search form returns no movie data
// id="js-poster-placeholder" Display this placeholder icon if movie returns no movie poster. this icon should replace '<img class="movie-poster" src="">'.

// Shorthand for $( document ).ready()
$(function() {
    console.log('js work');

    var movieList = $('#movies'),
        searchField = $('#search'),
        searchBtn = $('#submit'),
        searchDesc = $('#js-search-desc'),
        noMoviesList = $('#js-no-movies'),
        posterPlaceholder = $('#js-poster-placeholder'),
        imdbURL = 'http://www.omdbapi.com/?';

    // Request data from the OMDb API to display movie information
    // The data will return in JSON format by imbd's default setting
    function getMovieData(options) {
        console.log('geting');
        $.getJSON(imdbURL, options, displayResults)
        .fail(function() {
            console.log('error');
        });
    }

    searchBtn.on('click', function(e) {
        e.preventDefault();
        var searchVal = searchField.val();
        console.log(searchVal);

        if(searchVal) {
            var options = {
                s: searchVal,
                type: 'movie'
            };
            searchDesc.hide();
            getMovieData(options);
        } else {
            console.log('empty');
        }
    });

    function displayResults(data) {
        // Clear out the list
        movieList.empty();
        console.log(data.Search);

        if (data.Search.length === 0) {
            noMoviesList.show();
        } else {
            $.each(data.Search, function( i, item ) {
                var results = '<li>',
                    itemPoster = '<img class="movie-poster" src="'+ item.Poster +'">';

                // Check if there is a poster available
                if (item.Poster === 'N/A') {
                    itemPoster = '<i class="material-icons poster-placeholder" id="js-poster-placeholder">crop_original</i>';
                }

                results += '<div class="poster-wrap">' + itemPoster +
                           '</div>' + '<span class="movie-title">' + item.Title +
                           '</span>' + '<span class="movie-year">' + item.Year + '</span>';

                results += '</li>';

                movieList.append(results);
            });
        }
    }
});
