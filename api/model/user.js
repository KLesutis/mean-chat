const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {type: String, required: true},
    password: {type: String, required: true},
    register_date: {type: Date, required: true, default: Date.now()},
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message', required: true}]
});

module.exports = mongoose.model('User', userSchema);