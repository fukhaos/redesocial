'use strict'

const mongoose = require('./config/db.js');

const userSchema = mongoose.Schema({
  name: {type: String,
    required: [true, "Esqueceu o nome"]
  },
  email:String,
  password: String,
  photo: String  ,
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
})

exports.model = mongoose.model( 'User', userSchema);
