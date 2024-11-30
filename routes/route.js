const Route = require("express").Router();

Route.use('/',require('./pageRoutes'))
Route.use('/api',require('./blogRoutes'))


module.exports = Route;