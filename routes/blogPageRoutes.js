const Router = require('express').Router();
const { contactPage, aboutPage } = require('../controllers/pageController')


Router.get('/contact', contactPage);
Router.get('/about', aboutPage);
module.exports = Router;