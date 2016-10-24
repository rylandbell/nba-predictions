var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');

// GET
router.get('/', ctrlMain.landingPage);
router.get('/month/:month', ctrlMain.predictionsPage);
router.get('/how-to-play', ctrlMain.howToPlay);
router.get('/login', ctrlMain.login);
router.get('/new-month/:month', ctrlMain.newUserMonth);

//POST login credentials
router.post('/login', ctrlMain.submitCredentials);
router.post('/register', ctrlMain.registerNew);

module.exports = router;
