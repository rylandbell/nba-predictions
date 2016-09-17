var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');

// GET
router.get('/', ctrlMain.singleDay);
router.get('/mock-ups', ctrlMain.pageMockups);

module.exports = router;
