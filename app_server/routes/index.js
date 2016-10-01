var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');

// GET
router.get('/', ctrlMain.landingPage);
router.get('/month/:month', ctrlMain.predictionsPage);
router.get('/mock-ups', ctrlMain.pageMockups);
router.get('/login', ctrlMain.login);

//POST login credentials
router.post('/login', ctrlMain.submitCredentials);
router.post('/register', ctrlMain.registerNew);

module.exports = router;
