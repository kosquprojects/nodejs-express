var express = require('express');
var QrCtrl = require('./QrController.js');

var QrRoutes = express.Router();
// var verify_jwt = require("../../verify/check-auth");
 
/*************************** shweta Gaikwad *****************/

QrRoutes.route('/SaveRegData').post(QrCtrl.SaveRegData);
QrRoutes.route('/VerifyRegData').post(QrCtrl.VerifyRegData);
QrRoutes.route('/SignIn').post(QrCtrl.SignIn);
QrRoutes.route('/getProfileData').post(QrCtrl.getProfileData);
QrRoutes.route('/MarkAttendance').post(QrCtrl.MarkAttendance);
QrRoutes.route('/MarkVisitorsAttendance').post(QrCtrl.MarkVisitorsAttendance);
QrRoutes.route('/MarkVisitorsAttWithImg').post(QrCtrl.MarkVisitorsAttWithImg);
QrRoutes.route('/MarkAttendanceByBsns').post(QrCtrl.MarkAttendanceByBsns);
QrRoutes.route('/MarkVisitorsAttendanceByBsns').post(QrCtrl.MarkVisitorsAttendanceByBsns);
QrRoutes.route('/getPunchData').post(QrCtrl.getPunchData);
QrRoutes.route('/getDashboardData').post(QrCtrl.getDashboardData);
QrRoutes.route('/getBsnsTypeData').get(QrCtrl.getBsnsTypeData);
QrRoutes.route('/checkPunchData').post(QrCtrl.checkPunchData);
QrRoutes.route('/getBsnsTypeDataById').post(QrCtrl.getBsnsTypeDataById);
QrRoutes.route('/getUserDataByEmail').post(QrCtrl.getUserDataByEmail);
QrRoutes.route('/getManualVisitorEntry').post(QrCtrl.getManualVisitorEntry);
QrRoutes.route('/forgetPassword').post(QrCtrl.forgetPassword);
QrRoutes.route('/verify_otp_forget_pass').post(QrCtrl.verify_otp_forget_pass);
QrRoutes.route('/deleteImg').post(QrCtrl.deleteImg);

QrRoutes.route('/getcount').post(QrCtrl.getcount);
QrRoutes.route('/getvisitorData').post(QrCtrl.getvisitorData);

QrRoutes.route('/ManualVisitorsOutAttendance').post(QrCtrl.ManualVisitorsOutAttendance);
QrRoutes.route('/getManualEntriesList').post(QrCtrl.getManualEntriesList);
QrRoutes.route('/changePassword').post(QrCtrl.changePassword);
QrRoutes.route('/gettodaydata').post(QrCtrl.gettodaydata);
QrRoutes.route('/gettodayoutdata').post(QrCtrl.gettodayoutdata);
QrRoutes.route('/getuserdetails').post(QrCtrl.getuserdetails);
QrRoutes.route('/getuserdata').post(QrCtrl.getuserdata);
QrRoutes.route('/getempData').post(QrCtrl.getempData);
QrRoutes.route('/getuserdatabynid').post(QrCtrl.getuserdatabynid);
QrRoutes.route('/getDataOfMobileNo').post(QrCtrl.getDataOfMobileNo);
QrRoutes.route('/getbusname').post(QrCtrl.getbusname);
QrRoutes.route('/checkIfEmp').post(QrCtrl.checkIfEmp);

// ``````````````````````````````````````Ganesh````````````````````````````````````
QrRoutes.route('/getDemo').post(QrCtrl.getDemo);
QrRoutes.route('/subscribemail').post(QrCtrl.subscribemail);
// ````````````````````````````````````````````````````````````````````````````

module.exports = QrRoutes;
