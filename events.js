const { EventEmitter } = require('events');
const eventemitter = new EventEmitter();

eventemitter.on('event', eventHandler);
function eventHandler() {
    console.log("event triggred");
}

eventemitter.emit('event')