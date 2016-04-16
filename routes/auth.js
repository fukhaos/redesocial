'use strict'

const express = require('express');
const authRoute = express.Router();
const User = require("../models/user");
const jwt = require('jsonwebtoken');
const secret = require('../config/secret');



authRoute.post("/login", (req, res) => {
  var where = { email: req.body.email };
  var select = 'name email password';

  User.findOne(where, select, (err, user) => {
    if (err) return res.json({success: false, msg: err});

    if (!user) {
      res.json({success: false, msg: "Falha na autenticacao"});
    }else{
      user.comparePassword(req.body.password, function (err, isMatch){
        if (isMatch && !err){
          let token = jwt.sign({_id: user._id}, secret);
            res.json({sucess: true, token: token});
        }else{
          res.json({sucess: false, msg: "Falha na autenticacao senha inválida"});
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
