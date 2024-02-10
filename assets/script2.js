const apiKey = "6f20bf793d6b0fd27bc57a9f74fffa7e";
var currentDay = dayjs();
// console.log(currentDay);
let pastCities = JSON.parse(localStorage.getItem('pastCities'))||[];
function getCoords(cityName) {
  const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`;
  fetch(geoURL)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        console.log(data[i].state);
      }
      const lat = data[0].lat;
      const lon = data[0].lon;
      getWeather(lat, lon);
    });
}

function createSideMenu() {
  //get array of past city searche
  $('#pastCities').empty()
for (let i = 0; i< pastCities.length; i++) {
    let cityBtn = $('<button>').text(pastCities[i])
    .on('click', function(){
        getCoords(pastCities[i])
    })
    $('#pastCities').append(cityBtn)
}
}
createSideMenu();

function getWeather(lat, lon) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

  fetch(weatherUrl)
    .then((response) => response.json())
    .then((data) => {
        //only get the city one time vs mulitple
        if(pastCities.indexOf(data.city.name) === -1){
        pastCities.push(data.city.name)
        localStorage.setItem('pastCities', JSON.stringify(pastCities))
        }
      displayCurrent(data);
      let forecastArray = [];
      for (let i = 0; i < data.list.length; i++) {
        let time = data.list[i].dt_txt.split(" ")[1];
        if (time === "12:00:00") {
          forecastArray.push(data.list[i]);
        }
      }
      displayForcast(forecastArray);
    });
}

function displayCurrent(data) {
  document.querySelector(".card-body").innerHTML = "";
  document.querySelector(".card").classList.remove("hide");

  let cityName = data.city.name;
  let temp = data.list[0].main.temp;
  let humidity = data.list[0].main.humidity;
  let windSpeed = data.list[0].wind.speed;
  let imgIconEl = document.createElement("img");
  imgIconEl.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`
  );
  console.log(imgIconEl)
  // console.log(cityName);
  // console.log(temp);
  // console.log(humidity);
  // console.log(windSpeed);
document.getElementById("current-title").append(imgIconEl)


  document.getElementById("cityName").textContent = cityName;
  let tempEl = document.createElement("p");
  tempEl.textContent = "temperature: " + temp;
  document.querySelector(".card-body").appendChild(tempEl);
  let humidityEl = document.createElement("p");
  humidityEl.textContent = "humidity: " + humidity;
  document.querySelector(".card-body").appendChild(humidityEl);
  let windEl = document.createElement("p");
  windEl.textContent = "wind speed: " + windSpeed;
  document.querySelector(".card-body").appendChild(windEl);
}
//Using jquery 
function displayForcast(data) {
  //clears out the div after running again
  $("#forcast").empty();
  for (let i = 0; i < data.length; i++) {
    let dateDisplay = dayjs.unix(data[i].dt).format("ddd");
    console.log(dateDisplay);
    let forcastCard = $("<div>").addClass("card col-2");
    let cardBody = $("<div>").addClass("card-body");
    let cardTitle = $("<h3>").addClass("card-title").text(dateDisplay);
    let tempEl = $("<p>").addClass("card-text").text(`temperature: ${Math.round(data[i].main.temp)} ${String.fromCharCode(176)}`);
    let wind = $("<p>").addClass("card-text").text(data[i].wind.speed);
    let humidity = $("<p>").addClass("card-text").text(data[i].main.humidity);
    let imgIconEl = $("<img>").attr(
      "src",
      `https://openweathermap.org/img/wn/${data[i].weather[0].icon}.png`
    );


    $("#forcast").append(
      forcastCard.append(
        cardBody.append(cardTitle.append(imgIconEl), tempEl, wind, humidity)
      )
    );
  }

  //first code written, but was not appearing in cards correctly keeping to try and debug
  //   for (let i = 0; i < data.length; i++) {
  //     let forcastCard = document.createElement("div");
  //     forcastCard.setAttribute("class", "card col-2");
  //     let cardBody = document.createElement("div");
  //     cardBody.setAttribute("class", "forcast-body");
  //     forcastCard.append(cardBody);
  //     document.getElementById("forcast").append(forcastCard);
  //     let temp = data[i].main.temp;
  //     let humidity = data[i].main.humidity;
  //     let windSpeed = data[i].wind.speed;
  //     let tempEl = document.createElement("p");

  //     tempEl.textContent = "temperature: " + temp;
  //     document.querySelector(".forcast-body").appendChild(tempEl);
  //     let humidityEl = document.createElement("p");
  //     humidityEl.textContent = "humidity: " + humidity;
  //     document.querySelector(".forcast-body").appendChild(humidityEl);
  //     let windEl = document.createElement("p");
  //     windEl.textContent = "wind speed: " + windSpeed;
  //     document.querySelector(".forcast-body").appendChild(windEl);
  //   }
}

document.getElementById("submit").addEventListener("submit", function (event) {
  event.preventDefault();
  let cityInput = document.getElementById("cityInput").value;
  getCoords(cityInput);
  createSideMenu()
});
