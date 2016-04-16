'use strict'

const express = require('express');
const authRoute = express.Router();
const User = require("../models/user");


authRoute.post("/signup", function (req, res)){
  var newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })

  newUser.save((err, user) => {
    if (err){
      if (err.code == 110000){
        err = "Email já existe";
      }

      return res.json({success: false, msg: err});
    }

    return res.json({success: true, msg: "Usuário criado"});
  })

}




module.exports = authRoute;
