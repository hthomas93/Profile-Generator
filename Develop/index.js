// requires the use of the file system to make changes to the pdf
const fs = require("fs");
// requires the use of the axios node package for ajax requests
const axios = require("axios").default;
// requires the use of inquirer node package for user input
const inquirer = require("inquirer");

// Profile image
let profileImage;
// User name
let userName;
// Links to the following:
// User location via Google Maps
let userLocation;
// User GitHub profile
let ghProfile;
// User blog
let userBlog;
// User bio
let userBio;
// Number of public repositories
let repoNum;
// Number of followers
let followerNum;
// Number of GitHub stars
let ghStars
// Number of users following
let followingNum;

// call the inquirer node module
inquirer
    // call the prompt method
    .prompt([{
        // type of prompt (text input)
        type: "input",
        // displayed prompt message
        message: "What is your Github username?",
        // what the name of the response is
        name: "username"
    },
    {
        // type of prompt (checkbox)
        type: "checkbox",
        // displayed prompt message
        message: "What is your favorite color?",
        // checkbox choices
        choices: [
            "Green",
            "Blue",
            "Pink",
            "Red"
        ],
        // what the name of the response is
        name: "color"

    }])
    // asynchronous, what to do after receiving a response
    .then(function (response) {
        // sets ghUser constant to the username response, formatted
        const ghUser = response.username.split(" ").join(" ") + '.json'

        // brings in the fs module to write ghUser info to the file
        fs.writeFile(
            ghUser, JSON.stringify(response, null, '\t'), function (err) {
                if (err) {
                    console.log(err);
                }

                console.log("File saved!");

                //==============================================
                // Sets up URL for main GH API Call
                //==============================================
                const ghURL = "https://api.github.com/users/" + response.username;
                console.log(ghURL);
                //==============================================
                // Sets up URL for starred GH API Call
                //==============================================
                const ghStarURL = "https://api.github.com/users/" + response.username + "/starred";
                console.log(ghStarURL);
                //==============================================
                // Put URL in function
                //==============================================
                ghAPI(ghURL);
                ghStarAPI(ghStarURL);

            });
    });


function ghAPI(ghURL) {

    axios.get(ghURL)
        .then(function (response) {
            console.log(response.data);


            profileImage = (response.data.avatar_url + ".png");
            userName = (response.data.login);
            userLocation = (response.data.location);
            ghProfile = (response.data.html_url);
            userBlog = (response.data.blog);
            userBio = (response.data.bio);
            repoNum = (response.data.public_repos);
            followerNum = (response.data.followers);
            followingNum = (response.data.following);
        });
};

function ghStarAPI(ghStarURL) {

    axios.get(ghStarURL)
        .then(function (responseStars) {
            console.log(responseStars.data.length);
        });
};