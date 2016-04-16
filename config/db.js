'use strict'

const mongoose = require('mongoose');
const dbURI = "mongodb://localhost/redesocial"

mongoose.connect(dbURI);

mongoose.connection.on("connected",
  ()=>{
    console.log("mongoose connected: " + dbURI);
  })

mongoose.connection.on("error",
  (err)=>{
    console.log("mongoose error: " + err);
  })

mongoose.connection.on("disconnected",
  ()=>{
    console.log("mongoose disconnected");
  })

mongoose.connection.on("open",
  ()=>{
    console.log("mongoose open");
  })

  process.on("SIGINT", () => {
    mongoose.log("disconnected app termination");
    process.exit(0);
  })


module.exports= mongoose;
