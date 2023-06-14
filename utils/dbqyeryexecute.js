// const {
//     Pool,
//     Client
// } = require('pg');
// const connectionString = process.env.DATABASE_URL || "postgres://postgres:Admin@123@localhost:5434/db_vertiv";
const mysql = require('mysql');
//var log4js = require('log4js');
//var log = log4js.getLogger("app");
var pool = mysql.createPool({
    connectionLimit: 100000, 
        host: '127.0.0.1',
        user: 'root',
        password: 'Admin@123',
        database: 'qr_attendance',
        multipleStatements: true,
        port: 3306,
        timeout:500000
});

module.exports = {
    // nodeServerBridge: function (obj) {
    //     const pool = new Pool({
    //         connectionString: connectionString,
    //       });
    //     return new Promise(function (resolve, reject) {
    //         pool.query(obj.queryString, obj.arr, function (error, results) {
    //             try {
    //                 if (error) {
    //                     reject(error);
    //                 } else {
    //                     resolve(results);
    //                 }
    //             } catch (err) { 
    //                 reject(err);
    //             }
    //         });
    //         pool.end();
    //     });
    // },
	
	    queryExexute: function (obj) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                if (err) {
                    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                        console.error('Database connection was closed.')
                    }
                    if (err.code === 'ER_CON_COUNT_ERROR') {
                        console.error('Database has too many connections.')
                    }
                    if (err.code === 'ECONNREFUSED') {
                        console.error('Database connection was refused.')
                    }
                    return reject(err);
                }
                connection.query(obj.queryString, obj.arr, function (error, results) {
                    if (connection) connection.release();
                    try {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(results);
                        }
                    } catch (err) {
                        console.log("Json Error : " + err)
                        reject(err);
                    }
                })
            });
        });
    },

    executeSelect: function (obj) {
        // return new Promise(function (resolve, reject) {
        //     pool.query(obj.queryString, obj.arr, function (error, results) {
        //         pool.release();
        //         try {
        //             if (error) {
        //                 reject(error);
        //             } else {
        //                 resolve(results);
        //             }
        //         } catch (err) {
        //             console.log("Json Error : " + err)
        //             var errMess = '';
        //             reject(err);
        //         }
        //     })
        // });
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                if (err) {
                        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                            console.error('Database connection was closed.')
                        }
                        if (err.code === 'ER_CON_COUNT_ERROR') {
                            console.error('Database has too many connections.')
                        }
                        if (err.code === 'ECONNREFUSED') {
                            console.error('Database connection was refused.')
                        }
                    return reject(err);
                }
                connection.query(obj.queryString, obj.arr, function (error, results) {
                    if (connection) connection.release();
                    try {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(results);
                        }
                    } catch (err) {
                        console.log("Json Error : " + err) 
                        reject(err);
                    }
                })
            });
        });
    },
    executeMultiple: function (obj) {
        
       
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                if (err) {
                        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                            console.error('Database connection was closed.')
                        }
                        if (err.code === 'ER_CON_COUNT_ERROR') {
                            console.error('Database has too many connections.')
                        }
                        if (err.code === 'ECONNREFUSED') {
                            console.error('Database connection was refused.')
                        }

                    return reject(err);
                }
                connection.query(obj.queryString, [obj.arr], function (error, results) {
                    if (connection) connection.release();
                    try {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(results);
                        }
                    } catch (err) {
                        console.log("Json Error : " + err) 
                        reject(err);
                    }
                })
            });
        });
    },

    // connect_pool: function (query) {
    //     const pool = new Pool({
    //         connectionString: connectionString,
    //       });

    //     return new Promise(function (resolve, reject) {
    //         pool.query(query, function (error, results) {
    //             try {
    //                 if (error) {
    //                     reject(error);
    //                 } else {
    //                     resolve(results);
    //                 }
    //             } catch (err) { 
    //                 reject(err);
    //             }
    //         });

    //         pool.end();
    //     });
    // },
}