

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

// var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

var friendData = require('../../app/data/friends.js');
  console.log(friendData);

module.exports = function (app) {
  app.get('/api/friends', function(req, res) {
    res.json(friendData);
  })

  app.post('/api/friends', function(req, res) {
    var newFriend = req.body;

    for(var i = 0; i < newFriend.scores.length; i++) {
      if(newFriend.scores[i] == "1 (strongly Disagree)") {
          newFriend.scores = 1;

      } else if(newFriend.scores[i] == "5 (Strongly Agree)") {
          newFriend.scores = 5;

      } else {
          newFriend.scores[i] = parseInt(newFriend.scores);
      } 
    }

    var differencesArray = [];

    for(var i = 0; i < friendData.length; i++) {
      var compairedFriend = friendData[i];
      var totalDifference = 0;
      for (var k = 0; k < compairedFriend.scores.length; k++) {
        var difference1Score = Math.abs(compairedFriend.scores[k] = newFriend.scores[k]);
        totalDifference += difference1Score;
      }
      differencesArray[i] = totalDifference;
    }

    var bestFriendNum = differencesArray[0];
    var bestFriendIndex = 0;
    for( var i = 0; i <differencesArray.length; i++) {

      if(differencesArray[i] < bestFriendNum) {
        bestFriendNum = differencesArray[i];
        bestFriendIndex = i;
      }
    }
    friendData.push(newFriend);
    res.json(friendData[bestFriendIndex]);
  })
}
