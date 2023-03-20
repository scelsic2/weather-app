// Date
var currentDateDisplay = document.querySelector(".current-date");

var getCurrentDate = dayjs().format("MM/DD/YYYY");
console.log(getCurrentDate);

currentDateDisplay.innerHTML = getCurrentDate;

// City History
var cityHistory = document.querySelector(".list-group");
var searchButton = document.querySelector(".search-button");
var searchBox = document.querySelector(".form-control");

var searchedCity = searchBox.value;
var createHistory = cityHistory.append("li");

searchButton.addEventListener("click", function storeCity(){
    localStorage.setItem("Placeholder", searchedCity);
    console.log(searchedCity);
    console.log("banana");
    createHistory.innerHTML = searchedCity;
    cityHistory.classList.add = ("list-group-item list-group-item-info");
    
})
console.log(searchedCity);
// AM9Entry = localStorage.getItem("9AM");
// console.log(AM9Entry);
// AM9TextArea.innerHTML = AM9Entry;

// AM9Button.addEventListener("click", function saveToLocalStorage9(){
//   localStorage.setItem("9AM", AM9TextArea.value);
//   console.log(AM9TextArea.value);
// })







//JD's video
var githubURL = "https://api.github.com/users";
var starWarsURL = "https://swapi.dev/api/people";
fetch(starWarsURL).then(function (resObj){
    console.log(resObj);
    return resObj.json();
}).then(function(data){
    console.log(data);
})

//begin tutor
var openWeatherExampleResponse = {
	"cod": "200",
	"message": 0,
	"cnt": 40,
	"list": [{
			"dt": 1661871600,
			"main": {
				"temp": 96.76,
				"feels_like": 296.98,
				"temp_min": 296.76,
				"temp_max": 297.87,
				"pressure": 1015,
				"sea_level": 1015,
				"grnd_level": 933,
				"humidity": 69,
				"temp_kf": -1.11
			},
			"weather": [{
				"id": 500,
				"main": "Rain",
				"description": "light rain",
				"icon": "10d"
			}],
			"clouds": {
				"all": 100
			},
			"wind": {
				"speed": 0.62,
				"deg": 349,
				"gust": 1.18
			},
			"visibility": 10000,
			"pop": 0.32,
			"rain": {
				"3h": 0.26
			},
			"sys": {
				"pod": "d"
			},
			"dt_txt": "2022-08-30 15:00:00"
		},
		{
			"dt": 1661882400,
			"main": {
				"temp": 295.45,
				"feels_like": 295.59,
				"temp_min": 292.84,
				"temp_max": 295.45,
				"pressure": 1015,
				"sea_level": 1015,
				"grnd_level": 931,
				"humidity": 71,
				"temp_kf": 2.61
			},
			"weather": [{
				"id": 500,
				"main": "Rain",
				"description": "light rain",
				"icon": "10n"
			}],
			"clouds": {
				"all": 96
			},
			"wind": {
				"speed": 1.97,
				"deg": 157,
				"gust": 3.39
			},
			"visibility": 10000,
			"pop": 0.33,
			"rain": {
				"3h": 0.57
			},
			"sys": {
				"pod": "n"
			},
			"dt_txt": "2022-08-30 18:00:00"
		},
		{
			"dt": 1661893200,
			"main": {
				"temp": 292.46,
				"feels_like": 292.54,
				"temp_min": 290.31,
				"temp_max": 292.46,
				"pressure": 1015,
				"sea_level": 1015,
				"grnd_level": 931,
				"humidity": 80,
				"temp_kf": 2.15
			},
			"weather": [{
				"id": 500,
				"main": "Rain",
				"description": "light rain",
				"icon": "10n"
			}],
			"clouds": {
				"all": 68
			},
			"wind": {
				"speed": 2.66,
				"deg": 210,
				"gust": 3.58
			},
			"visibility": 10000,
			"pop": 0.7,
			"rain": {
				"3h": 0.49
			},
			"sys": {
				"pod": "n"
			},
			"dt_txt": "2022-08-30 21:00:00"
		},
		{
			"dt": 1662292800,
			"main": {
				"temp": 294.93,
				"feels_like": 294.83,
				"temp_min": 294.93,
				"temp_max": 294.93,
				"pressure": 1018,
				"sea_level": 1018,
				"grnd_level": 935,
				"humidity": 64,
				"temp_kf": 0
			},
			"weather": [{
				"id": 804,
				"main": "Clouds",
				"description": "overcast clouds",
				"icon": "04d"
			}],
			"clouds": {
				"all": 88
			},
			"wind": {
				"speed": 1.14,
				"deg": 17,
				"gust": 1.57
			},
			"visibility": 10000,
			"pop": 0,
			"sys": {
				"pod": "d"
			},
			"dt_txt": "2022-09-04 12:00:00"
		}
	],
	"city": {
		"id": 3163858,
		"name": "Zocca",
		"coord": {
			"lat": 44.34,
			"lon": 10.99
		},
		"country": "IT",
		"population": 4593,
		"timezone": 7200,
		"sunrise": 1661834187,
		"sunset": 1661882248
	}
};

//begin standard get option
//var myOpenWeatherAPIKey = "c5cad4c737333f8b5dabbc3246fe7c57'";
// var fullurl = "http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";
// fullurl = fullurl.replace("{lat}", 27.984306);
// fullurl = fullurl.replace("{lon}",  -82.579321);
// fullurl = fullurl.replace("{API key}", myOpenWeatherAPIKey);
//api.openweathermap.org/data/2.5/forecast?lat=27.984306&lon=-82.579321&appid=c5cad4c737333f8b5dabbc3246fe7c5


// $.get(fullurl)
//  .then(function(data){
//    //todo: we don't have data yet
// });

//begin prettier get option
var myOpenWeatherAPIKey = "c5cad4c737333f8b5dabbc3246fe7c57'";
var shortURL = "http://api.openweathermap.org/data/2.5/forecast";

var queryStringData = {
 "lat" : 27.984306, 
 "lon" :  -82.579321,
 "appid": myOpenWeatherAPIKey
};

function forecast(lat, lon, appid){

};

$.get(shortURL, queryStringData)
 .then(function(responseData){
    console.log('we got a successful response from openweatherapi');
    handleWeatherResponse(responseData);
 })
 .fail(function() {
    console.log('we got a failed response from openweatherapi');
    handleWeatherResponse(openWeatherExampleResponse);
  });

function handleWeatherResponse(data){
    //data.list[0].main.temp //current temp
    //data.list[0].main.humidity //humidity
    //data.list[0].wind.speed //wind speed
    console.log('current temp ' + data.list[0].main.temp);
    document.querySelector('.current-temperature').innerHTML = data.list[0].main.temp;
};