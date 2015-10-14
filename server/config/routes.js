//   // This is our routes.js file located in /config/routes.js
//   // This is where we will define all of our routing rules!
//   // We will have to require this in the server.js file (and pass it app!)
//   // First at the top of your routes.js file you'll have to require the controller
// var questions = require('/Users/Computer/Documents/Coding/full_mean/black_belt/server/controllers/questions.js');
var users = require('/Users/Computer/Documents/Coding/Schools/Schools/server/controllers/users.js');
var session = require('express-session');
var formidable = require('formidable');
var fs = require('fs-extra');
// // var products = require('/Users/Computer/Documents/Coding/full_mean/black_belt/server/controllers/products.js');
module.exports = function(app) {
var tickets = [
    {
        'title': 'The network is down!',
        'desc': 'The network is down and I cannot perform my work'
    },
    {
        'title': 'I lost my pen',
        'desc': 'But I love you more than life itself.'
    },
    {
        'title': 'PC Load Letter',
        'desc': 'I wish I knew what it meant, but the printer is not working'
    },
    {
        'title': 'My account is locked',
        'desc': 'I know that my password was correct even though it failed.'
    }
];
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
    app.get('/logout', function(req, res){
        console.log('I am in routes and logging out');
        req.session.destroy();
    })
    app.post('/current_user/', function(req,res){
    	req.body.user_id = req.session.user_id;
    	users.findOneById(req, res);
        // res.json(req.session.user_id);
    })
    app.post('/search_user/', function(req, res){
    	users.findOneByName(req, res);
    })
    app.post('/add_image/', function(req, res){
        // this seems a bit excessive to be in routes. Ask nikki about that.
        var form = formidable.IncomingForm();
        // This is how you use formidable;
        var user = {};
        form.parse(req, function(err, fields, files){
            console.log('parsed');
        })
        form.on('field', function(key, value){
            user["'"+key+"'"] = value;
            console.log(user);
        })
        form.on('file', function(name, file){
            console.log('file--->',file);
            var temp_path = file.path;
            var og_name = file.name;
            var extension = og_name.split('.').pop();
            var file_name = randomString() + "." + extension;
            console.log(file_name);
            var new_location = "uploads/";
            user.photo = new_location + file_name;
            fs.copy(temp_path, new_location + file_name, function(err){
                if (err){
                    console.log(err);
                } else {
                    console.log("successfully added user");
                    user = {
                        id: req.session.user_id,
                        image: user.photo
                    }
                    users.insert_image(user, res);
                }
                res.redirect('/#/show_one');
            })
        })
        function randomString(){
            var characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var charLength = characters.length;
            randomString = ""
            length = 14;
            for (i=0; i < length; i++){
                var index = Math.floor(Math.random()*charLength);
                randomString += characters[index];
            }
            return randomString;
        }
        
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