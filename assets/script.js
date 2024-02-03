const apiKey = "6f20bf793d6b0fd27bc57a9f74fffa7e";
var currentDay = dayjs()
console.log(currentDay)
function GetWeather() {
  const newName = document.getElementById("cityInput");
  const city = document.getElementById("cityName");
  const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  // cityName.innerHTML = "--" + newName.value + "--";

  fetch(weatherUrl)
  .then(function (response) {
    return response.json();
    //corey
  // })
  // fetch(weatherUrl)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     var forecastArray = [];
  //     console.log(data);
  //     for (var i = 0; i < data.list.length; i++) {
  //       var time = data.list[i].dt_txt.split(" ").pop();
  //       if (time === "12:00:00") {
  //         forecastArray.push(data.list[i]);
  //       }
  //     }
  //     console.log(forecastArray);
  //     for (var i = 0; i < forecastArray.length; i++) {
  //       var weatherCard = $("<div>").addClass("card");
  //       var dayEl = $("<h3>").text(dayjs(d))(forecastArray[i].dt)
  //       console.log(dayEl)
  //       var icon = $("<img>").attr(
  //         "src",
  //         "https://openweathermap.org/img/wn/" +
  //           forecastArray[i].weather[0].icon +
  //           ".png"
  //       );
  //       $("#iconsContainer").append(weatherCard.append(icon));
  //     }

      //video I watched
      // for(i=0;i<6;i++) {
      //     document.getElementById("day" +(i+1)+ "Min").innerHTML ="Min:" +Number(data.list[i].main.temp_min)
      // }
      // for(i=0;i<6;i++) {
      // document.getElementById("day" +(i+1)+ "Max").innerHTML ="Max:" +Number(data.list[i].main.temp_max
      // }
      // for(i=0;i<6;i++) {
      //     document.getElementById("img" +(i+1)).src="https://openweathermap.org/img/wn/" +data.list[i].weather[0].icon+".png";
      // }

      // for(i=0;i<6;i++) {
      //     document.getElementById("day" +(i+1)+ "Humidity").innerHTML = "Humidity:" +Number(data.list[i].main.humidity)
      // }
      // for(i=0;i<6;i++) {
      //     document.getElementById("day" +(i+1)+ "WindSpeed" ).innerHTML = "WindSpeed:" +Number(data.list[i].wind.speed)
      // }
    })

    .catch((err) => alert("Something Went Wrong :/"));
}

// function DefaultScreen() {
//   document.getElementById("cityInput").defaultValue = "Bellaire";
//   GetWeather();
// }

// const d = new Date();
// const weekday = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];

// function checkDay(day) {
//   if (day + d.getDay() > 6) {
//     return day + d.getDay() - 7;
//   } else {
//     return day + d.getDay();
//   }
// }

// for (i = 0; i < 5; i++) {
//   document.getElementById("day" + (i + 1)).innerHTML = weekday[checkDay(i)];
// }
