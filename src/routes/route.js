const express = require('express');
const externalModule = require('.././logger/logger')
const externalModule2 = require('.././util/helper')
const externalModule3 = require('.././validator/formatter')

const router = express.Router();

router.get('/test-me', function (req, res) {
    externalModule.log()
    externalModule2.date()
    externalModule2.month()
    externalModule2.info()
    externalModule3.trim()
    externalModule3.lower()
    externalModule3.upper()

    res.send('My first ever api!')
});

router.get('/test-me1', function (req, res) {
    res.send('My second ever api!')
});

router.get('/test-me2', function (req, res) {
    res.send('My third api!')
});

router.get('/test-me3', function (req, res) {
    res.send('My 4th api!')
});

router.get('/test-me4', function (req, res) {
    res.send('My last api!')
});
router.get('/test-me5', function (req, res) {
    externalModule.log2()
    res.send('My last api!')
});

module.exports = router;
// adding this comment for no reason