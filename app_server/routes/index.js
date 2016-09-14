var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');

// GET
router.get('/', ctrlMain.singleDayMockup);
router.get('/day', ctrlMain.singleDay);

module.exports = router;
