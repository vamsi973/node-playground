const Route = require("express").Router();

Route.use('/',require('./pageRoutes'))


module.exports = Route;