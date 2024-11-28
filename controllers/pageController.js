
const pageController = {
    contactPage: (req, res) => {
        console.log("contact page is hitting");
        res.render('contact')
    },
    aboutPage: (req, res) => {
        res.render('about')
    },

}
module.exports = pageController;