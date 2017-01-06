// Shorthand for $( document ).ready()
$(function() {
    var movieList = $('#movies'),
        searchField = $('#search'),
        yearField = $('#year'),
        searchBtn = $('#submit'),
        searchDesc = $('#js-search-desc'),
        posterPlaceholder = $('#js-poster-placeholder'),
        imdbURL = 'http://www.omdbapi.com/?';

    // Request data from the OMDb API to display movie information
    // The data will return in JSON format by imbd's default setting
    function getMovieData(options) {
        $.getJSON(imdbURL, options, displayResults)
        .fail(function() {
            // If the search fails
            movieList.append('<li class="desc"><i class="material-icons icn-movie">movie</i>Sorry, the search failed. Please try again.</li>');
        });
    }

    searchBtn.on('click', function(e) {
        e.preventDefault();

        var searchVal = searchField.val();
        var yearVal = yearField.val();

        // Check if there's search terms
        if(searchVal) {
            var options = {
                s: searchVal,
                y: yearVal,
                type: 'movie'
            };

            // Hide the standard search msg
            searchDesc.hide();

            getMovieData(options);
        } else if (searchVal === '') {
            movieList.empty();
            // Show the placeholder search info if search is submitted empty
            movieList.append('<li class="desc" id="js-search-desc"><i class="material-icons icn-movie">movie</i>Search movie titles and TV shows</li>');
        }
    });

    function displayResults(data) {
        // Clear out the list
        movieList.empty();

        if (data.Error === 'Movie not found!') {
            movieList.append('<li class="no-movies"><i class="material-icons icon-help">help_outline</i>No movies found that match: ' + searchField.val() + '.</li>');
        } else {
            $.each(data.Search, function( i, item ) {
                var results = '<li><a href="http://www.imdb.com/title/'+ item.imdbID +'/">',
                    itemPoster = '<img class="movie-poster" src="'+ item.Poster +'">';

                // Check if there is a poster available
                if (item.Poster === 'N/A') {
                    itemPoster = '<i class="material-icons poster-placeholder" id="js-poster-placeholder">crop_original</i>';
                }

                results += '<div class="poster-wrap">' + itemPoster +
                           '</div>' + '<span class="movie-title">' + item.Title +
                           '</span>' + '<span class="movie-year">' + item.Year + '</span>';

                results += '</li></a>';

                // Add movies to movie list
                movieList.append(results);
            });
        }
    }
});
