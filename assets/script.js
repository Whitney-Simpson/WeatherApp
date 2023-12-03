
const apiKey = "6f20bf793d6b0fd27bc57a9f74fffa7e";
function GetWeather(){
    const newName= document.getElementById("cityInput");
    const cityName= document.getElementById("cityName");
    cityName.innerHTML = "--"+newName.value+"--";

fetch("https://api.openweathermap.org/data/2.5/forecast?q="+newName.value+"&units=imperial&appid=6f20bf793d6b0fd27bc57a9f74fffa7e")
.then(response => response.json())
.then(data => {
    for(i=0;i<5;i++) {
        document.getElementById("day" +(i+1)+ "Min").innerHTML ="Min:" +Number(data.list[i].main.temp_min)
    }
    for(i=0;i<5;i++) {
    document.getElementById("day" +(i+1)+ "Max").innerHTML ="Max:" +Number(data.list[i].main.temp_max)
    }
    for(i=0;i<5;i++) {
        document.getElementById("img" +(i+1)).src="https://openweathermap.org/img/wn/" +data.list[i].weather[0].icon+".png";
    }
})

.catch(err => alert("Something Went Wrong :/"))
}

function DefaultScreen(){
    document.getElementById("cityInput").defaultValue ="Bellaire";
    GetWeather();
}

const d = new Date();
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function checkDay(day){
    if(day +d.getDay() >6) {
        return day +d.getDay()-7;
    } else {
        return day +d.getDay();
    }
}

for(i=0;i<5;i++) {
    document.getElementById("day" +(i+1)).innerHTML = weekday[checkDay(i)];
}