const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const https = require("node:https");

// middlewares
app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

// routes
// home

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/", (req, res) => {
  var city = req.body.city;
  var url = ` https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8639566c6f9ec2da839dcd411f158ca8&units=metric`;
  https.get(url, (response) => {
    console.log(response.statusCode);
    // conditions
    if (response.statusCode === 200) {
      
      response.on("data",(response_data)=>{
          var weather_data = JSON.parse(response_data)
          var temperature = weather_data.main.temp
          var cityName = weather_data.name
          var description = weather_data.weather[0].description
          var icon = `http://openweathermap.org/img/wn/${ weather_data.weather[0].icon}@2x.png`
          console.log(weather_data)
          res.render("weather",{
              temp: temperature,
              name: cityName,
              description: description,
              icon : icon,
          })
      })
    } else {
      res.send("<h1>Enter a correct City Name </h1>")
      // res.redirect("/")
    }

   
  });
});

//

// server
app.listen("3000", () => {
  console.log("server started on port : 3000");
});
