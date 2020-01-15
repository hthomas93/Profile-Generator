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

inquirer
    .prompt([{
        type: "input",
        message: "What is your Github username?",
        name: "username"
    },
    {
        type: "checkbox",
        message: "What is your favorite color?",
        choices: [
            "Green",
            "Blue",
            "Pink",
            "Red"
        ],
        name: "color"

    }])
    .then(function (response) {
        const ghUser = response.username.split(" ").join(" ") + '.json'

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
            // console.log(response.data);


            let profileImage = (response.data.avatar_url + ".png");
            let userName = (response.data.login);
            let userLocation = (response.data.location);
            let ghProfile = (response.data.html_url);
            let userBlog = (response.data.blog);
            let userBio = (response.data.bio);
            let repoNum = (response.data.public_repos);
            let followerNum = (response.data.followers);
            let followingNum = (response.data.following);
            // let userGHStars =  Create another axios call for - ;

        });
};

function ghStarAPI(ghStarURL) {

    axios.get(ghStarURL)
        .then(function (responseStars) {
            console.log(responseStars.data.length);
        });
};