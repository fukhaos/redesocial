'use strict'

const mongoose = require('./config/db.js');

const userSchema = mongoose.Schema({
  name: {type: String, required: true},
  email : {type: String, required: true},
  password: {type: String, required: true},
  photo: String,
  friends: [
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  ]
})

exports.model = mongoose.model( 'User', userSchema);
