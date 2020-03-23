require("dotenv").config();

var Spotify = require('node-spotify-api');

// //when you see a hyperlink you need to use axios

var fs = require("fs");
var axios = require("axios");

//navigates or pulls in key info
var keys = require("./keys.js");

//process.argv is the ARRAY from the terminal line input 
var command = process.argv[2]
var keyword = process.argv.slice(3).join(" ");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");



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
    var queryUrl = "http://www.omdbapi.com/?t=" + keyword + "&y=&plot=short&apikey=trilogy";

axios.get(queryUrl).then(function(response){
    console.log(response.data);

    console.log("Title: " + response.data.Title);
    console.log("Year: " + response.data.Year);
    console.log("IMDB Rating: " + response.data.imdbRating);
    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
    console.log("")
    

})

}
function doWhatItSays() {
    //set the variables and call the switch function 
    fs.readFile("./random.txt", "utf8", function(err, data){
        if (err) {
            console.log(err);
        } 
        keyword = data.split(",")[1];
        command = data.split(",")[0];
        switchCommands();
    })

}

function concertThis() {
    //if you have a hyperlink you use axios.get 
    axios.get("https://rest.bandsintown.com/artists/celine+dion/events?app_id=codingbootcamp").then(function (response) {
//response.data is the array
    var concertList = response.data;
    for (let i = 0; i < concertList.length; i++) {
        console.log("Venue: ", concertList[i].venue.name);
        console.log("Venue Location: ", concertList[i].venue.city, concertList[i].venue.country);
        console.log("Date of Event: ", moment(concertList[i].datetime, "YYYY-MM-DD").format("MM/DD/YYYY"));
        console.log("___________________________________");
    }
        // console.log(response.data);

    })
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

//omdb API call

// for (var i = 2; i < nodeArgs.length; i++) {

//     if (i > 2 && i < nodeArgs.length) {
//       movieName = movieName + "+" + nodeArgs[i];
//     } else {
//       movieName += nodeArgs[i];

//     }
//   }


