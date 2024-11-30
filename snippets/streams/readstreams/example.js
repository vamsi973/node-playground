const fs = require('fs');
const zlib = require('zlib');
const readline = require('readline');

// Create a readable stream for the log file
const logStream = fs.createReadStream('server.log', { encoding: 'utf8' });

// Create a writable stream for the compressed log file
const compressedLogStream = fs.createWriteStream('server_log.gz');

// Create a gzip transform stream for compression
const gzip = zlib.createGzip();

// Create a readline interface to read the log file line by line
const rl = readline.createInterface({
    input: logStream,
    output: process.stdout,
    terminal: false
});

// Pipe the readable stream into the gzip stream and then into the output file
rl.on('line', (line) => {
    // Process the line: only compress lines that contain 'ERROR'
    if (line.includes('ERROR')) {
        gzip.write(line + '\n'); // Compress and write the error lines
    }
});

rl.on('close', () => {
    console.log('Log file processed and compressed.');
    gzip.end(); // End the gzip stream when done
});

// Pipe the gzip stream to the writable stream
gzip.pipe(compressedLogStream);
//Real-Time Log Streaming with Transformation and Compression