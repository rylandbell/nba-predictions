var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');

// GET
router.get('/login', ctrlMain.login);
router.get('/*', ctrlMain.reactApp);

//POST login credentials
router.post('/login', ctrlMain.submitCredentials);
router.post('/register', ctrlMain.registerNew);

module.exports = router;
