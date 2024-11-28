const Router = require('express').Router();
const pageRoutes = require('./blogPageRoutes');

Router.use(pageRoutes)
console.log("page")
Router.use("/blog", require('./blogRoutes'));
Router.all('/', (req, res) => {
    res.redirect("/blog");
})
Router.all("*", (req, res) => {
    res.render("pages.404");
});

module.exports = Router;
