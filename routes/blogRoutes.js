const Route = require('express').Router();
const { contactFormSubmit } = require('../controllers/blogController')

Route.post('/help', contactFormSubmit);
module.exports = Route;