myApp.controller('UsersController', 'socket' function(UserFactory, socket, $location, $scope) {
	
	var that = this;

	// for checking whether it's a searchable name. I should put this elsewhere. Modularize, especially if you have multiple helper functions;
	isSearchable = function(text) {
		var regex = /^[a-z ,.'-]+$/i;
		return regex.test(text);
	}

	socket.on('ticket', function(message) {
		$scope.tickets.push(message);
	})

	this.addUser = function() {
		var new_user = that.new_user;
		UserFactory.addUser(new_user, function(callback) {
		});
	},
	this.loginUser = function() {
		var user = that.user;
		UserFactory.loginUser(user, function(callback) {
			if (callback != "invalid login") {
				console.log(callback, "callback from login");
				that.current_user = callback;
				$location.path("/show_one");
				// This doesn't work because of changing the location path.
			} else {
				console.log("invalid");
			}
		})
	},
	this.getCurrentUser = function() {
		UserFactory.getCurrentUser(function(callback) {
			that.current_user = callback;
		});
	},
	this.searchTextField = function() {
		console.log(that.search_text.user_search, "search text");
		if ( isSearchable(that.search_text.user_search) ){
			UserFactory.getUserByFirstName(that.search_text, function(callback) {
				that.search_results = callback;
			});
		}
	},





	this.test = function() {
		console.log("in the test method of angular users controller. Hello Angular");
	}

})











