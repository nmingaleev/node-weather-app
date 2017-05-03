const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true, //Обязательно или нет
      alias: 'address',
      describe: 'Addres to fetch weather for',
      string: true
    }
})
  .help()
  .alias('help', 'h')
  .argv;

  var encodedAddress = encodeURIComponent(argv.address);
  var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

  axios.get(geocodeUrl).then((response) => {
    if (response.data.status === "ZERO_RESULTS") {
      throw new Error('Unable to find that address');
    }

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/872ff6266d051f767316a3cf1fb5c90b/${lat},${lng}`

    console.log(response.data.results[0].formatted_address);

    return axios.get(weatherUrl);
  }).then((response) => {
    var temperature = (response.data.currently.temperature - 32) / 2 + ((response.data.currently.temperature - 32) / 2) / 10;
    var apparentTemperature = (response.data.currently.apparentTemperature - 32) / 2 + ((response.data.currently.apparentTemperature - 32) / 2) / 10;
    var weatherForecast = {
      temperature: temperature,
      apparentTemperature: apparentTemperature,
      humidity: response.data.currently.humidity,
      windSpeed: response.data.currently.windSpeed,
      summary: response.data.currently.summary
    };

    console.log(JSON.stringify(weatherForecast, undefined, 2));
  }).catch((e) => {
    if (e.code === "ENOTFOUND") {
      console.log("Unable to connect to API servers");
    } else {
      console.log(e.message);
    }
  });
