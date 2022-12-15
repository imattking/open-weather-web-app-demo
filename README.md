# Open Weather Web App!

The *Weather Look-er-Up-er* is a lightweight, fluid & responsive web app that allows the user to easily check weather conditions in their geographical location. It was built almost entirely with client-side scripting, a few meaningful API calls, and a lot of love!

**Link to project:** https://imattking-weather-app.netlify.app/

<img alt="Weather App Preview" src="https://raw.githubusercontent.com/imattking/open-weather-web-app-public-demo/main/weather-app.jpg" width="auto" height="350px">

## How It's Made:

**Tech used:** HTML, CSS, JavaScript

The goal was to write a simple client-side web app that would allow the user to check the weather in 3 different on cities on Earth via a simple option select interface. I decided it would be fun to implement additional functionality via zip code and geolocation lookup. With any of these three methods, the relevant latitude and longitude are sent via fetch request to the Open Weather API. The results are returned in JSON format, parsed for the relevant info, and then displayed dynamically in the DOM in all their glory for the end user. In addition, the zip-code lookup sends a request to the Bing Maps API, which then returns the relevant location info in JSON format as well. That is then parsed for latitude and longitude needed in the API call to Open Weather. The process for looking up the user's geographical location is similar in that it uses the Geolocation Web API to obtain the user's latitude and longitude to be similarly parsed and fed into the Open Weather API as well. All three methods employ async await functions or otherwise make use of promises to keep the web app running without blocking the page.

## Optimizations

In testing the app upon completion, I discovered that the results would load at the bottom of the page and were not always immediately visible without first scrolling down. This was especially evident on mobile platforms. I researched a few methods to implement auto-scrolling and then decided to try my hand at implementing them. I introduced the new feature at different points in the application depending on the type of user input and the subsequent request to the Open Weather API. The outcome turned out **great**, and now the page automatically srcolls down as the results load in!

## Lessons Learned / Future Optimizations:

This project was another great lesson in best practices regarding my CSS styles. I continue to fine-tune building classes, components, and custom properties. I was able to implement an option for light mode vs. dark mode depending on the user's system settings using custom properties. In the future, I would like to add a user-accessible toggle for this feature, and I'd like to add the ability to store the user's last setting via local storage as well. 

I would also like to find a way to better optimize the geolocation lookup. It works well consistently (though I do have error handling to cover any misfires), but some requests take a bit of time to return results. I'd be interested in learning how to better optimize these requests to speed up the processing time.

## Additional Information / Resources :

**Link to the Open Weather API:** [Here](https://home.openweathermap.org/)

**Link to the Bing Maps API:** [Here](https://www.microsoft.com/en-us/maps/documentation)



