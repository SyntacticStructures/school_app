// using $rootScope for its event capabilities
// $scope.$apply is used to tell angular that that it needs to check the state of the app and update the templates if there was a change after running the callback passed to it.
myApp.factory('socket', function($rootScope){
	var socket = io.connect();
	factory.on = function(eventName, callback) {
		socket.on(eventName, function(){
			var args = arguments;
			$rootScope.$apply(function() {
				// here's the function you want to run
				callback.apply(socket, args);
			});
		});
	}
	factory.emit = function(eventName, data, callback) {
		socket.emit(eventName, data, function() {
			var args = arguments;
			$rootScope.$apply(function() {
				if(callback) {
					callback.apply(socket, args);
				}
			})
		})
	}
})