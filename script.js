var APIKey = f5c7c99462c9401e774f3aa3a67ddc7f;
var city;
// This section lists a number of parameters, but only the following two are required:
// q: The query parameter, where we'll add the city variable.
// appid: The application id or key, where we'll add the API key variable.
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" +
 city + "&appid=" + APIKey;
//  http://api.openweathermap.org/data/2.5/weather is the base URL for calling the Current Weather Data API.

//The question mark (?) marks the boundary between the base URL of the API call and the query terms of the API call.

//As we mentioned earlier, q= is the query parameter, where we can add any user input to specify
// the data that we want to request in the API call. The value assigned to this parameter is called the query string.

//Following the query parameter, we concatenate the user input, which is stored in the variable city. 

//This is the query string assigned to the query parameter.

// The ampersand character (&) indicates that we're adding another parameter after the query parameter.

// Next, we concatenate the other required parameter, appid=, where we'll add the API key specific to the application.

// Finally, we concatenate the APIKey variable that contains the key we obtained at the beginning of this guide.

//Now that you have created your query URL, you only need to call the Fetch API to pass the query URL in as a parameter, as shown in the following example:
fetch(queryURL)
//Remember that the query URL won't work automatically as it's written. You'll need to adjust your application to accept user input, to store in the city variable that you've created.