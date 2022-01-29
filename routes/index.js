// "use strict";

// const express = require("express");
// const session = require('express-session')
// const router = express.Router();
// const routeLogin = require("./login");
// const routeRegister = require("./register");
// const routeProduct = require("./product");
// const routeProfile = require("./profile");
// const Controller = require("../controllers/controller");

// router.use("/register", routeRegister);

// router.use("/login", routeLogin);

// router.get("/", (req, res) => {
//   res.redirect("/login")
// })

// router.use(function (req, res, next) {
//     if (!req.session.userId) {
//       const error = 'Please Login first!'
//       res.redirect(`/login?error=${error}`)
//     } {
//       next()
//     }
//   })

// router.get('/:id/profile', Controller.userProfile)

// router.get('/:id/profile/delete', Controller.deleteAccount);

// router.get('/:id/profile/edit', Controller.editProfile)

// router.post('/:id/profile/edit', Controller.postProfile)


// router.use('/product', routeProduct)

// module.exports = router;
