
let friends = require('../data/friends.js');

module.exports = function (app) {
  app.get('/api/friends', function(req, res) {
    res.json(friends);
  });

  app.post('/api/friends', function(req, res) {
    var newUser = req.body;
    console.log(newUser);

    var currentScore;
    var userIndex = 0;
    var totalDiff = 0;
    var diffAmount = 0;

    for (var i = 0; i < friends.length; i++) {
       var existing = friends[i].scores;
       diffAmount = 0;
       totalDiff = 0;
       for (var k = 0; k < newUser.scores.length; k++) {
         diffAmount = Math.abs(parseInt(existing[k])- parseInt(newUser.scores[k]));
         totalDiff += diffAmount
       }
       if (i === 0 ) {
         currentScore = totalDiff
       } else if ( totalDiff < currentScore) {
         currentScore = totalDiff;
         userIndex = i;

       }   
    }
    friends.push(newUser);

    var bestFriend = friends[userIndex];
    console.log(bestFriend);
    res.json({bestFriend});
  })    
}
