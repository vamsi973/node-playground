const Route = require("express").Router();
// const { aboutPage } = require('../controllers/pageController')
const page = require('../controllers/pageController');

Route.get("/", async (req, res) => {
    let posts = await req.dbConnection.db('node-blog').collection("posts").find({}).toArray();
    res.render('index', { posts })
})
Route.get("/about", page.aboutPage)
Route.get("/contact", page.contact)


module.exports = Route;
