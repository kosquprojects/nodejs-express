var dbqyeryexecute = require("../../utils/dbqyeryexecute"); // this is for Query execution phase
var QrSqlc = require("./QrSqlc.js");
var log4js = require('log4js');
var log = log4js.getLogger("app");
var mailService = require("./QrEmailService");
const fs = require('fs')
const request = require('request');
// var QrEmail = require("./QrEmailService"); // This is emailing .js
// var Qrpush = require("./Qrpushnotify"); // This is push notification .js
// var jwt = require('jsonwebtoken');
// var sys_cre = require('./../../config/config_con.json');


module.exports = {



  /*  SaveRegData: function (req, res) {
        var randm_no = Math.floor((Math.random() * 10000) + 1);
        
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
    },*/
	
	 SaveRegData: function (req, res) {
        var randm_no_email = Math.floor((Math.random() * 10000) + 1);
        var randm_no_mob = Math.floor((Math.random() * 10000) + 1);
		 req.body.email_otp = randm_no_email ;
         req.body.mob_otp = randm_no_mob ;
         

        var Obj = QrSqlc.SaveRegData(req, res);
        dbqyeryexecute.queryExexute(Obj).then(record => {
			
			 if (record.affectedRows) {
                if (record.affectedRows > 0) {

                    mailService.mail_for_task(req.body.s_email_id, randm_no_email).then(record => {
                        console.log("s")
                    }).catch(err => {
                        console.log("f")
                    });

                    request('https://www.txtguru.in/imobile/api.php?username=apponext.com&password=99530138&source=KNOKCC&dmobile=' + req.body.s_mobile_no + '&dlttempid=1507165243375906682&message=Dear ' + req.body.s_name + ',%0a Your OTP is ' + randm_no_mob + ' valid for next 2 minutes.%0a www.knokc.com KNOKCC.', function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            console.log('sms', response)
                        } else {
                            console.log('error sms', error)
                        }
                    });

                }
            } else {
                if (record[0].length > 0) {
                    if (record[0][0].n_flag_verify == 0) {

                        mailService.mail_for_task(req.body.s_email_id, randm_no_email).then(record => {
                            console.log("s")
                        }).catch(err => {
                            console.log("f")
                        });

                        request('https://www.txtguru.in/imobile/api.php?username=apponext.com&password=99530138&source=KNOKCC&dmobile=' + req.body.s_mobile_no + '&dlttempid=1507165243375906682&message=Dear ' + req.body.s_name + ',%0a Your OTP is ' + randm_no_mob + ' valid for next 2 minutes.%0a www.knokc.com KNOKCC.', function (error, response, body) {
                            if (!error && response.statusCode == 200) {
                                console.log('sms', response)
                            } else {
                                console.log('error sms', error)
                            }
                        });

                    }
                }
            }


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

    forgetPassword: function (req, res) {
        var Obj = QrSqlc.verifyUser(req, res);
        dbqyeryexecute.queryExexute(Obj).then(record => {
            // record[0][0].cnt
			var nm='';
            if(record[0].length > 0){
				if(record[0][0].s_name){
					nm = record[0][0].s_name;
				}else if(record[0][0].s_bsns_name){
					nm = record[0][0].s_bsns_name;
				}
                /* **************************************************** */
                var randm_no_email = Math.floor((Math.random() * 10000) + 1);
                var randm_no_mob = Math.floor((Math.random() * 10000) + 1);
                 mailService.mail_for_task(record[0][0].s_email_id,randm_no_email).then(record => {
                     console.log("s")
             }).catch(err => {
                 console.log("f")
             }) ; 
				
				 request('https://www.txtguru.in/imobile/api.php?username=apponext.com&password=99530138&source=KNOKCC&dmobile=' + record[0][0].s_mobile_no + '&dlttempid=1507165243375906682&message=Dear ' + nm + ',%0a Your OTP is ' + randm_no_mob + ' valid for next 2 minutes.%0a www.knokc.com KNOKCC.', function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            console.log('sms', response)
                        } else {
                            console.log('error sms', error)
                        }
                    });
				
                var Obj = QrSqlc.SaveForgetPassOtp(req, res,record[0][0],randm_no_email,randm_no_mob);
                dbqyeryexecute.queryExexute(Obj).then(rec => {
                    log.info({
                        "status": 200,
                        "mess": "otp data get",
                        "mess_body": "otp data get",
                        "token": "saved"
                    });
                    res.status(200).json({
                        "status": 200,
                        "mess": "otp data get",
                        "mess_body": "Enter OTP received on mobile and email",
                        data: rec
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
            /* **************************************************** */
            }
            else{
                res.status(200).json({
                    "status": 200,
                    "mess": "NO_FOUND",
                    "mess_body": "Please Enter Correct Email Id and Mobile No",
                    data: record
                }); 
            }
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
    verify_otp_forget_pass: function (req, res) {
        var Obj = QrSqlc.verify_otp_forget_pass(req, res);
        dbqyeryexecute.queryExexute(Obj).then(record => {
            if (record.affectedRows == 1) { //record[1].affectedRows
                
                console.log(req.body);

                var Obj = QrSqlc.verifyUser(req, res);
                dbqyeryexecute.queryExexute(Obj).then(rec => {
                    if(rec[0]){
                        if (rec[0].length > 0) {
                             mailService.sendCredtoUser(rec[0][0])
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
	
	
    deleteImg: function (req, res) {
        var Obj = QrSqlc.deleteImg(req, res);
        dbqyeryexecute.queryExexute(Obj).then(record => {
			const pathToFile = record[0][0].s_img_path+"/"+record[0][0].s_image_name
				try {
  					fs.unlinkSync(pathToFile)
  					console.log("Successfully deleted the file.")
					} catch(err) {
						  console.log("error")
					}

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

   ManualVisitorsAttWithImg: function (req, res) {
        var Obj = QrSqlc.ManualVisitorsAttWithImg(req, res);
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

	ManualVisitorsAttWithImgByEmp: function (req, res) {
        var Obj = QrSqlc.ManualVisitorsAttWithImgByEmp(req, res);
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

	
    ManualVisitorsOutAttendance: function (req, res) {
        var Obj = QrSqlc.ManualVisitorsOutAttendance(req, res);
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
	
	  getManualEntriesList: function (req, res) {
        var Obj = QrSqlc.getManualEntriesList(req, res);
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

	changePassword: function (req, res) {
        var Obj = QrSqlc.changePassword(req, res);
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

    uploadProfileImage: function (req, res) {
        var Obj = QrSqlc.uploadProfileImage(req, res);
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
	gettodaydata: function(req, res) {

        var Obj = QrSqlc.gettodaydata(req, res);
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

    gettodayoutdata: function(req, res) {

        var Obj = QrSqlc.gettodayoutdata(req, res);
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


    getDemo: function (req, res) {

        var Obj = QrSqlc.getDemo(req, res);
        dbqyeryexecute.queryExexute(Obj).then(record => {
    
            mailService.get_demo_mail(req.body.email).then(record => {
              console.log("s")
            }).catch(err => {
              console.log("f")
            });
    
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
      //subscribemail
    
      // subscribemail: function (req, res) {
    
      //   mailService.subscribe_mail(req.body.subscribeEmail).then(record => {
      //     log.info({
      //       "status": 200,
      //       "mess": "Record Saved !",
      //       "mess_body": "Data Get successfully",
    
      //     });
      //     res.status(200).json({
      //       "status": 200,
      //       "mess": "Record Saved !",
      //       "mess_body": "Data Get successfully",
    
      //     });
      //   }).catch(err => {
      //     console.log("f")
      //   });
    
    
      // },
    
      subscribemail: function (req, res) {
    
        var Obj = QrSqlc.subscribemail(req, res);
        dbqyeryexecute.queryExexute(Obj).then(record => {
    
            mailService.subscribe_mail(req.body.subscribeEmail).then(record => {
              console.log("s")
            }).catch(err => {
              console.log("f")
            });
    
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


    getuserdetails: function(req, res) {

        var Obj = QrSqlc.getuserdetails(req, res);
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

    getuserdata: function(req, res) {

        var Obj = QrSqlc.getuserdata(req, res);
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

    getempData: function(req, res) {

        var Obj = QrSqlc.getempData(req, res);
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


    getuserdatabynid: function(req, res) {

        var Obj = QrSqlc.getuserdatabynid(req, res);
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

    getDataOfMobileNo: function (req, res) {
        var Obj = QrSqlc.getDataOfMobileNo(req, res);
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

    getbusname: function (req, res) {
        var Obj = QrSqlc.getbusname(req, res);
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

	
    checkIfEmp: function (req, res) {
        var Obj = QrSqlc.checkIfEmp(req, res);
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




}
