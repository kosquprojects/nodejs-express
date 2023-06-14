var dbqyeryexecute = require("./../../utils/dbqyeryexecute"); // this is for Query execution phase
var evimSqlc = require("./evimSqlc.js");
var con = require("./../../config/config"); // this is for Query execution phase with COnnection
//var con = config.connection;

var log4js = require('log4js');
var log = log4js.getLogger("app");
var evimEmail = require("./evimEmailService"); // This is emailing .js

//var jwtauth = require("./evimVerifyToken")
module.exports = {
    // ------------------------------------------------------------------------------------------------------//
    //Save user data
    checkEmail: function(req, res) {

        var Obj = evimSqlc.checkEmail(req, res);
        dbqyeryexecute.executeSelect(Obj).then(record => {
                log.info({
                    "status": 200,
                    "mess": "Record vendor email !",
                    "mess_body": "data vendor email successfully",

                });
                res.status(200).json({
                    "status": 200,
                    "mess": "Record vendor email !",
                    "mess_body": "data vendor email successfully",
                    data: record
                });
            })
            .catch(err => {
                log.error({
                    "status": 500,
                    "mess": err.code,
                    "mess_body": err.message
                });
                res.status(500).json({
                    "status": 500,
                    "mess": err.code,
                    "mess_body": err.message,
                    data: err.message
                });
            });
    },
    saveuser: function(req, res) {

        var Obj = evimSqlc.saveuser(req, res);
        dbqyeryexecute.executeSelect(Obj).then(record => {
                log.info({
                    "status": 200,
                    "mess": "Record Saved !",
                    "mess_body": "Data Save successfully",

                });
                res.status(200).json({
                    "status": 200,
                    "mess": "Record Saved !",
                    "mess_body": "Data Save successfully",
                    data: record
                });
            })
            .catch(err => {
                log.error({
                    "status": 500,
                    "mess": err.code,
                    "mess_body": err.message
                });
                res.status(500).json({
                    "status": 500,
                    "mess": err.code,
                    "mess_body": err.message,
                    data: err.message
                });
            });
    },

    getcount: function(req, res) {

        var Obj = evimSqlc.getcount(req, res);
        dbqyeryexecute.executeSelect(Obj).then(record => {
                log.info({
                    "status": 200,
                    "mess": "Record Saved !",
                    "mess_body": "Data Get successfully",

                });
                res.status(200).json({
                    "status": 200,
                    "mess": "Record Saved !",
                    "mess_body": "Data Get successfully",
                    data: record[0]
                });
            })
            .catch(err => {
                log.error({
                    "status": 500,
                    "mess": err.code,
                    "mess_body": err.message
                });
                res.status(500).json({
                    "status": 500,
                    "mess": err.code,
                    "mess_body": err.message,
                    data: err.message
                });
            });
    },


    getvisitorData: function(req, res) {

        var Obj = evimSqlc.getvisitorData(req, res);
        dbqyeryexecute.executeSelect(Obj).then(record => {
                log.info({
                    "status": 200,
                    "mess": "Record Saved !",
                    "mess_body": "Data Get successfully",

                });
                res.status(200).json({
                    "status": 200,
                    "mess": "Record Saved !",
                    "mess_body": "Data Get successfully",
                    data: record
                });
            })
            .catch(err => {
                log.error({
                    "status": 500,
                    "mess": err.code,
                    "mess_body": err.message
                });
                res.status(500).json({
                    "status": 500,
                    "mess": err.code,
                    "mess_body": err.message,
                    data: err.message
                });
            });
    },

    // for delete user Data
    deleteuserData: function(req, res) {

        var Obj = evimSqlc.deleteuserData(req, res);
        dbqyeryexecute.executeSelect(Obj).then(record => {
                log.info({
                    "status": 200,
                    "mess": "Record Saved !",
                    "mess_body": "Data deleted successfully",

                });
                res.status(200).json({
                    "status": 200,
                    "mess": "Record Saved !",
                    "mess_body": "Data deleted successfully",
                    data: record
                });
            })
            .catch(err => {
                log.error({
                    "status": 500,
                    "mess": err.code,
                    "mess_body": err.message
                });
                res.status(500).json({
                    "status": 500,
                    "mess": err.code,
                    "mess_body": err.message,
                    data: err.message
                });
            });
    },

    //get by user id
    getuserByIddata: function(req, res) {

        var Obj = evimSqlc.getuserByIddata(req, res);
        dbqyeryexecute.executeSelect(Obj).then(record => {
                log.info({
                    "status": 200,
                    "mess": "Record Found !",
                    "mess_body": "plant data fround",

                });
                res.status(200).json({
                    "status": 200,
                    "mess": "Record Found !",
                    "mess_body": "Plant data fround",
                    data: record
                });
            })
            .catch(err => {
                log.error({
                    "status": 500,
                    "mess": err.code,
                    "mess_body": err.message
                });
                res.status(500).json({
                    "status": 500,
                    "mess": err.code,
                    "mess_body": err.message,
                    data: err.message
                });
            });
    },
    // update user data
    updateuser: function(req, res) {

        var Obj = evimSqlc.updateuser(req, res);
        dbqyeryexecute.executeSelect(Obj).then(record => {
                log.info({
                    "status": 200,
                    "mess": "Record Saved !",
                    "mess_body": "Data added successfully",

                });
                res.status(200).json({
                    "status": 200,
                    "mess": "Record Saved !",
                    "mess_body": "Data added successfully",
                    data: record
                });
            })
            .catch(err => {
                log.error({
                    "status": 500,
                    "mess": err.code,
                    "mess_body": err.message
                });
                res.status(500).json({
                    "status": 500,
                    "mess": err.code,
                    "mess_body": err.message,
                    data: err.message
                });
            });
    },

    // -----------------------------------------------------------------------------------------------------//
}