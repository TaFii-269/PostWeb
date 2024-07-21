import User from "../models/User.js";
import connection from "../../config/db/index.js";
import bcrypt from "bcrypt";
import Auth from "../helpers/Auth.js";

class AuthController {
    registerPage(req,res){
        res.render('register');
    }
    /* REGISTER
    ** path: /auth/resgister
    ** method: POST
    */
    async register(req, res) {
        // check if email is available
        const email = req.body.email; console.log(`Email: ${email}`);
        connection.connect().then(async (db) => {
            try {
                // check if email is already taken
                const result = await User.isAvailable(db, email);
                console.log(`Result: ${result}`);
                if (result) {
                    console.log('Email is already taken');
                    res.json({ message: 'Email is already taken' });
                } else {
                    // hashing password - saltRound = 10
                    bcrypt.hash(req.body.password, 10, function(err, hash) {
                        if(err) {
                            console.error(`Error: ${err}`);
                        } else {
                            console.log(`Hash: ${hash}`);
                            // create new user
                            connection.connect().then(async (db) => {
                                console.log('Creating new user');
                                const user = new User(undefined, req.body.name, req.body.email, hash, 'user');
                                user.save(db).then((result) => {
                                    res.redirect('/auth/login');
                                    console.log(`User created with ID: ${result.insertedId}`);
                                    // res.json(result);
                                });
                            });
                        }
                    });
                    /* ### Old Code: separeted genSalt and hashing
                    bcrypt.genSalt(10, function(err, salt) {
                        if (err) {
                            console.error(`Error: ${err}`);
                        } else {
                            bcrypt.hash(req.body.password, salt, function(err, hash) {
                                // Store hash and salt in database here
                                if (err) {
                                    console.error(`Error: ${err}`);
                                } else {
                                    console.log(`Hash: ${hash}`);
                                    console.log(`Salt: ${salt}`);
    
                                    if (hash) { // if hash is not null
                                        // create new user
                                        connection.connect().then(async (db) => {
                                            console.log('Creating new user');
                                            const user = new User(undefined, req.body.name, req.body.email, hash, salt);
                                            user.save(db).then(() => {
                                                // res.redirect('/login');
                                                console.log('User created');
                                                res.json({ message: 'User created' });
                                            });
                                        });
                                        
                                    }
                                }
                            });
                        }
                    });
                    */
                }
            } catch (err) {
                console.error(err);
            } finally {
                await connection.close();
            }
        });
    }

    /* LOGIN
    ** path: /auth/login
    ** method: POST
    */
   loginPage(req,res){
    res.render('login');
   }
    async login(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        console.log(`Email: ${email} | Password: ${password}`);
        connection.connect().then(async (db) => {
            try {
                const user = await User.findByEmail(db, email);
                console.log(typeof user);
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        console.error(err);
                    } else {
                        if (result) {
                            // create token
                            const token = Auth.createJWTToken(email);
                            res.cookie('token', token, {
                                httpOnly: true,
                                secure: false, // false if not using https | true if using https
                                sameSite: 'strict', // use 'strict', 'lax', or 'none'
                                maxAge: 3600000, // expired time, should set to match token expiry (1h)
                            });
                            res.redirect('/posts');
                            console.log("Login successful");
                            // res.json({ message: 'Login successful', token: token});
                        } else {
                            console.log('Login failed');
                            res.json({ message: 'Login failed' });
                        }
                    }
                });
            } catch (err) {
                console.error(err);
            }
        });
    }

    
}

export default new AuthController();