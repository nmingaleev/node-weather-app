const request = require('request');

var geocodeAddress = ((address) => {
  return new Promise((resolve, reject) => {
    var encodedAddress = encodeURIComponent(address);
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
      json: true
    }, (error, response, body) => {
      if (error) { // если объект существует
        reject('Unable to connect to Google servers.');
      } else if (body.status === 'ZERO_RESULTS') {
        reject('Unable to find that address.');
      } else if (body.status === "OK") {
        var location = {
          address: body.results[0].formatted_address,
          longitude: body.results[0].geometry.location.lng,
          latitude: body.results[0].geometry.location.lat
        };
        resolve(location);
      }
    });
  });
});

geocodeAddress("lazo 46 Yurga").then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
})
