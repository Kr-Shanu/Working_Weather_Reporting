// Using time from the system.
let today = new Date();
let hours = today.getHours();
let frame = "AM";
if(hours > 12)
{
    hours = hours-12;
    frame = "PM";
}
let time = hours + ":" + today.getMinutes() + ":" + today.getSeconds()+ " "+frame;


const express = require("express");

const bodyParser = require("body-parser");

const http = require("https");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

// This is done to make the public folder as static to contains css and images files
app.use(express.static("public"));


app.get("/", function (req, res) {
    console.log("Process initiated!!");
    res.sendFile(__dirname + "/index.html");
});



app.post("/", function (request, res) {

    city = request.body.cityName;

    // metric units give us the value in degree celcius!!

    const unit = "metric";
    // Api key is required for authentication


    const apiKey = "" // ☠️☠️❌❌❌ here you need to enter your api key from open weather api to make it run ❌❌❌

 

    // This url is the url for the open weather api without the other attributes
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + unit;


    // Now we will fetch the api using the https modules, we could have done this using.
    // Getting information using https get  function using the above url.
    http.get(url, function (response) 
    {
        let status = response.statusCode;
        console.log("Status code :"+ status);
        if(status === 200)
        {
            console.log("Https is working");

            response.on("data", function (data) 
            {
                const city_name = city.substring(0,1).toUpperCase() + city.substring(1,).toLowerCase();
                const weather = JSON.parse(data);
                const temperature = weather.main.temp;
                const wind = Math.floor((weather.wind.speed)*3.60);
                const description = weather.weather[0].description;
                const imgIcon = weather.weather[0].icon;
                const imageUrl = "http://openweathermap.org/img/w/"+imgIcon+".png";
                res.render("show_weather", {dc : temperature, speed : wind, cities: city_name,desc: description, icon: imageUrl});
            })
            console.log("Process finished!!!"); 
        }else{
            res.sendFile(__dirname+"/failure.html");
        }          
    });
});


app.get("/failure", function(req, res)
{
    res.sendFile(__dirname+"/failure.html");
});


app.post("/success", function(req, res)
{
    res.redirect("/");
});

app.post("/failure", function(req, res)
{
    res.redirect("/");
});


app.listen(3000, function () {
    console.log("Application is running at port 3000 at time : "+time);
});
