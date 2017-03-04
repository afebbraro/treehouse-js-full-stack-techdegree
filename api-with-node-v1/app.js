'use strict';

var express = require('express'),
    app = express(),
    Twit = require('twit'),
    path = require('path'),
    config = require('./static/js/config.js'),
    moment = require('moment');

var ob = {
    myProfileInfo: null,
    myTweets: [],
    myFriends: [],
    myMessages: []
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
    ob['myProfileInfo'] = {
        myScreenName: myUserData[0].screen_name,
        myProfileImg: myUserData[0].profile_image_url_https,
        myRealName: myUserData[0].name
    };
});

//
// Get your 5 most recent private messages
//
T.get('direct_messages', {
    count: 5
},  function (err, data, response) {
    // Iterate through the messages array to get the five messages
    for (var i = 0; i < data.length; i++) {
        ob['myMessages'].push({
            messageSenderBody: data[i].text, // Message body
            messageSenderSentDate: moment(data[i].created_at).format('MMMM Do YYYY, h:mm:ss a'), // Time Sent TODO: pull out time
            messageSender: ' ' + data[i].sender_screen_name, // Sender
            messageSenderProfileImg: data[i].sender.profile_image_url
        });
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
        ob['myTweets'].push({
            myTweetText: data[i].text, // Message content
            myTweetRetweetCount: data[i].retweet_count, // # of retweets
            myTweetSentAt: data[i].created_at, // Date tweeted
            myTweetNumOfLikes: data[i].favorite_count // # of likes
        });
    }
});

//
// Get your 5 most recent friends
//
T.get('friends/ids', {
    count: 5 // Specify # we want
},  function (err, data, response) {
    if (err) {
        console.log(err);
        return;
    }
    // Callback func
    // Iterate through the ids array five times to get all ids
    for (var i = 0; i < data.ids.length; i++) {
        // Pass the five ids along to lookup user info for each one
        T.get('users/lookup', {
            count: 5,
            user_id: data.ids[i] // Lookup users 0 - 4
        },  function (err, userData, response) {
            // Loop through the 5 sets of user data 5 times
            for (var i = 0; i < userData.length; i++) {
                ob['myFriends'].push({
                    // Screen name from each user
                    myFriendsScreenName: userData[i].screen_name,
                    // Real name from each user
                    myFriendsName: userData[i].name,
                    // Profile image from eash user
                    myFriendsProfileImg: userData[i].profile_background_image_url_https,

                    myFriendsFollowingStatus: userData[i].following
                });
            }
        });
    }
});

// // EXTRA CREDIT
// // Add a section to the bottom of your page that allows a user to post a new tweet.
// // Add an error page to your application, so that if anything goes wrong with your routes, the user will see a friendly message rendered, instead of the default error code.
// // Include your personal background image from Twitter as a background for the page header.
