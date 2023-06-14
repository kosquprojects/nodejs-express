var express = require('express');
var QrCtrl = require('./QrController.js');

var QrRoutes = express.Router();
// var verify_jwt = require("../../verify/check-auth");



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

QrRoutes.route('/getcount').post(QrCtrl.getcount);
QrRoutes.route('/getvisitorData').post(QrCtrl.getvisitorData);



module.exports = QrRoutes;
