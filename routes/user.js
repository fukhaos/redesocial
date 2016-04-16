'use strict'

const express = require('express');
const userRoute = express.Router();
const User = require("../models/user");

userRoute.get("/", (req, res) => {
  let where = {};

  if (req.query.name){
    where.name = new RegExp(req.query.name, 'i'); //sem casesensitive
  }

  User.find(where, "name email", (err, users) => {
    if (err) return res.json({success: false, msg: err});

    res.json({success: true, users: users});
  })
})


module.exports = userRoute;
