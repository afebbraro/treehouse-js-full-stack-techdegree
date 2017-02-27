'use strict';

var express = require('express'),
    app = express(),
    Twit = require('twit'),
    path = require('path'),
    config = require('./static/js/config.js');

var ob = {
    "cats": 123
};

// Set express to serve static files
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'static')));
app.set('views', __dirname + '/templates');


// Create route
app.get('/', function(req, res){
    res.render('index', {ob:ob});
});

// Setup dev server
app.listen(3000, function() {
    console.log('App is up on port 3000');
});

var T = new Twit({
    consumer_key:        config.consumer_key,
    consumer_secret:     config.consumer_secret,
    access_token:        config.access_token,
    access_token_secret: config.access_token_secret,
    timeout_ms:          600*1000,  // optional HTTP request timeout to apply to all requests.
});

//
// Get your personal Twitter name and profile image
//
T.get('users/lookup', {
    screen_name: 'afebbraro'
},  function (err, myUserData, response) {
    ob.myScreenName = myUserData[0].screen_name;
    ob.myProfileImg = myUserData[0].profile_image_url_https;
    ob.myRealName = myUserData[0].name;
});

//
// Get your 5 most recent private messages
//
T.get('direct_messages', {
    count: 5
},  function (err, data, response) {
    // Iterate through the messages array to get the five messages
    for (var i = 0; i < data.length; i++) {
        console.log(data[i].text); // Message body
        console.log(data[i].created_at); // Date Sent TODO: pull out date
        console.log(data[i].created_at); // Time Sent TODO: pull out time
        console.log(data[i].sender_screen_name); // Sender

    }
});

//
// Get your 5 most recent tweets
//
T.get('statuses/user_timeline', {
    screen_name: 'afebbraro',
    count: 5
},  function (err, data, response) {
    for (var i = 0; i < data.length; i++) {
        ob.myTweetText = data[i].text; // Message content
        ob.myTweetRetweetCount = data[i].retweet_count; // # of retweets
        ob.myTweetSentAt = data[i].created_at; // Date tweeted
        ob.myTweetNumOfLikes = data[i].favorite_count; // # of likes
    }
});

//
// Get your 5 most recent friends
//
T.get('friends/ids', {
    count: 5 // Specify # we want
},  function (err, data, response) {
    // Iterate through the ids array to get the five ids
    for (var i = 0; i < data.ids.length; i++) {
        // Pass the five ids along to lookup user info for each one
        T.get('users/lookup', {
            count: 5,
            user_id: data.ids[i]
        },  function (err, userData, response) {
            for (var i = 0; i < userData.length; i++) {
                // Screen name
                ob.myFriendsScreenName = userData[i].screen_name;

                // Real name
                ob.myFriendsName = userData[i].name;

                // Profile image
                ob.myFriendsProfileImg = userData[i].profile_background_image_url_https;
            }
        });
    }
});

// // EXTRA CREDIT
// // Add a section to the bottom of your page that allows a user to post a new tweet.
// // Add an error page to your application, so that if anything goes wrong with your routes, the user will see a friendly message rendered, instead of the default error code.
// // Include your personal background image from Twitter as a background for the page header.
