const Route = require("express").Router();
// const { aboutPage } = require('../controllers/pageController')
const page = require('../controllers/pageController');

Route.get("/about", page.aboutPage)
Route.get("/contact", page.contact)


module.exports = Route;