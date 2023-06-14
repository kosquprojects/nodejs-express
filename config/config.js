var mysql = require('mysql');
var email = require("emailjs");

var extraCode = require("../utils/extraCode");

var logger = require('logger').createLogger(); // logs to STDOUT
var logger = require('logger').createLogger('./log/' + extraCode.formatdateYYMMDD(new Date()) + '-development.log');


var pool = mysql.createPool({
    connectionLimit: 100000,
    host: 'localhost',
    user: 'root',
    password: 'Admin@123',
    database: 'db_evim_new',
    multipleStatements: true
})
    // mailserver = email.server.connect({
    //     user: "",
    //     password: "",
    //     host: "smtp.gmail.com",
    //     ssl: true//,
    //     //port:465
    // })

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            logger.error('Database connection was closed.' + err.code)
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            logger.error('Database has too many connections.' + err.code)
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            logger.error('Database connection was refused.' + err.code)
            console.error('Database connection was refused.')
        }
    }
    if (connection) connection.release()

    logger.info('Connection release.')
    return
})
module.exports = { pool };
/* module.exports = {
    connection: mysql.createConnection({
        connectionLimit: 100000, //focus it
        host: '127.0.0.1',
        user: 'root',
        password: 'Admin@123',
        database: 'vishwind1',
        multipleStatements: true,
        port: 3306
    }),
	
	mailserver: email.server.connect({
	/* user:    "powamc@powericaltd.com", 
	password:"fqlicuf9", 
	user:    "thisisminedarling@gmail.com", 
	password:"psgkasss@123", 
	host:    "SMTP.gmail.com", 
	ssl: true,
	port:465
})
*/
