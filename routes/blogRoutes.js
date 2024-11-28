const Router = require("express").Router();
const { posts, createPost, deletePost, editPost, getSinglePost } = require('../controllers/blogController');
Router.get("/", posts);
// Router.get("/create", createPost);
Router.get("/create", createPost);
Router.get("/:id", getSinglePost);
// Router.post("/", saveArticle);
// Router.get("/edit/:id", viewArticleForEdit);
Router.post("/edit/:id", editPost);
Router.get("/delete/:id", deletePost);
Router.post("/create", createPost);

module.exports = Router;