const request = require('request')
const tempDetails = (cityName, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c26e6079a2115fdb91ca8534d4402b85&query='+cityName
    console.log('url', url)
    request({url, json:true}, (error, {body}) =>{
        if(error){
            callback('This Service is unreachable', undefined)
        }
        else if(body.success === false){
            callback(body.error.info,undefined)
        }
        else {
            const data = {
                region : body.location.region,
                country : body.location.country,
                temparature : body.current.temperature,
                weatherDescription : body.current.weather_descriptions[0]
            }
            //const stringData = JSON.stringify(data)
            callback(undefined, data)
        }

    })


}


module.exports = {tempDetails}