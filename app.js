
// Using time from the system.
var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();


const express = require("express");

const bodyParser = require("body-parser");

const http = require("https");


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// This is done to make the public folder as static to contains css and images files
app.use(express.static("public"));


app.get("/", function (req, res) {
    console.log("Process initiated!!");
    res.sendFile(__dirname + "/index.html");
});


// Defining all the variable to change the html elements
var city = "bhagalpur";
var temperature = "0 degree Centigrade";
var wind = "0 ";
var description = "Windy!"



app.post("/", function (request, res) {

    city = request.body.cityName;

    // metric units give us the value in degree celcius!!

    const unit = "metric";
    // Api key is required for authentication

    const apiKey = "6615d06477e51d724c56a4bb0256b5c3"

    // This url is the url for the open weather api without the other attributes
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + unit;


    // Now we will fetch the api using the https modules, we could have done this using.
    // Getting information using https get  function using the above url.
    http.get(url, function (response) 
    {
        console.log("Https is working");

        response.on("data", function (data) 
        {
            const weather = JSON.parse(data);
            temperature = weather.main.temp;
            wind = weather.wind.speed;
            // const imgIcon = weather.weather[0].icon;
            description = weather.weather[0].description;
            
            // const imageUrl = "http://openweathermap.org/img/w/"+imgIcon+".png";
        })
        console.log("Process finished!!!");
        res.write("The place entered by you is :" + city);
        res.write("Wind = " + wind);
        res.write("temperature = " + temperature);
        res.write("Description : " + description);
        res.send();
        // res.sendFile(__dirname+"/success.html");

    });
    console.log(city);

});


app.get("/success", function(req, res)
{
    res.sendFile(__dirname+"/success.html");
});



app.post("/success", function(req, res)
{
    res.redirect("/");
});

app.listen(3000, function () {
    console.log("Application is running at port 3000 at time : "+time);
});