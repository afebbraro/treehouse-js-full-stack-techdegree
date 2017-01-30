'use strict';

var fs = require('fs');
var json2csv = require('json2csv');
const scrapeIt = require('scrape-it/lib/index.js');
var baseURL = 'http://shirts4mike.com/';

function getDate() {
    var date = new Date(),
        year,
        month,
        day;

    // 2017-01-30
    year = date.getFullYear();
    month = '-' + date.getMonth() + 1;
    day = '-' + date.getDate();

    date = year + month + day;
    return date;
}

// Check for a folder called ‘data’.
if (!fs.existsSync('data/')) {
    // If the folder doesn’t exist, create one.
    fs.mkdirSync('data');
}

scrapeIt(baseURL + 'shirts.php', {
    // Scrape the products for urls
    tshirts: {
        listItem: '.products li',
        data: {
             url: {
                   selector: 'a',
                   attr: 'href'
               }
        }
    }
}, (err, page) => {
    if (err) {
        console.log("There’s been a 404 error. Cannot connect to" + baseURL);
    }

    var tshirtURL,
        data = [];

    // Loop through all the tshirt list items
    for (var i = 0; i < page.tshirts.length; i++) {
        // Get each tshirt url
        tshirtURL = page.tshirts[i].url;

        // Create full url
        tshirtURL = baseURL + tshirtURL;

        // Scrape content from each individual tshirt page
        scrapeIt(tshirtURL, {
                price: '.price',
                title: '.shirt-details h1',
                img: {
                    selector: '.shirt-picture img',
                    attr: 'src'
                }
        }, (error, tshirtPage) => {
            console.log(tshirtURL);

            // Prepend the original url
            tshirtPage.img = baseURL + tshirtPage.img;

            // Remove all numbers and $ from title
            tshirtPage.title = tshirtPage.title.replace(/^[0-9+$]+/g, '');

            // Remove extra whitespace from title
            tshirtPage.title = tshirtPage.title.trim();

            // They should be in this order: Title, Price, ImageURL, URL, and Time
            data.push(
                {Title: tshirtPage.title, Price: tshirtPage.price, ImageURL: tshirtPage.img, URL: tshirtURL, Time: 'this is time'}
            );

            //TODO: figure out why tshirtURL is php?id=108 for every shirt, and get the time

            // Check if all 8 shirt objects were added to the array
            if (Object.keys(data).length === 8) {
                var fields = ['Title', 'Price', 'ImageURL', 'URL', 'Time'];

                var csv = json2csv({ data: data, fields: fields });

                // Create the CSV file inside the data dir using the current date
                fs.writeFile('data/' + getDate() + '.csv', csv, function(err) {
                  if (err) throw err;
                  console.log('Woohoo! File saved!');
                });
            }
        });
    }
});
