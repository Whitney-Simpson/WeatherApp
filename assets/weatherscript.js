// Page is ready to run after html is loaded
$(document).ready(function () {
  //City Input and Search History
  var searchedCitiesArray = [];

  $("searchBtn").on("click", getSearchInput);
  $(document).on("click", ".selected", storedCities);

  //Calls Search History Btn

  searchHistory();

  //Displays recently stored Cities
  function storedCities() {
    var city = $(this)[O].innerHTML;
    //Transfers City name
    getWeather(city);
  }
  //Search Btn clicked and create input/city function
  function getSearchInput(event) {
    event.preventDefault();
    $("#previousSearches").empty();

    //Declare variable for city input
    var city = $(".form-control").val();
    //Create searched Cities Array
    searchedCitiesArray.push(city);
    //Create string of searched cities
    localStorage.setItem("cities", JSON.stringify(searchedCitiesArray));

    //Display new searched cities
    var searchHistoryList = $("<div>").text(city).addClass("selected");
    $("#searchHistory").append(searchHistoryList);

    //Clears the search bar
    $("#searchInput").val("");

    //Event for ajax call to get Weather API function

    getWeather(city);
  }

  //Function that displays cities searched in local storage
  function searchHistory() {
    //Convert string into JSON Object
    searchedCitiesArray = JSON.parse(localStorage.getItem("cities"));
    //Use if else statements and for loop to initialize searchedCitiesArray
    if (searchedCitiesArray === null) {
      searchedCitiesArray = [];
    }

    for (var i = 0; i < searchedCitiesArray.length; i++) {
      var displaySearchedCities = searchedCitiesArray[i];

      //Display searched history and store in local storage

      var searchedHistoryList = $("<div>")
        .text(displaySearchedCities)
        .addClass("selected");
      $("#searchHistory").append(searchHistoryList);
    }
  }

  //Weather API Call
  var apiKey = "6f20bf793d6b0fd27bc57a9f74fffa7e";

  //Current weather function

  function getWeather(city) {
    var weatherQueryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    $.ajax({
      url: weatherQueryUrl,
      method: "GET",
      dataType: "jsonp",
      success: function (response) {
        console.log(weatherQueryUrl);
        console.log(response);

        //Retrieve data
        function date_format(dt_string) {
          var date = new Date(dt_string * 1000);
          return date.toDateString();
        }

        //Convert to farenheit
        function temp_trans(input) {
            var temp = "Temperature:" + ((input.main.temp-273.15) *1.80 +32).toFixed(2)+"F";
            return temp;

        }
        //Clears divs to get rid of previous searches
        $("previousSearches").empty();

        var holder = response.list(O);

        $(".currentCity").html("<h3>") + response.city.name + " " + date_format(holder) + ("</h3>").append (
            $('<img src ="' + "https://openweathermap.org/img/wn/"+response.list[O].icon+ "@2px.png" + '"/>'));
            $(".humidity").text("Humidity:" + holder.main.humudity + "%");
            $(".windSpeed").text("Wind Speed:" + holder.wind.speed + "mph");
            $(".temperature").text(temp_trans(holder));

            getUVindex(response.city.coord.lat, response.city.coord.lon);

            for( i=1; 1<5; i++) {
                holder = response.list[(i*8)-1];
                $("#" + i +"dayForecast").text(date_format(holder));
                $("#" + i + "dayicon").empty().append($('<img scr="'+"https://openweathermap.org/img/wn/" + holder.weather[O].icon + "png" + '" />'));
                $("#" + i + "dayHumidity").text("Humidity:" + holder.main.humidity + "%");
                $("#" + i + "dayTemperature").text(temp_trans(holder));
            }
      }
    });
function getUVindex(lat,lon) {
    var weatherQueryUrl = "https://api.openweathermap.org/data/2.5/onecall?" + "&lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
    $.ajax({
        url:weatherQueryUrl,
        method: "GET",
    });

    // (function(responseUV){
    //     console.log(responseUV.current.uvi)
    //     var uvindex = responseUV.current.uvi;
    //     $("#uvindex").text("UV index:" + uvindex);

        // if (uvindex <= 2.99) {
        //     uvindex = $("#uvindex").css(("background-color": "olivedrab", "disply":"block","border-radius": "12px", "padding": "1.5%", "max-width": "20%"));
        // } else if {
        //     uvindex = $("#uvindex").css(("background-color": "blue", "disply":"block","border-radius": "12px", "padding": "1.5%", "max-width": "20%"));
        // } else {
        //     uvindex = $("#uvindex").css(("background-color": "green", "disply":"block","border-radius": "12px", "padding": "1.5%", "max-width": "20%"));
//         // };
//     });
// }
}
getWeather();

}
  