const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    message: {type: String, required: false},
    image: {type: String, required: false},
    sent_time: {type: Date, required: true, default: Date.now()},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}

});

module.exports = mongoose.model('Message', messageSchema);