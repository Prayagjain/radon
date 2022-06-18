const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")
const MemeController= require("../controllers/memeController")
const TempController = require("../controllers/tempController")



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get("/cowin/states", CowinController.getStates)

router.get("/cowin/sessionsInDistrict", CowinController.getVaccinationSessions)

router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)

router.get("/cowin/getByPin", CowinController.getByPin)

router.post("/cowin/getOtp", CowinController.getOtp)

router.get("/london/weather", TempController.getWeatherOfLondon)

router.get("/london/temp", TempController.getTempOfLondon)

router.get("/cities/temp", TempController.getTempOfCities)

router.get("/allmemes", MemeController.allMeme)

router.post("/onememe/edit", MemeController.oneMemeEdit)




// WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date



module.exports = router;