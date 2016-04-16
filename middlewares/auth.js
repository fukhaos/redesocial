'use strict'

const jwt = require('jsonwebtoken')
const secret = require('../config/secret');
const User = require('../models/user');

let authMiddleware = (req, res, next) => {
  let token = req.headers.token;
  let decode = jwt.decode(token, secret)



  console.log("DECODE "  + decode);

  if (token && decode){
    req.user = decode._id;
    User.findOne({_id: decode._id}, (err, user) => {
      console.log(user);
      if (err) return res.json({success: false, msg: err});

        if (user){
          next();
        }else{
          return res.status(403).send({
            success: false,
            msg: "Falha na autenticacao, usuario não encontrado"
          });
        }

    })
  }else{
    return res.status(403).send({
      success: false,
      msg: "Token invalido"
    });
  }

}

module.exports = authMiddleware;
