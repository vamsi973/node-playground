const fs = require('fs');
const path = require('path');
const http = require('https');


/* Example1
const readableStream = fs.createReadStream(path.resolve(__dirname, '../../public/open.msi'), "utf8");

readableStream.on('data', (chunk) => {
    console.log('Received chunk:', chunk);
});


readableStream.on('end', () => {
    console.log('Finished reading the file.');
});


readableStream.on('error', (err) => {
    console.log('Error reading the file:', err.message);
});
*/

/**
 Example2
 */
http.get('https://www.youtube.com/watch?v=2MFVtZnKig0', (response) => {
    // Ensure the response is a readable stream
    response.setEncoding('utf8');

    // Listen for 'data' event to process the incoming chunks of data
    response.on('data', (chunk) => {
        console.log('Received chunk:', chunk);
    });

    // Listen for 'end' event when the response is fully received
    response.on('end', () => {
        console.log('Finished receiving response.');
    });

    // Listen for 'error' event in case of an error
    response.on('error', (err) => {
        console.log('Error with the HTTP request:', err.message);
    });
});