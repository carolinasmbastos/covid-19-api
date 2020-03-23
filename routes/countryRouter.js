const express = require("express")
const router = express.Router()
const countryController = require('../controllers/countryController')

router.get('/', countryController.getAllCountry)

router.get('/:country', countryController.getCountry)

exports.countryRouter = router