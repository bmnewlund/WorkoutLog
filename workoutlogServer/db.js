var Sequelize = require('sequelize');
var sequelize = new Sequelize('workoutlog', 'postgres', 'postgresadvent1952', {
	host: 'localhost',
	dialect: 'postgres'
});

sequelize.authenticate().then(
	function() {
		console.log('connected to workoutlog postgres db');
	},
	function(err){
		console.log(err);
	}
);
var User = sequelize.important('./models/user');

module.exports=sequelize;