myApp.controller('UsersController', function(UserFactory, $location, $scope) {
	
	var that = this;

	// for checking whether it's a searchable name. I should put this elsewhere.
	isSearchable = function(text) {
		var regex = /^[a-z ,.'-]+$/i;
		return regex.test(text);
	}


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
				console.log(callback);
			});
		}
	},





	this.test = function() {
		console.log("in the test method of angular users controller. Hello Angular");
	}

})











