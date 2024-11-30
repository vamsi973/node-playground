const jwt = require('jsonwebtoken');

let payload = {
    name: "Vamsi",
    working: 'True'
};
encrypt = (payload, secret) => {
    let token = jwt.sign(payload, secret, { expiresIn : '2 days'});
    decrypt(token, secret);

}

decrypt = (token, secret) => {
    let decrypt1 = jwt.verify(token, secret);
    console.log(decrypt1, 90)
    console.log("issued Time", new Date(decrypt1.iat * 1000))
    console.log("expiry Time", new Date(decrypt1.exp * 1000))
}

encrypt(payload, "*&JSDA&*#")

