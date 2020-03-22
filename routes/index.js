const express = require("express")
const router = express.Router()

const {countryRouter} = require('./countryRouter')


router.use('/country', countryRouter)

exports.routerIndex = router