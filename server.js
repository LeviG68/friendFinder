

var express = require('express');
var bodyParser = require("body-parser");
var path = require('path');

var app = express();
var PORT = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);

app.listen(PORT, function(){
    console.log("App listening on PORT "  + PORT);
  });
  

// app.get("/api/friends", function (req, res) {

//     return res.json(example);
// });

// app.get("/survey", function (req, res) {
//     res.set({ 'content-type': 'application/javascript' })
//     res.sendFile(path.join(__dirname, "./app/public/survey.html"));
// });


// app.get("*", function (req, res) {
//     res.set({ 'content-type': 'application/javascript' })
//     res.sendFile(path.join(__dirname, "./app/public/home.html"));
// });



