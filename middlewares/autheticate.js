module.exports.authenticate = (req, res, next) = {
    try {
        //get token removing unwanted charters/words

        //token decode using jsonwebtoken npm module

        // token data is valid check expiry and if everything ok handle controller

        // token data is invalid end res cycle   
    } catch(error) {
        res.end()
    }



}