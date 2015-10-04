var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'school_app'
});

var mongoose = require('mongoose');
var User = mongoose.model('User');

connection.connect();

module.exports = (function() {
    return {
        create: function(req, res) {
            // ".toISOString" is a method to put js dates into sql-friend format;
            var date = new Date().toISOString()
            req.body.created_at = date;
            req.body.updated_at = date;
            console.log(req.body, 'checking dates');
            var post = {first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, password: req.body.password, created_at: req.body.created_at, updated_at: req.body.created_at};
            console.log(req.body, "im in the users controller, trying to create a new user");
            connection.query("SELECT * FROM users WHERE users.email = " + "'" + req.body.email + "'", function(error, user, fields) {
                    if (error) {
                        console.log(error);
                        res.json(error);
                    } else {
                        console.log("here", user);
                        if (typeof user[0] == 'undefined') {
                            console.log('valid login!!')
                            connection.query("INSERT INTO users SET ?", post, function(error, results) {
                                if (error) {
                                    console.log(error, "database error in users controller");
                                    res.json(error)
                                } else {
                                    connection.query("SELECT * FROM users WHERE users.email = "+"'" + req.body.email + "'", function(error, user, fields) {
                                        if (error) {

                                        } else {
                                            console.log(user, "here is the user");
                                            console.log(user[0].id);
                                            var mongoose_user = {
                                                first_name: user[0].first_name,
                                                last_name: user[0].last_name,
                                                sql_id: user[0].id
                                            }
                                            user_to_save = new User(mongoose_user);
                                            user_to_save.save(function(error) {
                                                if(error) throw error;
                                            })
                                            req.session.user_id = user[0].id
                                        }
                                    })
                                    res.json(results);
                                }
                            });
                        } else {
                            console.log("duplicate user");
                        //     // again, this error stuff is for iOS. The iOS app will crash if it sends that request and gets nil back. it needs a value.
                            res.json("duplicate user");

                            }
                    }
                });
        },

        findOne: function(req, res) {
            console.log(req.body);
            console.log("in users controller, trying to log in");
            connection.query("SELECT * FROM users WHERE users.email = " + "'" + req.body.email + "'" + " AND users.password = " + "'" + req.body.password + "'", function(error, user, fields) {
                if (error) {
                    console.log(error);
                    res.json(error, "<-----error in query. Users controller findone method");
                } else {
                    console.log(user);
                    if(typeof user[0] == 'undefined') {
                        res.json('incorrect username and/or password');
                    } else {
                        // You MUST set the session before you send the res.json
                        req.session.user_id = user[0].id;
                        res.json(user[0]);
                    }
                }
            });
        },

        findOneById: function(req, res) {
            console.log("in user controller trying to get current user from the session");
            connection.query("SELECT * FROM users WHERE users.id = " + "'" + req.body.user_id + "'", function(error, user, fields) {
                if (error) {
                    console.log(error);
                    res.json(error, "<-----error in query. Users controller findOneById method");
                } else {
                    res.json(user);
                    console.log(user, "looging user");
                }
            })
        },
        // here is where the live search by name takes place 
        findOneByName: function(req, res) {
            if(req.body.user_search.length > 2) {
                req.body.user_search = "%" + req.body.user_search + "%"
            }
            connection.query("SELECT * FROM users WHERE users.first_name LIKE " + "'" + req.body.user_search + "'" + "OR users.last_name LIKE " + "'" + req.body.user_search + "'", function(error, users, fields) {
                console.log(users, "here are the users from the query")
                if (error){
                    res.json(error, "error");
                } else {
                    res.json(users);
                    console.log(users, "users");
                }
            })

            // fucntion to use mongodb
            // User.find({first_name: req.body.user_search}, function(error, results) {
            //     if (error) {
            //         console.log(error)
            //     } else {
            //         console.log(results, "here in results");
            //     }
            // })
        },
        insert_image: function(req, res) {
            console.log(req);
            connection.query("UPDATE users SET imgurl =" + "'" + req.image + "'" + "WHERE id =" + "'" + req.id + "'",
            function(error, users, first_name) {
                if (error) {
                    console.log(error);
                } else {
                    res.json({});
                }
            })
        }

    //write next method here
    }
})();