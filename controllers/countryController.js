const countryModel = require('../model/countryModel')

exports.getAllCountry = (req, res, next) => {
    countryModel.getAllCountry()
        .then(countries=>{res.send(countries)})
        .catch(error=>next(error))
}