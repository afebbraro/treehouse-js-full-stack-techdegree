// Program your scraper to check for a folder called ‘data’.
// If the folder doesn’t exist, the scraper should create one.
// If the folder does exist, the scraper should do nothing.



// Choose and use two third-party npm packages.
// One package should be used to scrape content from the site. The other package should create the CSV file.
// Both packages should meet the following requirements:
// At least 1,000 downloads
// Has been updated in the last six months



// Program your scraper so that it visits the website
// http://shirts4mike.com and uses http://shirts4mike.com/shirts.php as
// single entry point to scrape information for 8 tee-shirts from the site,
// without using any hard-coded urls like http://www.shirts4mike.com/shirt.php?id=101.
// If you’re unsure of how to get started, try googling ‘node scraper’ to get a feel for what a scraper is and what it does.


// The scraper should get the price, title, url and image url from the product page and save this information into a CSV file.
// The information should be stored in an CSV file that is named for the date it was created, e.g. 2016-11-21.csv

// Assume that the the column headers in the CSV need to be in a certain order to be correctly entered into a database.
// They should be in this order: Title, Price, ImageURL, URL, and Time

// The CSV file should be saved inside the ‘data’ folder.

// If your program is run twice, it should overwrite the data in the CSV file with the updated information.


// If http://shirts4mike.com is down, an error message describing the issue should appear in the console.
// The error should be human-friendly, such as “There’s been a 404 error. Cannot connect to the to http://shirts4mike.com.”
// To test and make sure the error message displays as expected, you can disable the wifi on your computer or device.
"use strict";

const scrapeIt = require("scrape-it/lib/index.js");

// Promise interface
// scrapeIt("http://shirts4mike.com/shirts.php", {
//     title: "h1"
//   ,
// }).then(page => {
//     console.log(page);
// });

// func that takes the shirt urls and calls scrapeIt again with that url
// They should be in this order: Title, Price, ImageURL, URL, and Time

scrapeIt('http://shirts4mike.com/shirts.php', {
    tshirts: {
        listItem: '.products li',
        data: {
             url: {
                   selector: "a",
                   attr: "href"
               }
        }
    }
}, (err, page) => {
    // this is the callback func
    // console.log(err || page);
    var tshirtURL;

    for(var i = 0; i < page.tshirts.length; i++) {
        tshirtURL = page.tshirts[i].url;

        tshirtURL = 'http://www.shirts4mike.com/' + tshirtURL;

        scrapeIt(tshirtURL, {
                price: ".price",
                title: '.shirt-details h1',
                img: {
                    selector: '.shirt-picture img',
                    attr: 'src'
                }
        }, (error, tshirtPage) => {
            // Prepend the original url
            tshirtPage.img = 'http://www.shirts4mike.com/' + tshirtPage.img;

            // Remove all numbers from title
            tshirtPage.title = tshirtPage.title.replace(/^[0-9+$]+/g, '');

            // Remove extra whitespace
            tshirtPage.title = tshirtPage.title.trim();

            console.log(tshirtPage);
        });
    }
});
