const request = require('request');

const forecast = (latitude, longitude, callback) => {
    url = 'https://api.darksky.net/forecast/6931e008a4bd2cb876635f937912834c/' + latitude + ',' + longitude + '?units=uk2'

    request({ url, json: true }, (error, {body}) => { 
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (response.body.error) {
            callback('Unable to find location.', undefined)
        } else {
            const forcast = response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + "c degrees out. There is a " + response.body.currently.precipProbability + "% chance of rain"
            callback(undefined, forcast)
        }
    })
}

module.exports = forecast