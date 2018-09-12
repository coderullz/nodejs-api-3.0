const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../db/dbconn');

exports.login = (req, res, next) => {
    const email = req.body.email;
    const query = `SELECT * FROM signup WHERE user_email = '${email}'`;
    db.query(query, (err, result) => {
        if(err) {
            console.log(err);
        }
        else if(result.length < 1) {
            console.log(`Error: user not found..`);
            res.status(404).json({
                Error: {
                    info: 'user not found..'
                }
            });
        }
        else {
            //console.log(result);
            bcrypt.compare(req.body.password, result[0].user_password, (err, resp) => {
                if(err) {
                    console.log(err);
                }
                else if(resp) {
                    //console.log(resp);
                    const token = jwt.sign({
                        id: result[0].user_id,
                        email: result[0].user_email,
                        password: result[0].user_password
                    },
                    process.env.JWT_KEY, {
                        expiresIn: '1h'
                    });
                    console.log(`success: you just logged in to user...`);
                    res.status(200).json({
                        success: {
                            info: 'login successful..',
                            token: token
                        }
                    });
                }
                else {
                    console.log(`Error: email or password not vailid..`);
                    res.status(404).json({
                        Error: {
                            info: 'invailid email or password..'
                        }
                    });
                }
            
            });
        }
        
    });
};