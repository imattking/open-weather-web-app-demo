// ensure scripts are loadin properly
console.log('We Online! We Outside!');

// declare variables for results to display in DOM
const result = document.querySelector('#results');
const userLocation = document.querySelector('#user-location');
const skies = document.querySelector('#skies');
const current = document.querySelector('#current-temp');
const feel = document.querySelector('#feels-like');

/*************************** CITY OPION SELECT DROPDOWN ***************************/
// option select functionality here
const citySelect = document.querySelector('#city-picker')
citySelect.addEventListener('change', selectCity); 
// assign gps coordinates
let crds = {
    atlanta: { lat: 33.749, lon: -84.38798 },
    paris: { lat: 48.85341, lon: 2.3488 },
    tokyo: { lat: 35.689487, lon: 139.691706 },
}
function selectCity() {
    clearResults();
    if(this.value === 'Atlanta') {
        console.log(`City selected: ${this.value}`);
        // function call to Open Weather API
        weatherApiLookup(crds.atlanta.lat, crds.atlanta.lon);
        smoothScroll('#results', 1000); // Scroll down to results
    } else if (this.value === 'Paris'){
        console.log(`City selected: ${this.value}`);
        // function call to Open Weather API
        weatherApiLookup(crds.paris.lat, crds.paris.lon);
        smoothScroll('#results', 1000); // Scroll down to results
    } else if (this.value === 'Tokyo') {
        console.log(`City selected: ${this.value}`);
        // function call to Open Weather API
        weatherApiLookup(crds.tokyo.lat, crds.tokyo.lon);
        smoothScroll('#results', 1000); // Scroll down to results
    } else {
        console.log(`Big sad.`);
    }
    
}


/*************************** USER INPUT ZIP CODE LOOKUP ***************************/
// zip code lookup functionality here
const zipCodeInput = document.querySelector('#zip-code');
const zipCodebutton = document.querySelector('#zip-code-button');
zipCodebutton.addEventListener('click', () => {
    clearResults();
    smoothScroll('#results', 1000); // Scroll down to results
    if (zipCodeInput.value.length !== 5) {
        alert('Please enter a valid five-digit zip code.')
    } else {
        console.log(zipCodeInput.value);
        // set up parameters for fecth request to Bing Maps API
        const zipCode = zipCodeInput.value
        /*********************************************************************/
        /****************** REMOVED API KEY FOR PUBLIC DEMO ******************/
        /*********************************************************************/
        const bingKey = ``; 
        const bingURL = `https://dev.virtualearth.net/REST/v1/Locations/US/-/${zipCode}/-/-?key=${bingKey}`;
        // fetch user's coordinates based on zip code geolocation lookup
        fetch(bingURL) 
            .then(res => res.json())
            .then(data => {
                const loc = data.resourceSets[0].resources[0].point.coordinates;
                console.log(loc);
                // function call to Open Weather API
                weatherApiLookup(loc[0], loc[1]);
            })
            .catch(err => {
                console.error(`Error: ${err.code} : ${err.message}`);
                alert('Please enter a valid five-digit zip code.');
            })
    }
})

/*************************** GEOLOCATION DATA REQUEST ***************************/
// Pull user's geolocation
async function geoResolve(pos) {
    const crd = await pos.coords;
    const lat = await crd.latitude;
    const lon = await crd.longitude
    console.log(`Your current position is: ${lat}, ${lon}`);
    // function call to Open Weather API
    weatherApiLookup(lat, lon); 
    smoothScroll('#results', 1000); // Scroll down to results
}
function geoReject(err) {
    console.error(`Error: ${err.code} : ${err.message}`);
    result.textContent = `Geolocation is not supported in this browser or user has denied access.`
}
function getUserLocation() {
    clearResults();
    result.textContent = 'This will take just a moment.' // prep user for pending fulfillment
    navigator.geolocation.getCurrentPosition(geoResolve, geoReject);
}

const geoLocation = document.querySelector('#geo-locate');
geoLocation.addEventListener('click', getUserLocation);


/*************************** WEATHER API FETCH REQUEST ***************************/
async function weatherApiLookup(lat, lon) {
    console.log('Lookup Running');
    // conditional to check for type of incoming input
   
    //declare url/query string
    /*********************************************************************/
    /****************** REMOVED API KEY FOR PUBLIC DEMO ******************/
    /*********************************************************************/
    const apiKey = ``;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    //fetch data, await response, parse json, disply in DOM
    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        // Display results in the DOM
        userLocation.textContent = `Weather conditions in ${data.name}`
        result.textContent = `For today, ${today}:`;
        skies.textContent = `Skies: ${data.weather[0].main}`;
        current.textContent = `Current Temp: ${data.main.temp}ºF`;
        feel.textContent = `Feels Like: ${data.main.feels_like}º F`;
    }
    // error handling if promise rejects
    catch(err) {
        console.error(`Error: ${err.code} : ${err.message}`);
        result.textContent = 'Error: Failed to load weather data. Please try again.'
    }
};


/******************** Create & Parse Date Ojbect ********************/
const date = new Date();

// parse day from date object
const days = {
    0: 'Sun', 1: 'Mon', 2: 'Tues', 3: 'Wed', 
    4: 'Thur', 5: 'Fri', 6: 'Sat'
}
let dayNum = date.getDay();
let day = days[dayNum];
// parse month from date object
const months = {
    0: 'Jan', 1: 'Feb', 2: 'Mar', 3: 'Apr',
    4: 'May', 5: 'Jun', 6: 'Jul', 7: 'Aug',
    8: 'Sep', 9: 'Oct', 10: 'Nov', 11: 'Dec',
}
let monthNum = date.getMonth();
let month = months[monthNum];
// build day string from Date() object
const today = `${day}, ${month} ${date.getDate()} ${date.getFullYear()}`;

/************* Cleanup results from previoius lookups **************/
function clearResults() {
    result.textContent = ``;
    userLocation.textContent = ``;
    skies.textContent = ``;
    current.textContent = ``;
    feel.textContent = ``;
}


/************* Smooth Scrolling on request lookups **************/
function smoothScroll(anchor, duration) {
    let target = document.querySelector(anchor);
    let targetPosition = target.getBoundingClientRect().top;
    let startPosition = window.pageYOffset;
    let distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) {
            startTime = currentTime;
        }
        let timeElapsed = currentTime - startTime;
        let run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    function ease(t,b,c,d) {
        t /= d / 2;
        if (t < 1 ) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    requestAnimationFrame(animation);
}