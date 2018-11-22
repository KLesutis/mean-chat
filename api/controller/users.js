const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../model/user');

const JWT_KEY = "ASD6as5dA";

exports.signup = (req, res, next) => {
    const password = req.body.password;
    const username = String(req.body.username).toLowerCase();

    bcrypt.hash(password, 10, (err, hash) => {
        User.find({username: username})
            .then(result => {
                if (result.length >= 1) {
                    return res.status(409).json({
                        message: "Username exist"
                    });
                } else {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            username: username,
                            password: hash,
                            sign_date: Date.now()
                        });
                        user.save()
                            .then(result => {
                                res.status(201).json({
                                    message: 'User created'
                                });
                            }).catch(err => {
                            console.log(err);
                            res.status(500).json(err);
                        });
                    }
                }
            }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    });
}

exports.signin = (req, res, next) => {

    const username = String(req.body.username).toLowerCase();
    const password = req.body.password;

    User.findOne({username: username})
        .exec()
        .then(user => {
            console.log(user)
            if (!user) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }


            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if (result) {
                    const token = jwt.sign({
                            username: user.username,
                            userid: user._id
                        }, JWT_KEY,
                        {
                            expiresIn: "4h"
                        });


                    return res.status(200).json({
                        message: "Auth succesful",
                        userid: user._id,
                        token: token

                    })


                }
                res.status(401).json({
                    message: "Auth failed"
                });
            })
        }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.getAllUsernames = (req, res, next) => {
    User.find()
        .select("username")
        .exec()
        .then(users => {
            console.log(users);
            res.status(200).json(users);
        }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
}

exports.updateUsername = (req, res, next) => {

    const userID = req.body.userid;
    const newUsername = req.body.username;

    console.log(userID);
    console.log(newUsername);

    User.find({username: newUsername})
        .then(result => {
            if (result.length >= 1) {
                return res.status(409).json({
                    message: "Username exist"
                });
            } else {
                User.updateOne({_id: userID}, {$set: {username: newUsername}})
                    .exec()
                    .then(result => {
                        res.status(200).json({
                            message: "Username updated"
                        });
                    }).catch(err => {
                    console.log(err);
                    res.status(500).json(err);
                });
            }

        }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
}