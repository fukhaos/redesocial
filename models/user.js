'use strict'

const mongoose = require('../config/db.js');
var bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
  name: {type: String, required: true},
  email : {type: String, required: true, unique: true},
  password: {type: String, required: true},
  photo: String,
  friends: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    }
  ]
})

userSchema.pre('save', function (next){
  var user = this;
  if (this.isModified("password") || this.isNew){

    bcrypt.genSalt(10, (err, salt)=> {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      })
    })
  }else{
    next();
  }
})


userSchema.methods.comparePassword = function (passw, cb){
  bcrypt.compare(passw, this.password, function(err, isMatch){
    if (err){
      return cb(err);
    }

    cb(null, isMatch);
  })
}

module.exports = mongoose.model( 'User', userSchema);
