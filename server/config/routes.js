//   // This is our routes.js file located in /config/routes.js
//   // This is where we will define all of our routing rules!
//   // We will have to require this in the server.js file (and pass it app!)
//   // First at the top of your routes.js file you'll have to require the controller
// var questions = require('/Users/Computer/Documents/Coding/full_mean/black_belt/server/controllers/questions.js');
var users = require('/Users/Computer/Documents/Coding/Schools/Schools/server/controllers/users.js');
var session = require('express-session');
// // var products = require('/Users/Computer/Documents/Coding/full_mean/black_belt/server/controllers/products.js');
module.exports = function(app) {
//     /*---------->>>>>CUSTOMERS<<<<<----------*/
    app.post('/users/', function(req, res){
        console.log('I am in routes and registering');
        console.log(req.body);
        users.create(req, res);
        
    })
    app.post('/login/', function(req, res){
    	console.log("I am in routes and loggin in");
    	console.log(req.body);
    	users.findOne(req, res);
    })
//     app.post('/logout', function(req, res){
//         console.log('I am in routes and logging out');
//         req.session.destroy();
//     })
    app.post('/current_user/', function(req,res){
    	req.body.user_id = req.session.user_id;
    	users.findOneById(req, res);
        // res.json(req.session.user_id);
    })

    app.post('/search_user/', function(req, res) {
    	console.log(req.body);
    	users.findOneByName(req, res);
    })
// 	app.get('/questions', function(req, res){
//         console.log('i am in routes, on my way to get questions');
// 		questions.show(req, res);
// 	})
//     app.post('/add_question', function(req, res){
//         console.log('i am in routes, on my way to add a question');
//         questions.create(req, res, function(){
//         });
//     })
//     app.post('/add_answer', function(req, res){
//         console.log('i am in routes, on my way to add an answer');
//         questions.put(req, res, function(){
//             res.json(req.body);
//         })
//     })
//     app.post('/vote', function(req, res){
//         console.log('i am in routes, on my way to add a vote');
//         questions.update(req, res, function(){
//         });
//     })
//     // // note how we are delegating to the controller and passing along req and res
//     app.post('/delete', function(req, res){
//         console.log('i am in routes, on my way to delete a question');
//         questions.delete(req, res, function(){ 
//             res.json(req.body);
//         });
//     })
};