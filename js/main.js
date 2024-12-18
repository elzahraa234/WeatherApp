async function getWeather(place = "Cairo"){
    try{
        var res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=6c820455de9445419c4195630241012&q=${place}&days=3`);
        var data = await res.json();
        console.log(data);
        displayData(data.location , data.current);
        // console.log(data.current);
        displayNext(data.forecast.forecastday);
        displaythird(data.forecast.forecastday);
    }
    catch(err){
        console.log(err);
    }
    
}

getWeather();

var searchInput = document.getElementById("search");
searchInput.addEventListener("keyup", (place) => {
    getWeather(place.target.value);
});

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function displayData(place,data){
    var cartoona="";
    var dateUpdated = new Date(data.last_updated); 
        cartoona += `<div class="today forecast">
    <div class="forecast-header d-flex justify-content-between" id="today">
        <div class="day">${days[dateUpdated.getDay()]}</div>
        <div class="date">${dateUpdated.getDate() + months[dateUpdated.getMonth()]}</div>
</div>
<div class="forecast-content" id="current">
    <div class="location">${place.name}</div>
    <div class="degree">
        <div class="num">${data.temp_c}<sup>o</sup>C</div>
        <div class="forecast-icon">
            <img src="https:${data.condition.icon}" alt="" width=90>
        </div>
    </div>
    <div class="custom">${data.condition.text}</div>
    <span><img src="images/icon-umberella.png" alt=""> 20%</span>
    <span><img src="images/icon-wind.png" alt=""> 18km/h</span>
    <span><img src="images/icon-compass.png" alt=""> East</span>
</div>
</div>`;

document.getElementById("currentWeather").innerHTML = cartoona;
}

function displayNext(place) {
    let data = "";
    for (let dateUpdated = 1; dateUpdated < place.length-1; dateUpdated++) {
        data += `<div class="forecast text-white">
            <div class="forecast-header">
                <div class="day">${days[new Date(place[dateUpdated].date.replace(" ", "T")).getDay()]}</div>
            </div>
            <div class="forecast-content">
                <div class="forecast-icon">
                    <img src="https:${place[dateUpdated].day.condition.icon}" alt="" width=48>
                </div>
                <div class="degree">${place[dateUpdated].day.maxtemp_c}<sup>o</sup>C</div>
                <small>${place[dateUpdated].day.mintemp_c}<sup>o</sup></small>
                <div class="custom">${place[dateUpdated].day.condition.text}</div>
            </div>
        </div>`;
    }
    document.getElementById("forecastone").innerHTML = data;
}
function displaythird(place) {
    let data = "";
    for (let dateUpdated = 2; dateUpdated < place.length; dateUpdated++) {
        data += `<div class="forecast text-white">
            <div class="forecast-header">
                <div class="day">${days[new Date(place[dateUpdated].date.replace(" ", "T")).getDay()]}</div>
            </div>
            <div class="forecast-content">
                <div class="forecast-icon">
                    <img src="https:${place[dateUpdated].day.condition.icon}" alt="" width=48>
                </div>
                <div class="degree">${place[dateUpdated].day.maxtemp_c}<sup>o</sup>C</div>
                <small>${place[dateUpdated].day.mintemp_c}<sup>o</sup></small>
                <div class="custom">${place[dateUpdated].day.condition.text}</div>
            </div>
        </div>`;
    }
    document.getElementById("forecasttwo").innerHTML = data;
}