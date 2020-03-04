require("dotenv").config();

var Spotify = require('node-spotify-api');
// //when you see a hyperlink you need to use axios
var Concert = require('bit_js');
var Movie = require('omdb');
var fs = require("fs");
var axios = require("axios");

//navigates or pulls in key info
var keys = require("./keys.js");

//process.argv is the ARRAY from the terminal line input 
var command = process.argv[2]
var keyword = process.argv.slice(3).join(" ");
var spotify = new Spotify(keys.spotify);
var concert = new Concert(keys.concert);

console.log(command, keyword);


function switchCommands() {

    if (command === "concert-this") {
        concertThis();
    }

    else if (command === "spotify-this-song") {
        if (!keyword) {
            keyword = "The Sign";
        }
        spotifyThisSong();

    }
    else if (command === "movie-this") {
        movieThis();
    }
    else if (command === "do-what-it-says") {
        doWhatItSays();
    }

}

function movieThis() {

}
function doWhatItSays() {
    //set the variables and call the switch function 
    
}

function concertThis() {
    axios.get("https://rest.bandsintown.com/artists/celine+dion/events?app_id=codingbootcamp").then(function (response) {

        console.log(response.data[0]);
    })
    concert.search({ type 'venue'.query: keyword }, function (err, response) 
) if (err) {
        retun console.log('Error occurred: ' + err);

    }

}
function spotifyThisSong() {
    //Spotify API call

    spotify.search({ type: 'track', query: keyword }, function (err, response) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        // console.log(response.tracks.items);
        //ARTISTS
        var list = response.tracks.items;
        // console.log(list[0].album.artists);
        for (let i = 0; i < list.length; i++) {
            console.log("Artist Name :", list[i].album.artists[0].name);
            console.log("Song Title :", list[i].name);
            console.log("Preview Link :", list[i].preview_url);
            console.log("Album Title :", list[i].album.name);
            console.log("________________________________________\n")
        }

    });
}

switchCommands();

// //omdb API call

// for (var i = 2; i < nodeArgs.length; i++) {

//     if (i > 2 && i < nodeArgs.length) {
//       movieName = movieName + "+" + nodeArgs[i];
//     } else {
//       movieName += nodeArgs[i];

//     }
//   }


