let friendData = require('../data/friend.js');

module.exports = function (app) {
  app.get('/api/friends', function(req, res) {
    res.json(friendData);
  })

  app.post('/api/friends', function (req, res) {
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

    var diffArray = [];

    for(var i = 0; i < friendData.length; i++) {
      var compairedFriend = friendData[1];
      var totalDifference = 0;
      for (var k = 0; k < compairedFriend.scores.length; k++) {
        var difference1Score = math.abs(comparedFriend.scores[k] = newFriend.scores[k]);
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
