const https = require('https');
url = 'https://api.darksky.net/forecast/6931e008a4bd2cb876635f937912834c/40,-75?units=uk2'

const request = https.request(url, (response) => {
    
    let data = ''

    response.on('data', (chunk) => {
        data = data + chunk.toString()
    })

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body);
    })

});

request.on('error', (error) => {
    console.log('Error', error);
})

request.end();