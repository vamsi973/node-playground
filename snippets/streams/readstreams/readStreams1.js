const fs = require('fs');
const zlib = require('zlib');

// Create a readable stream for the original file
const fileStream = fs.createReadStream(__dirname + '/NGINX.pdf');

// Create a writable stream for the compressed file
const compressedFileStream = fs.createWriteStream('NGINX.pdf.gz');

// Create a writable stream for the uncompressed copy
const copyFileStream = fs.createWriteStream('NGINX_copy.pdf');

// Create a transform stream for compression (gzip)
const gzip = zlib.createGzip();

// Pipe the original file stream into two destinations simultaneously:
// 1. The gzip stream for compression
// 2. The copy stream for creating an uncompressed copy
fileStream.pipe(gzip).pipe(compressedFileStream);
fileStream.pipe(copyFileStream);

// Listen for the finish event to confirm when all streams are completed
compressedFileStream.on('finish', () => {
    console.log('File has been compressed successfully.');
});

copyFileStream.on('finish', () => {
    console.log('File copy has been created successfully.');
});
