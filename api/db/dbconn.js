const mysql = require('mysql');


//Creating A Connection To MYSQL---------------------------------------------------->
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'roony',
    database: 'tempdb'
});



module.exports = connection;