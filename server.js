const express = require('express');
const fs = require('fs');
const path = require("path");
const USER_ID = process.env.USER_ID;

const allFileContents = fs.readFileSync(path.join(__dirname, "data", "facts.txt"), 'utf-8');
var lines = allFileContents.split('\n')

console.log("Serving " + lines.length + " very fun facts.")

var app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use("/public", express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  var linenumber = Math.floor(Math.random()*lines.length)
  var line = lines[linenumber]
  console.log("Showing fun fact " + linenumber+ ": " + line)
  res.render("index", {userid: USER_ID, fact: line});
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})