const bcrypt = require('bcrypt');

const db = require('../db/dbconn');

exports.post = (req, res, next) => {
    const query = `SELECT * FROM signup WHERE user_email = '${req.body.email}'`;

    db.query(query, (err, result) => {
        if (err) {
            console.log(`Error: ${err.message}`);
            res.status(404).json({
                Error: {
                    message: err.message
                }
            });
        } else if (result.length >= 1) {
            console.log(`Error: duplicate email id..`);
            res.status(404).json({
                Error: {
                    message: `duplicate email id..`
                }
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(hash);
                    const query = 'INSERT INTO signup SET ?';
                    const data = { user_email: req.body.email, user_password: hash };

                    db.query(query, data, (err, result) => {
                        if (err) console.log(err);
                        console.log(`success: ${result}`);
                        res.status(200).json({
                            info: `you just requested to make a user..`,
                        });
                    });
                }
            });
        }
    });
};


exports.get_all = (req, res, next) => {
    const query = 'SELECT * FROM signup';
    db.query(query, (err, result) => {
        if (err) {
            console.log(`Error: ${err.message}`);
            res.status(404).json({
                Error: {
                    message: err.message
                }
            });
        } else if (result.length >= 1) {
            const resp = result.map(user => {
                return {
                    id: user.user_id,
                    email: user.user_email,
                    password: user.user_password,
                    request: {
                        type: 'GET',
                        discription: 'check out the link bellow to get more details..',
                        url: `http://localhost:9000/department/signup/${user.user_id}`
                    }
                }
            });
            console.log(`success: ${result}`);
            res.status(200).json({
                info: `you just requested to get all data..`,
                success: resp
            });
        } else {
            console.log(`Error: data not found..`);
            res.status(404).json({
                Error: {
                    message: `data not found..`
                }
            });
        }
    });
};


exports.get_unique = (req, res, next) => {
    const userId = req.params.id;
    const query = `SELECT * FROM signup WHERE user_id = ${userId}`;

    db.query(query, (err, result) => {
        if (err) {
            console.log(`Error: ${err.message}`);
            res.status(404).json({
                Error: {
                    message: err.message
                }
            });
        } else if (result.length >= 1) {
            console.log(`success: ${result}`);
            res.status(200).json({
                info: `you just requested to get the user uniquely..`,
                success: result
            });
        } else {
            console.log(`Error: data not found..`);
            res.status(404).json({
                Error: {
                    message: `data not found..`,
                }
            });
        }
    });
}


exports.delete = (req, res, next) => {
    const userId = req.params.id;
    const querySelect = `SELECT * FROM signup WHERE user_id = ${userId}`

    db.query(querySelect, (err, result_1) => {
        if (err) {
            console.log(`Error: ${err.message}`);
            res.status(404).json({
                Error: {
                    message: err.message
                }
            });
        } else if (result_1.length >= 1) {
            const queryDelete = `DELETE FROM signup WHERE user_id = ${result_1[0].user_id}`;

            db.query(queryDelete, (err, result_2) => {
                if (err) {
                    console.log(`Error: ${err.message}`);
                    res.status(404).json({
                        Error: {
                            message: err.message
                        }
                    });
                }
                console.log(`success: ${result_2}`);
                res.status(200).json({
                    info: `you just requested to delete a user..`,
                    success: result_2
                });
            });
        } else {
            console.log(`Error: data not found to delete..`);
            res.status(404).json({
                Error: {
                    message: `data not found to delete..`,
                }
            });
        }
    });
};


exports.patch = (req, res, next) => {
    const userId = req.params.id;
    const query = `SELECT * FROM signup WHERE user_id = ${userId}`;

    db.query(query, (err, result_1) => {
        if (err) {
            console.log(`Error: ${err.message}`);
            res.status(404).json({
                Error: {
                    message: err.message
                }
            });
        } else if (result_1.length >= 1) {
            if (result_1[0].user_email === req.body.email) {
                console.log(`Error: user email already taken..`);
                res.status(404).json({
                    Error: {
                        message: `user email already taken..`
                    }
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        console.log(`Error: ${err.message}`);
                        res.status(404).json({
                            Error: {
                                message: err.message
                            }
                        });
                    } else {

                        const query = `UPDATE signup SET ? WHERE user_id = ${userId}`;
                        const data = { user_email: req.body.email, user_password: hash };

                        db.query(query, data, (err, result) => {
                            if (err) {
                                console.log(`Error: ${err.message}`);
                                res.status(404).json({
                                    Error: {
                                        message: err.message
                                    }
                                });
                            }

                            const resp = {
                                request: {
                                    type: 'GET',
                                    discription: 'check out the link bellow to get the details of user you just updated..',
                                    url: `http://localhost:9000/department/signup/${userId}`
                                }
                            };
                            console.log(`success: ${result}`);
                            res.status(200).json({
                                info: `you just requested to update a user details..`,
                                success: resp
                            });
                        });
                    }
                });
            }
        } else {
            console.log(`Error: data not found..`);
            res.status(404).json({
                Error: {
                    message: `data not found..`
                }
            });
        }
    });
};