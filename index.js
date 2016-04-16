'use strict'
const mongoose = require("./config/db");

let express = require('express');
let bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.urlencoded({extends: true}));
app.use(bodyParser.json());
app.use(bodyParser());

let authRoute = require("./routes/auth");
let userRoute = require("./routes/user");
let pubRoute = require("./routes/publication");
let authMiddleware = require("./middlewares/auth");

app.use("/auth", authRoute);
app.use("/api/", authMiddleware);
app.use("/api/users", userRoute);
app.use("/api/publication", pubRoute);
//app.use("/api/users", userRoute);

app.listen(3000, () =>{
  console.log("Rodando na porta 3000");
})
