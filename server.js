const express = require('express');
const fs = require('fs');
const path = require("path");
const bodyParser = require('body-parser');

//get username and password from environment
const PASSWORD = process.env.FACTS_PASSWORD;
const USER_ID = process.env.GITHUB_USER;
var loggedIn = false

//read facts data file and parse
const allFileContents = fs.readFileSync(path.join(__dirname, "data", "facts.txt"), 'utf-8');
var lines = allFileContents.split('\n')

//setup express
var app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

//main page
app.get('/', function (req, res) {
  //simple one session login
  if(!loggedIn)
  {
    return res.redirect('/Login');
  }

  //get a random fact and return page
  var fact = getFunFact()
  console.log("Showing fun fact: " + fact)
  res.render("index", {fact: fact});
})

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/static/login.html');
});

app.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  console.log("Received login request for: " + username)

  //check username and password and log user in
  if(username != USER_ID || password != PASSWORD || password == "")
  {
    loggedIn = false;
    res.send("Login Failed. Invalid username or password.")
  }else{
    loggedIn = true;
    return res.redirect('/');
  }
});

function getFunFact()
{
  var linenumber = Math.floor(Math.random()*lines.length)
  return lines[linenumber]
}

//Start server and listen on 8081
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Fun facts listening at http://%s:%s", host, port)
})