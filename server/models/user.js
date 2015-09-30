var mongoose = require("mongoose");

var FriendSchema = new mongoose.Schema({
	first_name:String,
	last_name:String,
	sql_id:Number
});

mongoose.model("User", FriendSchema)