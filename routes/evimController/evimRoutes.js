var express = require('express');
var evimCtrl = require('./evimController.js');

var evimRoutes = express.Router();


// User 
evimRoutes.route('/getcount').post(evimCtrl.getcount);
evimRoutes.route('/getvisitorData').post(evimCtrl.getvisitorData);
evimRoutes.route('/deleteuserData').post(evimCtrl.deleteuserData); // delete user data
evimRoutes.route('/getuserByIddata').post(evimCtrl.getuserByIddata); // get user by id data 
evimRoutes.route('/updateuser').post(evimCtrl.updateuser); // update user data
evimRoutes.route('/checkEmail').post(evimCtrl.checkEmail); //check email
// delete vendor data

module.exports = evimRoutes;