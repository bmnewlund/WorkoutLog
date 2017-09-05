var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var sequelize = require('./db.js');

var User = sequelize.import('./models/user');


// * DANGER: This will drop (delete) the user table if uncommented.
// User.sync({force: true});



User.sync();

app.use(bodyParser.json());


app.use(require('./middleware/headers'));

app.use('/api/test', function(req, res){
	res.send("Hello World");
});


app.listen(3000, function(){
	console.log("app is open on 3000!");
});





// Data Model



app.post('/api/user', function(req,res) {
	var username = req.body.user.username;
	var pass = req.body.user.password;
	// Need to create a user object and use sequelize to put into 
	// the db
	
	User.create({
		username: username,
		passwordhash: pass
	}).then(
	// Sequelize is going to return the object it created from the db.
		function createSuccess(user){
			res.json({
				user: user,
				message: 'create'
			})
		
		},
		function createError(err){
			res.send(500, err.message);
		}
	);
	// Need to create a user object and use sequelize to put that user into
	// our database
});





