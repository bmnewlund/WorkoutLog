$(document).ready(function(){
	$("#testAPI").on("click", function(){
		console.log("It is working");
	});
	var test = $.ajax({
		type:"GET",
		url:"http://localhost:3000/api/test"
	})
	.done(function(data){
		donsole.log(data);
	})
	.fail(function(){
		console.log("Oh no!");
	});
});