const mongoose = require('mongoose');

const User = require('../model/user');
const Message = require('../model/message');

exports.postMessage = (req, res, next) => {
    const text = req.body.message;
    const user = req.body.user;


    var image = '';

    if (req.file !== undefined) {
        image = req.file.path;
    }
    console.log(image)

    const message = new Message(
        {
            _id: new mongoose.Types.ObjectId(),
            message: text,
            user: user,
            image: image,
            sent_time: Date.now()
        }
    );

    message
        .save()
        .then(result => {
            User.updateOne({_id: user}, {$push: {messages: message._id}})
                .exec()
                .then(userResult => {
                    res.status(201).json({
                        message: "Message posted"
                    });

                }).catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
        }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
}

exports.getAllMessages = (req, res, next) => {
    Message.find()
        .populate('user', 'username')
        .select("-__v")
        .exec()
        .then(messages =>{
            res.status(200).json(messages);
        }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
}