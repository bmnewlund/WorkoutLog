var router = require('express').Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var sequelize = require('../db.js');
var User = sequelize.import('../models/user.js');
router.post('/', function(req, res) {
	User.findOne( { where: { username: req.body.user.username } } ).then(
		function(user) {
			if (user) {
				bcrypt.compare(req.body.user.password, user.passwordhash, function(err, matches){
					if (matches) {
					   var token = jwt.sign({id: user.id}, "i_am_secret", {expiresIn: 60*60*24 });
						res.json({
							user: user,
							message: "successfully authenticated",
							sessionToken: token
						});
					}else {
					res.status(500).send({ error: "failed to authenticate" });
					}
				});
			} else {
				res.status(500).send({ error: "failed to authenticate" });
			}
		},
		function(err) {
			res.json(err);
		}
	);
});

module.exports = router;




// router.post('/', function(req,res) {
// 	var username = req.body.user.username;
// 	var pass = req.body.user.password;
// 	// Need to create a user object and use sequelize to put into 
// 	// the db
	
// 	User.create({
// 		username: username,
// 		passwordhash: bcrypt.hashSync(pass, 10)
// 	}).then(
// 	// Sequelize is going to return the object it created from the db.
// 		function createSuccess(user){
// 			var token = jwt.sign({id:user.id}, 'i_am_secret', {expiresIn: 60*60*24})
// 			res.json({
// 				user: user,
// 				message: 'created',
// 				sessionToken: token
// 			});
// 		}else {
// 			res.status(500).send({error: "failed to authenticate"});
// 			}
// 		else {
// 			res.status(500).send({error: "failed to authenticate"});
// 		}
// 		},
// 		function createError(err){
// 			res.send(500, err.message);
// 		}
// 	);
// 	// Need to create a user object and use sequelize to put that user into
// 	// our database
// });

// module.exports = router;