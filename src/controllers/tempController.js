let axios = require("axios")

let getWeatherOfLondon = async function (req, res) {
    let key = req.headers.weatherkey
     console.log(key)
         try {
             let options = {
                 method: 'get',
                 url: `http://api.openweathermap.org/data/2.5/weather?q=London&appid=${key}`
             }
             let result = await axios(options);
             console.log(result)
             let data = result.data
             res.status(200).send({ msg: data, status: true })
         }
         catch (err) {
             console.log(err)
             res.status(500).send({ msg: err.message })
         }
  }

  let getTempOfLondon = async function (req, res) {
    let key = req.headers.weatherkey
     console.log(key)
         try {
             let options = {
                 method: 'get',
                 url: `http://api.openweathermap.org/data/2.5/weather?q=London&appid=${key}`
             }
             let result = await axios(options);
             console.log(result)
             let data = result.data.main.temp
             res.status(200).send({ msg: data, status: true })
            
         }
         catch (err) {
             console.log(err)
             res.status(500).send({ msg: err.message })
         }
}


let getTempOfCities = async function (req, res) {
    let key = req.headers.weatherkey
     console.log(key)
         try {
            let city = ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
            let cityTemp = []
            for (let i=0;i<city.length;i++){
             let options = {
                 method: 'get',
                 url: `http://api.openweathermap.org/data/2.5/weather?q=${city[i]}&appid=${key}`
             }
             let result = await axios(options);
             console.log(result)
             let data = result.data.main.temp
             let obj = {"City": city[i],
                        "Temp": data
                       }
            cityTemp.push(obj)
            }
            cityTemp.sort(function(a, b){return a.Temp-b.Temp});
            res.status(200).send({ msg: cityTemp, status: true })
         }
         catch (err) {
             console.log(err)
             res.status(500).send({ msg: err.message })
         }
}


  module.exports.getWeatherOfLondon = getWeatherOfLondon
  module.exports.getTempOfLondon = getTempOfLondon
  module.exports.getTempOfCities = getTempOfCities
