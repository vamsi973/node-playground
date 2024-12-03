const Router = require("express").Router();
const pageRoutes = require('./pageRoutes');


Router.use('/', require('./pageRoutes'))

Router.use("/blog", require('./blogRoutes'));

Router.all('/', (req, res) => {
    res.redirect("/blog");
});

//if no end point i am rendering this 404 page
Router.all('*', (req, res) => res.render('404'))

module.exports = Router;


