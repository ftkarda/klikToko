const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();


router.get('/profile', Controller.userProfile)

router.get('/profile/delete', Controller.deleteAccount);

router.get('/profile/edit', Controller.editProfile)

router.post('/profile/edit', Controller.postProfile)

module.exports = router