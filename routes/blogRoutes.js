const Route = require('express').Router();
const { contactFormSubmit, postBlog, createUser } = require('../controllers/blogController')

Route.post('/help', contactFormSubmit);
Route.post('/create', postBlog);
Route.post('/update', postBlog);
Route.post('/createUser', createUser);
module.exports = Route;