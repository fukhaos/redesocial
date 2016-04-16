'use strict'

const mongoose = require('./config/db.js');

const publicationSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  msg:String,
  created: Date,
  comments: [{
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    msg: String
  }]
})

exports.model = mongoose.model( 'Pubblication', publicationSchema);
