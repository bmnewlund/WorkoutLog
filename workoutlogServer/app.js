var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var sequelize = require('./db.js');

var User = sequelize.import('./models/user.js');


// * DANGER: This will drop (delete) the user table if uncommented.
// User.sync({force: true});

// User.sync({force:true});

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









