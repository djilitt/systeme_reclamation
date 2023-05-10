const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');


router.get('/claim', usersController.studentclaim);

router.get('/claimaff', usersController.studentclaimaff);




module.exports = router;
