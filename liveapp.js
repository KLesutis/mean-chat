const mongoose = require('mongoose');
const User = require('./api/model/user');

var onlineUsers = [];


module.exports = function (io) {
    io.on('connection', socket => {

        socket.on('online', user => {
            if (onlineUsers.indexOf(user) === -1)
                onlineUsers.push(user);
        });

        socket.on('newMessage', message => {
            io.emit('updateChat', true);
        });

    });
    setInterval(function() {
        io.emit('onlineUsers', onlineUsers);
        onlineUsers = [];
    }, 10000);


};