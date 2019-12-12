
let { io } = require('../bin/www');
io.on('connection', (socket) => {
    console.log('new User Connected ' + (socket.id));





    socket.on('disconnect', (s) => {

    });
})

module.exports.io = io