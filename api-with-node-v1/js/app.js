'use strict';

var express = require('express'),
    app = express();

// Create route
app.get('/', function(req, res){
    res.send('Express is serving up!');
});

// Setup dev serverapp.listen(3000, function() {
    console.log('App is up on port 3000');
});


// You will need to create the following files:
// The following files are provided:
// An app.js file where you will set up your Express app and write your API calls
// Create a new Twitter application.
// This will generate the keys and access tokens you need to
// authenticate your application so it can communicate with the
// Twitter API. You can find a link to a tutorial on how to do this in the
// project resources. Please note that while the tutorial says to create a
// Twitter dev account at dev.twitter.com, the url to create a Twitter dev account is now https://apps.twitter.com/
// To use and interact with the Twitter API, you’ll need to set up a way to give
// the Twitter API the set of keys and access tokens that were generated when you
// create your Twitter app. It’s a good idea to use an npm module to help you with
// this part. For this project, you’ll use an npm module called Twit. You can find a
// link in the project resources. Be sure to look through the documentation and
// familiarize yourself with how it works.



// Using Node and Express, request the data you need from Twitter’s
// API, render it in your template, and send it to the client at the “/”
// route. Please avoid using Express generator to set up this project.
// It will be good practice to set up a simple Express app yourself!
// Each rendered result must include all of the information seen in the sample layout:
// *tweets -message content -# of retweets -# of likes -date tweeted
// *friends -profile image -real name -screenname
// *messages -message body -date the message was sent -time the message was sent
// Note that you don’t have to display direct messages as a back and forth
// conversation. You only need to display the last 5 messages that were received,
// or the last 5 messages that were sent.
// Make sure the application actually renders your correct Twitter information
// by running it on your local machine and comparing it to your recent Twitter activity.

// EXTRA CREDIT
// Add a section to the bottom of your page that allows a user to post a new tweet.
// Add an error page to your application, so that if anything goes wrong with your routes, the user will see a friendly message rendered, instead of the default error code.
// Include your personal background image from Twitter as a background for the page header.
