'use strict'

const express = require('express');
const pubRoute = express.Router();
const Publication = require("../models/publication");


pubRoute.get("/:id?", (req, res) => {
  console.log(req.query);
  let where = req.query;

  if (req.params.id){
    where["_id"] = req.params.id;
  }

  Publication.find(where, (err, data)=> {
    res.json(err ? {error: err} : {publication: data})
  })
})


pubRoute.post("/:_id/comments", (req, res) => {

  Publication.findOne(req.params, (err, pub)=> {
    pub.comments.push(req.body);
    pub.save((err, pub)=>{
        res.json(err ? {error: err} : {success: 1})
    });
  })
})


pubRoute.post("/", (req, res) => {

  const c = {
    user: req.user,
    msg: req.body.msg,
  }

  //var pub = new Publication(req.body); //para maior seguranca foi removido
  var pub = new Publication(c);

  pub.save((err, data)=>{
      res.json(err ? {error: err} : {success: 1})
  });
})


module.exports = pubRoute;
