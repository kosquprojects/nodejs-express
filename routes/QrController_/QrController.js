var dbqyeryexecute = require("../../utils/dbqyeryexecute"); // this is for Query execution phase
var QrSqlc = require("./QrSqlc.js");
var log4js = require('log4js');
var log = log4js.getLogger("app");
var mailService = require("./QrEmailService");

// var QrEmail = require("./QrEmailService"); // This is emailing .js
// var Qrpush = require("./Qrpushnotify"); // This is push notification .js
// var jwt = require('jsonwebtoken');
// var sys_cre = require('./../../config/config_con.json');


module.exports = {



    SaveRegData: function (req, res) {
        var randm_no = Math.floor((Math.random() * 10000) + 1);
        /*  mailService.mail_for_task(req.body.s_email_id,randm_no).then(record => {
             console.log("s")
     }).catch(err => {
         console.log("f")
     }) ; */
        var Obj = QrSqlc.SaveRegData(req, res);
        dbqyeryexecute.queryExexute(Obj).then(record => {

            log.info({
                "status": 200,
                "mess": "Saved Registration Data !",
                "mess_body": "Registration data inserted",
                "token": "saved"
            });
            res.status(200).json({
                "status": 200,
                "mess": "Saved Registration Data !",
                "mess_body": "Registration data inserted",
                data: record
            });

        })
            .catch(err => {
                log.error({
                    "status": 500,
                    "mess": err.message,
                    "mess_body": err.message
                });
                res.status(500).json({
                    "status": 500,
                    "mess": err.message,
                    "mess_body": err.message,
                    data: err.message
                });
            });
    },

    VerifyRegData: function (req, res) {
        var Obj = QrSqlc.VerifyRegData(req, res);
        dbqyeryexecute.queryExexute(Obj).then(record => {
            if (record.affectedRows == 1) { //record[1].affectedRows
                
                console.log(req.body);

                var Obj = QrSqlc.getDataforMail(req, res);
                dbqyeryexecute.queryExexute(Obj).then(record => {
                    if(record[0]){
                        if (record[0].length > 0) {
                            mailService.sendCredtoUser(record[0][0])
                        }
                    }
                })
                    .catch(err => {
                        log.error({
                            "status": 500,
                            "mess": err.message,
                            "mess_body": err.message
                        });
                    });
                // mailService.sendCredtoUser(req.body)
            }

            log.info({
                "status": 200,
                "mess": "verify Registration Data !",
                "mess_body": "Registration data verify",
                "token": "saved"
            });
            res.status(200).json({
                "status": 200,
                "mess": "verify Registration Data !",
                "mess_body": "Registration data verify",
                data: record
            });

        })
            .catch(err => {
                log.error({
                    "status": 500,
                    "mess": err.message,
                    "mess_body": err.message
                });
                res.status(500).json({
                    "status": 500,
                    "mess": err.message,
                    "mess_body": err.message,
                    data: err.message
                });
            });
    },

    SignIn: function (req, res) {
        var Obj = QrSqlc.SignIn(req, res);
        dbqyeryexecute.queryExexute(Obj).then(record => {

            log.info({
                "status": 200,
                "mess": "verify Registration Data !",
                "mess_body": "Registration data verify",
                "token": "saved"
            });
            res.status(200).json({
                "status": 200,
                "mess": "verify Registration Data !",
                "mess_body": "Registration data verify",
                data: record
            });

        })
            .catch(err => {
                log.error({
                    "status": 500,
                    "mess": err.message,
                    "mess_body": err.message
                });
                res.status(500).json({
                    "status": 500,
                    "mess": err.message,
                    "mess_body": err.message,
                    data: err.message
                });
            });
    },

    getProfileData: function (req, res) {
        var Obj = QrSqlc.getProfileData(req, res);
        dbqyeryexecute.queryExexute(Obj).then(record => {

            log.info({
                "status": 200,
                "mess": "Get Profile Data",
                "mess_body": "Get Profile Data",
                "token": "saved"
            });
            res.status(200).json({
                "status": 200,
                "mess": "Get Profile Data",
                "mess_body": "Get Profile Data",
                data: record
            });

        })
            .catch(err => {
                log.error({
                    "status": 500,
                    "mess": err.message,
                    "mess_body": err.message
                });
                res.status(500).json({
                    "status": 500,
                    "mess": err.message,
                    "mess_body": err.message,
                    data: err.message
                });
            });
    },

    MarkAttendance: function (req, res) {
        var Obj = QrSqlc.MarkAttendance(req, res);
        dbqyeryexecute.queryExexute(Obj).then(record => {

            log.info({
                "status": 200,
                "mess": "Get Profile Data",
                "mess_body": "Get Profile Data",
                "token": "saved"
            });
            res.status(200).json({
                "status": 200,
                "mess": "Get Profile Data",
                "mess_body": "Get Profile Data",
                data: record
            });

        })
            .catch(err => {
                log.error({
                    "status": 500,
                    "mess": err.message,
                    "mess_body": err.message
                });
                res.status(500).json({
                    "status": 500,
                    "mess": err.message,
                    "mess_body": err.message,
                    data: err.message
                });
            });
    },

    MarkVisitorsAttendance: function (req, res) {
        var Obj = QrSqlc.MarkVisitorsAttendance(req, res);
        dbqyeryexecute.queryExexute(Obj).then(record => {

            log.info({
                "status": 200,
                "mess": "Get Profile Data",
                "mess_body": "Get Profile Data",
                "token": "saved"
            });
            res.status(200).json({
                "status": 200,
                "mess": "Get Profile Data",
                "mess_body": "Get Profile Data",
                data: record
            });

        })
            .catch(err => {
                log.error({
                    "status": 500,
                    "mess": err.message,
                    "mess_body": err.message
                });
                res.status(500).json({
                    "status": 500,
                    "mess": err.message,
                    "mess_body": err.message,
                    data: err.message
                });
            });
    },

    MarkVisitorsAttWithImg: function (req, res) {
        var Obj = QrSqlc.MarkVisitorsAttWithImg(req, res);
        dbqyeryexecute.queryExexute(Obj).then(record => {

            log.info({
                "status": 200,
                "mess": "Get Profile Data",
                "mess_body": "Get Profile Data",
                "token": "saved"
            });
            res.status(200).json({
                "status": 200,
                "mess": "Get Profile Data",
                "mess_body": "Get Profile Data",
                data: record
            });

        })
            .catch(err => {
                log.error({
                    "status": 500,
                    "mess": err.message,
                    "mess_body": err.message
                });
                res.status(500).json({
                    "status": 500,
                    "mess": err.message,
                    "mess_body": err.message,
                    data: err.message
                });
            });
    },


    MarkAttendanceByBsns: function (req, res) {
        var Obj = QrSqlc.MarkAttendanceByBsns(req, res);
        dbqyeryexecute.queryExexute(Obj).then(record => {

            log.info({
                "status": 200,
                "mess": "Get Profile Data",
                "mess_body": "Get Profile Data",
                "token": "saved"
            });
            res.status(200).json({
                "status": 200,
                "mess": "Get Profile Data",
                "mess_body": "Get Profile Data",
                data: record
            });

        })
            .catch(err => {
                log.error({
                    "status": 500,
                    "mess": err.message,
                    "mess_body": err.message
                });
                res.status(500).json({
                    "status": 500,
                    "mess": err.message,
                    "mess_body": err.message,
                    data: err.message
                });
            });
    },

    MarkVisitorsAttendanceByBsns: function (req, res) {
        var Obj = QrSqlc.MarkVisitorsAttendanceByBsns(req, res);
        dbqyeryexecute.queryExexute(Obj).then(record => {

            log.info({
                "status": 200,
                "mess": "Get Profile Data",
                "mess_body": "Get Profile Data",
                "token": "saved"
            });
            res.status(200).json({
                "status": 200,
                "mess": "Get Profile Data",
                "mess_body": "Get Profile Data",
                data: record
            });

        })
            .catch(err => {
                log.error({
                    "status": 500,
                    "mess": err.message,
                    "mess_body": err.message
                });
                res.status(500).json({
                    "status": 500,
                    "mess": err.message,
                    "mess_body": err.message,
                    data: err.message
                });
            });
    },

    getPunchData: function (req, res) {
        var Obj = QrSqlc.getPunchData(req, res);
        dbqyeryexecute.queryExexute(Obj).then(record => {

            log.info({
                "status": 200,
                "mess": "Get Profile Data",
                "mess_body": "Get Profile Data",
                "token": "saved"
            });
            res.status(200).json({
                "status": 200,
                "mess": "Get Profile Data",
                "mess_body": "Get Profile Data",
                data: record
            });

        })
            .catch(err => {
                log.error({
                    "status": 500,
                    "mess": err.message,
                    "mess_body": err.message
                });
                res.status(500).json({
                    "status": 500,
                    "mess": err.message,
                    "mess_body": err.message,
                    data: err.message
                });
            });
    },

    getDashboardData: function (req, res) {
        var Obj = QrSqlc.getDashboardData(req, res);
        dbqyeryexecute.queryExexute(Obj).then(record => {

            log.info({
                "status": 200,
                "mess": "Get Profile Data",
                "mess_body": "Get Profile Data",
                "token": "saved"
            });
            res.status(200).json({
                "status": 200,
                "mess": "Get Profile Data",
                "mess_body": "Get Profile Data",
                data: record
            });

        })
            .catch(err => {
                log.error({
                    "status": 500,
                    "mess": err.message,
                    "mess_body": err.message
                });
                res.status(500).json({
                    "status": 500,
                    "mess": err.message,
                    "mess_body": err.message,
                    data: err.message
                });
            });
    },


    getBsnsTypeData: function (req, res) {
        var Obj = QrSqlc.getBsnsTypeData(req, res);
        dbqyeryexecute.queryExexute(Obj).then(record => {

            log.info({
                "status": 200,
                "mess": "Get Profile Data",
                "mess_body": "Get Profile Data",
                "token": "saved"
            });
            res.status(200).json({
                "status": 200,
                "mess": "Get Profile Data",
                "mess_body": "Get Profile Data",
                data: record
            });

        })
            .catch(err => {
                log.error({
                    "status": 500,
                    "mess": err.message,
                    "mess_body": err.message
                });
                res.status(500).json({
                    "status": 500,
                    "mess": err.message,
                    "mess_body": err.message,
                    data: err.message
                });
            });
    },

    checkPunchData: function (req, res) {
        var Obj = QrSqlc.checkPunchData(req, res);
        dbqyeryexecute.queryExexute(Obj).then(record => {

            log.info({
                "status": 200,
                "mess": "Get Profile Data",
                "mess_body": "Get Profile Data",
                "token": "saved"
            });
            res.status(200).json({
                "status": 200,
                "mess": "Get Profile Data",
                "mess_body": "Get Profile Data",
                data: record
            });

        })
            .catch(err => {
                log.error({
                    "status": 500,
                    "mess": err.message,
                    "mess_body": err.message
                });
                res.status(500).json({
                    "status": 500,
                    "mess": err.message,
                    "mess_body": err.message,
                    data: err.message
                });
            });
    },

    getBsnsTypeDataById: function (req, res) {
        var Obj = QrSqlc.getBsnsTypeDataById(req, res);
        dbqyeryexecute.queryExexute(Obj).then(record => {

            log.info({
                "status": 200,
                "mess": "Get Profile Data",
                "mess_body": "Get Profile Data",
                "token": "saved"
            });
            res.status(200).json({
                "status": 200,
                "mess": "Get Profile Data",
                "mess_body": "Get Profile Data",
                data: record
            });

        })
            .catch(err => {
                log.error({
                    "status": 500,
                    "mess": err.message,
                    "mess_body": err.message
                });
                res.status(500).json({
                    "status": 500,
                    "mess": err.message,
                    "mess_body": err.message,
                    data: err.message
                });
            });
    },

    getUserDataByEmail: function (req, res) {
        var Obj = QrSqlc.getUserDataByEmail(req, res);
        dbqyeryexecute.queryExexute(Obj).then(record => {

            log.info({
                "status": 200,
                "mess": "Get Profile Data",
                "mess_body": "Get Profile Data",
                "token": "saved"
            });
            res.status(200).json({
                "status": 200,
                "mess": "Get Profile Data",
                "mess_body": "Get Profile Data",
                data: record
            });

        })
            .catch(err => {
                log.error({
                    "status": 500,
                    "mess": err.message,
                    "mess_body": err.message
                });
                res.status(500).json({
                    "status": 500,
                    "mess": err.message,
                    "mess_body": err.message,
                    data: err.message
                });
            });
    },

    getManualVisitorEntry: function (req, res) {
        var Obj = QrSqlc.getManualVisitorEntry(req, res);
        dbqyeryexecute.queryExexute(Obj).then(record => {

            log.info({
                "status": 200,
                "mess": "Get Profile Data",
                "mess_body": "Get Profile Data",
                "token": "saved"
            });
            res.status(200).json({
                "status": 200,
                "mess": "Get Profile Data",
                "mess_body": "Get Profile Data",
                data: record
            });

        })
            .catch(err => {
                log.error({
                    "status": 500,
                    "mess": err.message,
                    "mess_body": err.message
                });
                res.status(500).json({
                    "status": 500,
                    "mess": err.message,
                    "mess_body": err.message,
                    data: err.message
                });
            });
    },
	
		
		    getcount: function(req, res) {

        var Obj = QrSqlc.getcount(req, res);
        dbqyeryexecute.queryExexute(Obj).then(record => {
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

        var Obj = QrSqlc.getvisitorData(req, res);
        dbqyeryexecute.queryExexute(Obj).then(record => {
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

}
