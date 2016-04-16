'use strict'

const express = require('express');
const authRoute = express.Router();
const User = require("../models/user");



authRoute.post("/login", (req, res) => {
  User.findOne({
    email: req.body.email
  }, 'name email password', (err, user) => {
    if (err) return res.json({success: false, msg: err});

    if (!user) {
      res.json({success: false, msg: "Falha na autenticacao"});
    }else{
      user.comparePassword(req.body.password, function (err, isMatch){
        if (isMatch && !err){
            res.json({sucess: true, token: "AAAA"});
        }else{
          res.json({sucess: false, msg: "Falha na autenticacao senha inváalida"});
        }
      });
    }
  })
});


authRoute.post("/signup", (req, res) => {
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

    res.json({success: true, msg: "Usuário criado"});
  })

})




module.exports = authRoute;
