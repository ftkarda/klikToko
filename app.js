// Happy coding guys
const express = require("express");
const Controller = require("./controllers/controller");
const app = express();
const port = 3000;
const session = require('express-session')

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"))
app.use(express.json())

app.use(session({
  secret: "secret id",
  resave: false,
  saveUninitialized: false,
  cookie: {secure:false}
}))

app.get("/register", Controller.formRegister);
app.post("/register", Controller.postRegister);

app.get("/login", Controller.formLogin);
app.post("/login", Controller.postLogin);

app.get("/", (req, res) => {
  res.redirect("/login")
})

app.use(function (req, res, next) {
  if (!req.session.userId) {
    const error = 'Please Login first!'
    res.redirect(`/login?error=${error}`)
  } {
    next()
  }
})


app.get("/:id", Controller.homePage);

app.get("/payment/checkout", Controller.getCheckout);

app.get('/:id/profile', Controller.userProfile)

app.get("/:id/profile/delete", Controller.deleteAccount);

app.get('/:id/profile/edit', Controller.editProfile)

app.post('/:id/profile/edit', Controller.postProfile)

app.get('/product/:id', Controller.productDetails)


app.listen(port, () => {
  console.log("app is running in port", port);
});
