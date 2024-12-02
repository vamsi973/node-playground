
// const pageController = {
//     aboutPage: (req, res) => {
//         res.render('about')
//     }
// }

// module.exports = pageController;

module.exports.aboutPage = (req, res) => {
    res.render('about')
}

module.exports.contact = (req, res) => {
    res.render('contact')

}

module.exports.home = async (req, res) => {
    let posts = await req.dbConnection.db('node-blog').collection('posts').find({}).toArray();
    res.render("index", {
        posts
    });
}
