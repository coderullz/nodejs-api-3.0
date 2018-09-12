const express = require('express');
const morgan = require('morgan');
const app = express();
const body_parser = require('body-parser');

const Connection = require('./api/db/dbconn');

//Connecting To MYSQL DataBase----------------------------------------------------->
Connection.connect((err) => {
    if (err) throw err;
    console.log(`success: connection successful..!`);
});



app.use(morgan('dev'));

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

app.use('/department/signup', require('./api/routes/signup'));
app.use('/department/login', require('./api/routes/login'));


//HANDLING CORS ERRORS------------------------------------------------------------->
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        res.status(200).json({});
    }
    next();
});


//HANDLING ERRORS--------------------------------------------------------------------->
app.use((req, res, next) => {
    const error = new Error('something occured an unhandled exception...');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    console.log(`Error: ${error.message}`);
    res.status(error.status || 500).json({
        Error: {
            message: error.message
        }
    });
});

module.exports = app;