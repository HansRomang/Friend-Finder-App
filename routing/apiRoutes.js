var friends = require("../app/data/friends");


module.exports = function (app) {

	app.get("/api/friends", function (req, res) {

		res.json(friends);

	});
	
	
	app.post("/api/friends", function (req, res) {

		friends.push(req.body);
		
		var currentScores = req.body.scores;

		for (var i = 0; i < friends.length; i++) {

			var differenceInScores = 0;
			for (var j = 0; j < currentScores.length; j++) {

				differenceInScores += Math.abs(currentScores[j] - friends[i].scores[j]);

				friends[i].difference = differenceInScores;
			}

		};


		var sortingDifference = friends.slice(0);

			sortingDifference.sort(function (initialScore, secondScore) {

			return initialScore.difference - secondScore.difference;

		});
		//result to show if correct
		
		if (sortingDifference[0].name !== req.body.name) {

			res.json(sortingDifference[0]);

		} 
		else{

			res.json(sortingDifference[1]);

		}
	});
};

