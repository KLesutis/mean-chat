const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router();

const userRoutes = require('./api/route/users');
const messageRoutes = require('./api/route/messages');

mongoose.connect('mongodb://1:5mXtd6KSLR5QMnwC@cluster0-shard-00-00-nn0ue.mongodb.net:27017,cluster0-shard-00-01-nn0ue.mongodb.net:27017,cluster0-shard-00-02-nn0ue.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true');

app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, userID"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.use('/api/user', userRoutes);
app.use('/api/message', messageRoutes);

app.use('/', express.static(__dirname + "/public"), function(req, res) {
    var name = 'hello';
    console.log(name);
    res.render("/index.html", {name:name});
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.redirect('/404');
    next();
});

module.exports = app;