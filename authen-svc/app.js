const express = require('express');
const session = require("express-session");
const passport = require("./middleware/passport");
const authen = require("./controllers/userController");
const app = express();
app.use(express.urlencoded({extended: false}))
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
})

app.get('/', (req, res) => {
    res.send("Welcome to Authentication Service")
})

app.get("/login", authen.login)

app.post("/login",  passport.authenticate("local", {
    successRedirect: "/reminder",
    failureRedirect: "/login",
}))

// app.get("/reminder", (req, res, next) => {
//     if (req.isAuthenticated()) {
//     next();
// }   else {
//     res.redirect("/login");
// }}, reminderController.list)


app.listen(3000, () => {
    console.log('Authentication Service running on port 3000')
})