myApp.factory('UserFactory', function($http) {
	var factory = {};
	var current_user = {};
	var search_text = {};
	factory.addUser = function(new_user, callback) {
		console.log('in addUser factory');
		$http.post('/users/', new_user).then(function(response){
			// this response.data is going to be my error from the backend. So far, successful creation produces undf res.
			console.log(response.data);
		});
	},
	factory.loginUser = function(user, callback) {
		$http.post('/login/', user).then(function(response){
			console.log(response.data);
			if (typeof(response.data.id) == "number") {
				// send word back to the controller of your SUccessful journey AND set the current user in the factory
				callback(response.data);
			} else {
				// send word back to the controller of your UNsuccessful journey
				callback("invalid login");
			}
		})
	},
	factory.getCurrentUser = function(callback) {
		$http.post('/current_user/').then(function(response){
			callback(response.data);
		})
	},
	factory.getUserByFirstName = function(text, callback) {
		console.log("in angular users factory getUserByFirstName method");
		$http.post('/search_user/', text).then(function(response) {
			console.log("response in the getUserbyfristNamecontroller")
			// callback(response);
		})
	}
	return factory;
});