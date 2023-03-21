// Grabbing the current date
var currentDateDisplay = document.querySelector(".current-date");

var getCurrentDate = dayjs().format("MM/DD/YYYY");
console.log("Current Date " + getCurrentDate);

currentDateDisplay.innerHTML = getCurrentDate;

var currentLocation = null;
// Get Current Location
// from office hours 20MAR2023
// I set a function to pull my location, from which I pull lat and lon
// then I run a function to pull my API key by lat and lon
function getLocation(){
    navigator.geolocation.getCurrentPosition(function(locationData){
        console.log("Location Data below:")
        console.log(locationData);
        console.log("Latitude " + locationData.coords.latitude);
        console.log("Longitude " + locationData.coords.longitude);
        //console.log("Latitude from variable " + lat + " and Longitude from variable " + lon)
        currentLocation = locationData.coords;
    })}

getLocation();



// City - Local Storage History
// this is my UL that will hold my lis
var cityHistory = document.querySelector(".list-group");
var searchButton = document.querySelector(".search-button");
var searchBox = document.querySelector(".form-control");
var cityNameH3 = document.querySelector(".current-city");
var currentIcon = document.querySelector(".current-icon");
var currentTemp = document.querySelector(".current-temperature");
var currentHumidity = document.querySelector(".current-humidity");
var currentWindSpeed = document.querySelector(".current-wind-speed")
var futureDate = document.querySelector(".future-date");
var fiveDayContainer = document.querySelector(".five-day-container");
var localStorageKey = "placeholder";

var numberOfHistoryToShowOnPage = 5;

function getLocalStorageData() {
    // I need to grab local storage data on page load, so I grab it here by referring to the key
    // I placed it into a function because there are other places in my code where I will need to get local storage
    // unparsed means something
    // This function is at the top of my page because I need it to run early on on my page
    var unparsedHistory = localStorage.getItem(localStorageKey);
    // whatever I pull from my local storage comes unparsed, there for I have to stringify it to access it for some reason
    // I think this turns it into an array, and then I can say if you're null, give me an empty array
    var searchHistory = JSON.parse(unparsedHistory) || [];
    // I pull my data out of local storage and then I parse it
    // Parse turns a string into an option
    // I only need to stringify it back if I need to set my item in storage, but I'm not doing that yet
    return searchHistory;
}

// Now that I have gotten my local storage, I need to place it somewhere, so I am going to call a function to build lis in my ul
function buildRecentSearchesArea(recentSearches /* array */) {
    cityHistory.innerHTML = ''; //clear list
    for(i = 0; i < 5; i++) {
        // first I need to createElement, and THEN I can append it
        var createHistory = document.createElement("li");
        var searchValue = recentSearches[i];
        // searchValue is my recent searches at an index
        // then I want to check if that array is null or undefined
        // WHY: if it's undefined, then I set the array to an empty string

        createHistory.classList = "list-group-item list-group-item-info";

        if(searchValue == null || searchValue == undefined) {
            searchValue = '';
            createHistory.classList.add("hide-me");
            createHistory.classList.remove("show-me");
            //createHistory.style.display = 'none';
        }
        else {
            createHistory.classList.remove("hide-me");
            createHistory.classList.add("show-me");
            //createHistory.style.display = 'block';

        }
        // createHistory.style.display = 'hide';
        // createHistory.style.display = 'block';
        createHistory.innerHTML = searchValue;

        cityHistory.appendChild(createHistory);
    }
    if (recentSearches[i] == false){
        createHistory.innerHTML = '';
    }
}

// buildRecentSearchesArea was built for an array because it is a for loop, so it works with
// getLocalStorageData because that is an array, because I got the data from local storage
// data that comes from local storage is a string, so my getLocalStorageData fixes that for me
// with my JSON.parse

buildRecentSearchesArea(getLocalStorageData());

function storeCity(eventObj){
    // preventDefault stops the page from refreshing
    eventObj.preventDefault();
    // searchedCity is the value that the user typed into the search box
    var searchedCity = searchBox.value;
    // to create a  city history li, I want to grab the document and create an element
    var createHistory = document.createElement("li");
    // this is the other place where I want to get data from local storage so I'm just recalling that function
    var searchHistory = getLocalStorageData();
    //local storage data is an array, so I can push here
    // but I also need to pop so that the most recent cities will always show
    searchHistory.push(searchedCity);
    console.log("Searched City below:")
    console.log(searchedCity);
    
    // remove the oldest item from the array after 5 items
    if (searchHistory.length > 5){
        searchHistory.shift();
    }
    //I haven't stringified yet because I haven't set data yet, so searchHistory is still an array
    if (searchHistory.length <= 5) {
        numberOfHistoryToShowOnPage = searchHistory.length
    }

    // now that I've gotten the data, it's time to set the data and stringify it
    // I think set item needs two parameters so it knows what key to pair the value with
    localStorage.setItem(localStorageKey, JSON.stringify(searchHistory));

    // now then I want to take the element I created and append the searchBox.value
    for (i = 0; i < numberOfHistoryToShowOnPage; i++){
        createHistory.append(searchedCity);
         // I also need to add a class list so that it matches the formatting
        cityHistory.classList.add = ("list-group-item list-group-item-info");
    }
    //now I need to build my searches area with everything I got out of storeCity
    buildRecentSearchesArea(searchHistory);

    getDataByCityName(searchedCity);
}

searchButton.addEventListener("click", storeCity)

// API Key
var baseURL = "https://api.openweathermap.org/data/2.5/";
var weather = "weather?";
var forecast = "forecast?"
// var lat = 0;
// var lon = 0;
// add imperial units
var units = "imperial"; 
var apiKey = "c5cad4c737333f8b5dabbc3246fe7c57";

// "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units={imperial}&appid={API key}"
// $.get("https://api.openweathermap.org/data/2.5/weather?q=Tampa&appid=c5cad4c737333f8b5dabbc3246fe7c57").then(function(data){
//     console.log(data);
// })

// this is how I get weather for the current location
function getDataByLatLon(lat, lon) {
 $.get(baseURL + weather + "lat=" + lat + "&lon=" + lon + "&units=" + units + "&appid=" + apiKey)
  .then(function(data){
    console.log("API Data by lat/lon below:") 
    console.log(data);
    writeCurrentWeatherToPage(data);
 });
}

function getFutureDataByLatLon(lat, lon) {
    $.get(baseURL + forecast + "lat=" + lat + "&lon=" + lon + "&units=" + units + "&appid=" + apiKey)
     .then(function(data){
       console.log("API Future Data by lat/lon below:") 
       console.log(data);

       writeFutureWeatherToPage(data);
    });
}

function writeCurrentWeatherToPage(data) {
    console.log("City: " + data.name);
    cityNameH3.innerHTML = data.name;
    console.log("Weather condition for icon: " + data.weather[0].main);
    var condition = data.weather[0].main
    if (condition == "Clear"){
        currentIcon.src = "assets/images/day-and-night.png";
    } else if (condition == "Clouds"){
        currentIcon.src = "assets/images/cloud-computing.png";
    } else if (condition == "Haze"){
        currentIcon.src ="assets/images/haze.png"

    }
    else {
        //default - delete or fix later
        currentIcon.src = 'assets/images/day-and-night.png';
    }
    console.log("Temperature below:");
    console.log(data.main.temp);
    currentTemp.innerHTML = parseInt(data.main.temp) + "&#176";
    console.log("Humidity below:");
    console.log(data.main.humidity);
    currentHumidity.innerHTML = "Humidity " + parseInt(data.main.humidity) + "&#37";
    console.log("Wind speed below:");
    console.log(data.wind.speed);
    currentWindSpeed.innerHTML = "Wind " + parseInt(data.wind.speed) + " mph";
};

function writeFutureWeatherToPage(data) {

    var myWeatherObject = data.list[0];
    console.log("Future weather condition for icon: " + myWeatherObject.weather[0].main);
    

    var condition = myWeatherObject.weather[0].main;
       if (condition == "Clear"){
           currentIcon.src = 'assets/images/day-and-night.png';
       } else if (condition == "Clouds"){
           currentIcon.src = 'assets/images/cloud-computing.png';
       }
       else {
           //default - delete or fix later
           currentIcon.src = 'assets/images/day-and-night.png';
       }
       //we can most likely remove the if/else above and use this:
       //currentIcon.src = getImageForWeather(myWeatherObject.weather[0].main)

       currentIcon.src = getImageForWeather(myWeatherObject.weather[0].main)
       console.log("Future temperature below:");
       console.log(myWeatherObject.main.temp);
       currentTemp.innerHTML = parseInt(myWeatherObject.main.temp) + "&#176";
       console.log("Future humidity below:");
       console.log(myWeatherObject.main.humidity);
       currentHumidity.innerHTML = "Humidity " + parseInt(myWeatherObject.main.humidity) + "&#37";
       console.log("Future wind speed below:");
       console.log(myWeatherObject.wind.speed);
       currentWindSpeed.innerHTML = "Wind " + parseInt(myWeatherObject.wind.speed) + " mph";
    

       fiveDayContainer.innerHTML = "";
       for(i = 0; i < data.list.length; i++) {
            var currentArrayItem = data.list[i];
            var currentDateTime = currentArrayItem.dt_txt;
            if(currentDateTime.indexOf("00:00:00") >= 0) {
                console.log(currentDateTime);
                console.log("start doing stuff for this date ")
                console.log(currentArrayItem);
                //console.log('indexOf result for match above: ' + currentDateTime.indexOf('00:00:00'));
            
                var span = document.createElement("span");
                span.classList = "col-2 border border-info container rounded list-group-item-info future-date-container";
                var divContainer = document.createElement("div");
                divContainer.classList = "container";
                var divH5 = document.createElement("div");
                divH5.classList = "d-flex justify-content-start align items center future-date-icon-div";
                var h5 = document.createElement("h5");
                h5.classList = "text-info-emphasis future-date";
                h5.innerHTML = currentDateTime.replace(" 00:00:00", "").replace(new Date().getFullYear() + "-", "");
                var icon = document.createElement("img");
                icon.height = 24;
                icon.src = getImageForWeather(currentArrayItem.weather[0].main);

                var pTemp = document.createElement("p");
                pTemp.classList = "text-info-emphasis";
                pTemp.innerHTML = parseInt(currentArrayItem.main.temp) + '&deg;';

                var pHum = document.createElement("p");
                pHum.classList = "text-info-emphasis";
                pHum.innerHTML = "Humidity " + currentArrayItem.main.humidity + '&percnt;';

                var pWind = document.createElement("p");
                pWind.classList = "text-info-emphasis";
                pWind.innerHTML = "Wind " + parseInt(currentArrayItem.wind.speed) + " mph";

                divH5.appendChild(h5);
                divH5.appendChild(icon);
                
                divContainer.appendChild(divH5);
                divContainer.appendChild(pTemp);
                divContainer.appendChild(pHum);
                divContainer.appendChild(pWind);
                span.appendChild(divContainer);

                fiveDayContainer.appendChild(span);
        }
       }
};

function getImageForWeather(condition) {
    var src = 'assets/images/day-and-night.png';
    if (condition == "Clear"){
        src = 'assets/images/day-and-night.png';
    } else if (condition == "Clouds"){
        src = 'assets/images/cloud-computing.png';
    }
   return src;
}

function getDataByCityName(cityName) {
    $.get(baseURL + weather + "q=" + cityName + "&units=" + units + "&appid=" + apiKey)
     .then(function(data){
        console.log("API Data by city below: ")
        console.log(data);
        //todo: resume here
        writeCurrentWeatherToPage(data);
        getFutureDataByLatLon(data.coord.lat, data.coord.lon);
    })
}

// the page loads before the location calls data from the api
// so I have to set a timeout to make the page wait
// and then in case it takes longer, I set an if else to make the page wait even longer so that I can avoid an error
function buildPageWithLocationData() {
    if(currentLocation == null) {
        setTimeout(buildPageWithLocationData, 500);
    }
    else {
        getDataByLatLon(currentLocation.latitude, currentLocation.longitude);
        getFutureDataByLatLon(currentLocation.latitude, currentLocation.longitude);
    }
};

setTimeout(buildPageWithLocationData, 500);



// --------------------ATTEMPT ONE--------------------
// 20MAR2023 Office Hours

// var unparsedHistory = localStorage.getItem(localStorageKey);
// console.log(' unparsedhistory looks like this before we parse it ' + unparsedHistory)
// var searchHistory = JSON.parse(unparsedHistory) || [];



//if no data in local storage, add some to test with
// if(searchHistory.length == 0) {
//     console.log('setting up local storage');
//     searchHistory = [ 'Tampa', 'Orlando', 'Miami', 'Chicago', 'Jacksonville' ];
//     //add to local storage so next time it's already set
//     console.log('saving to local storage');
//     localStorage.setItem('search-history', JSON.stringify(searchHistory));
// }

//not needed until we add previous searches dynamically
// if (searchHistory.length <= 5) {
//     numberOfHistoryToShowOnPage = searchHistory.length
// } 


// for (i = 0; i < numberOfHistoryToShowOnPage; i++){
//     console.log(searchHistory[i]);
//     //append previous searches here
// }