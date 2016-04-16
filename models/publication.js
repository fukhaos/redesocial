'use strict'

const mongoose = require('./config/db.js');

const publicationSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
  msg : {type: String, required : true},
  created: {type: String, default : Date.now},
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
    msg : {
      type: String,
      required : true
    },
  }]
})

module.exports = mongoose.model( 'Pubblication', publicationSchema);
