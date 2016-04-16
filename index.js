'use strict'
const mongoose = require("./config/db");

let express = require('express');
let bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.urlencoded({extends: true}));
app.use(bodyParser.json());
app.use(bodyParser());

app.listen(3000, () =>{
  console.log("Rodando na porta 3000");
})
