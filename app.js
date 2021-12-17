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


app.post("/", function (request, res) {
    const placeName = request.body.cityName;
    // metric units give us the value in degree celcius!!
    const unit = "metric";
    // Api key is required for authentication
    const apiKey = "6615d06477e51d724c56a4bb0256b5c3"
    // This url is the url for the open weather api without the other attributes
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + placeName + "&appid=" + apiKey + "&units=" + unit;

    // Now we will fetch the api using the https modules, we could have done this using 
    // request also but it is expiring soon.

    http.get(url, function (response) 
    {
        console.log("Https is working");

        response.on("data", function (data) 
        {
            const weather = JSON.parse(data);
            const temperature = weather.main.temp;
            const wind = weather.wind.speed;
            // const imgIcon = weather.weather[0].icon;
            const description = weather.weather[0].description;
            res.write("The place entered by you is :" + placeName);
            res.write("Wind = " + wind);
            res.write("temperature = " + temperature);
            res.write("Description : " + description);
            res.send();
            // const imageUrl = "http://openweathermap.org/img/w/"+imgIcon+".png";
        })
        console.log("Process finished!!!");

    });
    console.log(placeName);

});




app.listen(3000, function () {
    console.log("Application is running at port 3000");
});