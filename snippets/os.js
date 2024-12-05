const os = require('os');

console.log('os', os.cpus().length);
console.log('arch', os.arch());
console.log("free memory", os.freemem()) //bytes 
console.log("free memory", os.hostname())
console.log("uptime time", os.uptime())
console.log("total memory", os.totalmem())
console.log("userdata", os.userInfo())
console.log("type of os", os.type())

// ---done