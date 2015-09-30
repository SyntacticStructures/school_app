var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/',{
                // templateUrl: '../partials/welcome.html/'
        })
        .when('/new',{
                templateUrl: '../partials/create.html'
        })
        // .when('/show_one',{
        // 		templateUrl:'../partials/create.html'
        // })
        .when('/show_one',{
        		templateUrl:'../partials/show_one.html'
        })
        // .when('/answer', {
        // 		templateUrl:'../partials/answer.html'
        // })
        .otherwise({
            redirectTo: '/'
        });
});