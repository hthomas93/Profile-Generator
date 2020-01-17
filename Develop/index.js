// requires the use of the file system to make changes to the pdf
const fs = require("fs");
// requires the use of the axios node package for ajax requests
const axios = require("axios").default;
// requires the use of inquirer node package for user input
const inquirer = require("inquirer");

const generate = require("./generateHTML.js");
let color;
let ghStars;

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
        // type of prompt (list)
        type: "list",
        // displayed prompt message
        message: "What is your favorite color?",
        // checkbox choices
        choices: Object.keys(generate.colors),
        // what the name of the response is
        name: "color"
    }])
    // asynchronous, what to do after receiving a response
    .then(function (response) {
        // sets ghUser constant to the username response, formatted
        const ghUser = response.username.split(" ").join(" ") + '.json'
        color = response.color;
        console.log(color);
        // brings in the fs module to write ghUser info to the file named the value of ghUser
        fs.writeFile(
            ghUser, JSON.stringify(response, null, '\t'), function (err) {
                if (err) {
                    console.log(err);
                }

                console.log("File saved!");
                const ghURL = "https://api.github.com/users/" + response.username;
                console.log(ghURL);
                const ghStarURL = "https://api.github.com/users/" + response.username + "/starred";
                console.log(ghStarURL);
                ghAPI(ghURL);
                ghStarAPI(ghStarURL);

            });
    });


function ghAPI(ghURL) {

    axios.get(ghURL)
        .then(function (response) {
            console.log(response.data);
            let data = {
                color: color,
                profileImage: response.data.avatar_url + ".png",
                userName: response.data.login,
                ghProfile: response.data.html_url,
                repoNum: response.data.public_repos,
                followerNum: response.data.followers,
                followingNum: response.data.following
            }

            if (!response.data.location) {
                data.userLocation = "https://www.google.com/maps";
            } else {
                data.userLocation = "https://www.google.com/maps/place/" + response.data.location.replace(/\s/g, "+")
            };

            if (response.userBlog == '') {
                data.userBlog = "No blog information provided!";
            } else {
                data.userBlog = response.data.blog
            };

            if (!response.userBio) {
                data.userBio = "No bio information provided!";
            } else {
                userBio = response.data.bio
            };

            const html = generate.generateHTML(data, ghStars);
            fs.writeFile(`${data.userName}.html`, html, function (err) {
                if (err) {
                    console.log("It's borked!" + err);
                }
            })
        })
};

function ghStarAPI(ghStarURL) {

    axios.get(ghStarURL)
        .then(function (responseStars) {
            ghStars = responseStars.data.length;
            console.log(ghStars);
        });
};

