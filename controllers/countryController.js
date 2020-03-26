const countryModel = require('../model/countryModel')

exports.getAllCountry = (req, res, next) => {

    countryModel.getAllCountry()
        .then(countries=>{
            res.send(countries)
        })
        .catch(error=>{
            console.log(error)
            next(error)
        })
}

exports.getCountry = (req, res, next) => {

    if (req.query.view === 'timeline') {

        countryModel.getCountryTimeline(req.params.country)
            .then(result=>{
                
                if (result.length > 0) {
                    let ret = {
                        country : result[0].country,
                        latitude: result[0].latitude,
                        longitude: result[0].longitude,
                        timeline : result.map((item) => {
                            console.log(item.confirmed, item.deaths, item.recovered, item.lastUpdate)
                            return {
                                confirmed : item.confirmed,
                                deaths: item.deaths,
                                recovered : item.recovered,
                                lastUpdate : item.lastUpdate
                            }
                        })
                    }
                    res.send(ret)
                } else {
                    let error = new Error("No Data Found for: "+ req.params.country)
                    console.log(error)
                    next(error)
                }            
            })
            .catch(error=>{
                console.log(error)
                next(error)
            })

    } else {

        countryModel.getCountryByName(req.params.country)
            .then(country=>{
                //console.log(country)
                if (country.length > 0) {
                    res.send(country)
                } else {
                    let error = new Error("No Data Found for: "+ req.params.country)
                    console.log(error)
                    next(error)
                }                
            })
            .catch(error=> {
                console.log(error)
                next(error)
            })
    }

}
