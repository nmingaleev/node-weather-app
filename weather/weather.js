const request = require('request');

var getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/872ff6266d051f767316a3cf1fb5c90b/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      var temperature = (body.currently.temperature - 32) / 2 + ((body.currently.temperature - 32) / 2) / 10;
      var apparentTemperature = (body.currently.apparentTemperature - 32) / 2 + ((body.currently.apparentTemperature - 32) / 2) / 10;
      callback(undefined, {
        temperature: temperature,
        apparentTemperature: apparentTemperature,
        humidity: body.currently.humidity,
        windSpeed: body.currently.windSpeed,
        summary: body.currently.summary
      });
    } else {
      callback('Unable to fetch weather.');
    }
  });
};

module.exports = {
  getWeather
}
