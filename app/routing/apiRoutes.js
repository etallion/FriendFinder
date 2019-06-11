// ===============================================================================
// LOAD DATA
// We are linking our routes to a "data" source.
// The data source holds an array of information on friend and survey results
// ===============================================================================

var friendsData = require("../data/friends");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a survey... this data is then sent to the server...
  // Then the server saves the data to the friendData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to let users know if they have been added.
    // req.body is available since we're using the body parsing middleware

    //There are 2 main step that we want this post action to perform:
    
    //1. Return the closest matching friend that was existing the in the friendsData
    var results = friendsData.closestMatch(req.body)

    //2. add the new user (a new friend) to the friendsData 
    friendsData.friendsTable.push(req.body);

    

      res.json(results);
    
  });

  app.post("/api/closest", function(req, res) {
    var results = friendsData.closestMatch(req.body)
    res.json(results);
   
  });

  app.get("/api/allFriends", function(req, res) {
    
    //find everyone's closest match
    // var results = function(){;
    //     var newTable = friendsData.friendsTable;
    //     for(var i = 0; i < newTable.length; i++){
    //         newTable[i].closest = newTable.closestMatchByIndex(i); 
    //      }
    //      return newTable;
    // }
    
        friendsData.setMatches(function(results){
          console.log(JSON.stringify(results));
          res.json(results);
        }); 
        //res.json(friendsData);
  });

};
