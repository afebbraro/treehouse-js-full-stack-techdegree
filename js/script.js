var quotes = [
        {
            quote: 'It\'s not the losing that defines us. It\'s how we lose. It\'s what we do afterward.',
            source: 'Scott Jurek',
            citation: 'Eat and Run: My Unlikely Journey to Ultramarathon Greatness',
            year: 2013,
            tags: 'Running'
        },
        {
            quote: 'Running efficiently demands good technique, and running efficiently for 100 miles demands great technique.',
            source: 'Scott Jurek',
            citation: 'Eat and Run: My Unlikely Journey to Ultramarathon Greatness',
            year: 2013,
            tags: 'Running'
        },
        {
            quote: 'You never know how strong you are until being strong is the only choice you have.',
            source: 'Scott Jurek',
            citation: 'Eat and Run: My Unlikely Journey to Ultramarathon Greatness',
            year: 2013,
            tags: 'Running'
        }
    ];

// returns a random quote
function getRandomQuote() {
    // random number btw 0 and the # of items in the quotes array
    var ranNum = Math.floor(Math.random() * quotes.length);

    return quotes[ranNum];
}

// build basic string with the quote and the quote's source
function buildQuoteStr(q) {
    var html = '<p class="quote">' + q.quote + '</p>' + '<p class="source">' + q.source;

    // determine if the quote has a citation and/or a year
    if (!q.citation && !q.year) {
        html += '</p>';
    } else if (q.citation && !q.year) {
        html += '<span class="source__citation">' + q.citation + '</span>' + '</p>';
    } else if (!q.citation && q.year) {
        html += '<span class="source__year">' + q.year + '</span>' + '</p>';
    } else {
        html += '<span class="source__citation">' + q.citation + '</span>' + '<span class="source__year">' + q.year + '</span>' + '</p>';
    }

    return html;
}

function changeBgColor() {
    var containerClass = document.getElementById('container');

    // containerClass.setAttribute("class", "container--bg-secondary");

    if (containerClass.className === 'container') {
        containerClass.setAttribute("class", "container container--bg-secondary");
    } else {
        containerClass.setAttribute("class", "container");
    }
}

// prints html out into the js-quote-box
function printQuote(html) {
    document.getElementById('js-quote-box').innerHTML = html;
}

// display the quoute and change the bg color to a preferred color with good contrast ratio with the white text
function displayQuote() {
    printQuote(buildQuoteStr(getRandomQuote()));
    changeBgColor();
}

// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "displayQuote" function is called
document.getElementById('loadQuote').addEventListener("click", displayQuote, false);

displayQuote();
