
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