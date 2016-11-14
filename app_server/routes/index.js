var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');

// GET
// router.get('/', ctrlMain.dashboard);
// router.get('/month/:month', ctrlMain.predictionsPage);
// router.get('/how-to-play', ctrlMain.howToPlay);
router.get('/login', ctrlMain.login);
router.get('/register', ctrlMain.login);
// router.get('/new-month/:month', ctrlMain.newUserMonth);
router.get('/app/*', ctrlMain.reactApp);

//POST login credentials
router.post('/login', ctrlMain.submitCredentials);
router.post('/register', ctrlMain.registerNew);

module.exports = router;
