module.exports = {
    friendsTable: [{
        "name": "Will",
        "photo": "https://avatars0.githubusercontent.com/u/3434676?s=460&v=4",
        "scores": [
            "4",
            "2",
            "5",
            "1",
            "3",
            "2",
            "2",
            "1",
            "3",
            "2"]
    },
    {
        "name": "Juju",
        "photo": "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dianapic-1498772380.jpg?crop=1.00xw:0.969xh;0,0&resize=980:*",
        "scores": [
            "3",
            "3",
            "3",
            "3",
            "3",
            "3",
            "3",
            "3",
            "3",
            "3"]
    },
    {
        "name": "O.G.",
        "photo": "https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Ftimedotcom.files.wordpress.com%2F2018%2F01%2Fgettyimages-587826918.jpg&w=800&c=sc&poi=face&q=85",
        "scores": [
            "2",
            "2",
            "2",
            "2",
            "2",
            "2",
            "2",
            "2",
            "2",
            "2"]
    },
    ],
    closestMatch: function (friend) {
        console.log('ENTERED CLOSEST MATCH');
        var closestFriend = [];
        var lowestScoreDelta = 41; // For this 10 question survey the 4 would be the largest spread, therefore 40 would be the maximum difference any 2 friends could differ.
        this.friendsTable.forEach(element => {
            console.log('ENTERED FOREACH');
            //compare are results
            var caseResult = 0;
            var questionDelta = null;
            for (var i = 0; i < element.scores.length; i++) {
                console.log('ENTERED SCORES LOOP');
                questionDelta = friend.scores[i] - element.scores[i];
                //if negative, convert to positive value
                if (questionDelta < 0) {
                    questionDelta *= -1;
                }
                caseResult += questionDelta;
            }
            console.log('OUT SCORES LOOP');
            //if the result is equal to the current lowest
            if (caseResult === lowestScoreDelta) {
                //lowestScoreDelta stays the same
                //add element o closeFriend array
                closestFriend.push(element);
            } else if (caseResult < lowestScoreDelta) { //if the result is the new lowest
                //update lowestScore Delta 
                lowestScoreDelta = caseResult;
                //reset closestFriend array to a single element
                closestFriend.length = 0;
                closestFriend[0] = element;
            }
        });
        return closestFriend;
    },
    setMatches: function (done) {
        console.log('ENTERED CLOSEST MATCH');
        for (var index = 0; index < this.friendsTable.length; index++) {
            var friend = this.friendsTable[index];
            var closestFriend = [];
            var furthestFriend = [];
            var lowestScoreDelta = 41; // For this 10 question survey the 4 would be the largest spread, therefore 40 would be the maximum difference any 2 friends could differ.
            var highScoreDelta = 0;

            for (var i = 0; i < this.friendsTable.length; i++) {
                var testElement = this.friendsTable[i];
                console.log('ENTERED for loop');
                //compare are results
                if (i != index) {
                    console.log('Not equal');
                    //compare are results
                    var caseResult = 0;
                    var questionDelta = null;
                    for (var j = 0; j < testElement.scores.length; j++) {
                        console.log('ENTERED SCORES LOOP');
                        questionDelta = friend.scores[j] - testElement.scores[j];
                        //if negative, convert to positive value
                        if (questionDelta < 0) {
                            questionDelta *= -1;
                        }
                        caseResult += questionDelta;
                    }
                    console.log('OUT SCORES LOOP');
                    //if the result is equal to the current lowest
                    if (caseResult === lowestScoreDelta) {
                        //lowestScoreDelta stays the same
                        //add element o closeFriend array
                        console.log('closestFriend=' + i)
                        closestFriend.push(i);
                    } else if (caseResult < lowestScoreDelta) { //if the result is the new lowest
                        //update lowestScore Delta 
                        lowestScoreDelta = caseResult;
                        console.log('closestFriend=' + i);
                        //reset closestFriend array to a single element
                        closestFriend.length = 0;
                        closestFriend[0] = i;
                    }
                    
                    if (caseResult === highScoreDelta) {
                        furthestFriend.push(i);
                    } else if (caseResult > highScoreDelta) {
                        highScoreDelta = caseResult;
                        furthestFriend.length = 0;
                        furthestFriend[0] = i;
                    }
                }
            }
            console.log("index=" + index);

            this.friendsTable[index].closest = closestFriend;
            this.friendsTable[index].closestDelta = lowestScoreDelta;
            this.friendsTable[index].furthest = furthestFriend;
            this.friendsTable[index].furthestDelta = highScoreDelta;
        }
      
        done(this);
    },
}