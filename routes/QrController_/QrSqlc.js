// var dbValidation = require("./../../utils/dbValidation.js");
// const crypto = require('crypto'); // this is contain all Validation part
// const e = require("express");

module.exports = {
 
  
  SaveRegData :function(req,res){
      obj = {};
      var d_created_date = new Date().getDate() +'-'+ Number(new Date().getMonth())+Number(1) + '-'+new Date().getFullYear();
      req.body.s_bsns_type = (req.body.s_bsns_type == '') ? 0 : req.body.s_bsns_type;

      obj.queryString = `call SaveRegistrationData (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

      obj.arr = [req.body.s_name , req.body.s_gender , req.body.s_dob , req.body.s_mobile_no , req.body.s_email_id , req.body.s_password , req.body.s_acc_type , req.body.s_created_by , d_created_date , 123 , 456,req.body.s_bsns_name,req.body.s_bsns_address,req.body.s_bsns_type];
      return obj;

},

VerifyRegData :function(req,res){
  obj = {};

  obj.queryString = `call VerifyRegistrationData (?,?,?,?,?)`;

  obj.arr = [req.body.mob_no , req.body.email , req.body.acc , req.body.n_mobile_otp , req.body.n_email_otp];
  return obj;

},

getDataforMail :function(req,res){
  obj = {};

  obj.queryString = `call getDataforMail (?,?,?)`;

  obj.arr = [req.body.mob_no , req.body.email , req.body.acc];
  return obj;

},

SignIn :function(req,res){
  obj = {};
  
  // obj.queryString = `select a.*,b.n_flag_verify from tbl_personal_registration a , tbl_otp_verification b where a.s_email_id = b.s_email_id and a.s_mobile_no = b.s_mobile_no and a.s_mobile_no = ? and a.s_password = ?`
  // obj.queryString = `select * from tbl_personal_registration where s_mobile_no = ? and s_password = ?`;
  obj.queryString = `call LoginProc (?,?)`;

  obj.arr = [req.body.s_mobile_no , req.body.s_password ];
  return obj;

},

getProfileData :function(req,res){
  obj = {};

  if(req.body.s_acc_type == 'Personal'){
    obj.queryString = `select * from tbl_personal_registration where n_reg_id = ?`;
  }else if(req.body.s_acc_type == 'Business'){
    obj.queryString = `select *,n_bsns_reg_id as n_reg_id,getBsnsTypeById(n_bsns_type_id) as bsns_type from tbl_business_registration where n_bsns_reg_id = ?`;
  }

  obj.arr = [req.body.n_reg_id ];
  return obj;

},

MarkAttendance :function(req,res){
  obj = {};

  req.body.n_bsns_reg_id = Number(req.body.n_bsns_reg_id);
  req.body.n_prsnl_reg_id = Number(req.body.n_prsnl_reg_id);
    obj.queryString = `call MarkAttendance (?,?,?,?,?,?,?,?,?)`;

  obj.arr = [req.body.n_prsnl_reg_id ,req.body.s_acc_type ,req.body.s_prsnl_email_id ,req.body.s_prsnl_name ,req.body.s_bsns_email_id ,req.body.n_bsns_reg_id ,req.body.d_date ,req.body.punch_type ,req.body.punch_time  ];
  return obj;

},

MarkVisitorsAttendance :function(req,res){
  obj = {};
  
  req.body.n_bsns_reg_id = Number(req.body.n_bsns_reg_id);
  req.body.n_prsnl_reg_id = Number(req.body.n_prsnl_reg_id);
  req.body.s_contact_prsn_name = (req.body.s_contact_prsn_name == undefined) ? '' : req.body.s_contact_prsn_name
  req.body.s_reason = (req.body.s_reason == undefined) ? '' : req.body.s_reason
  req.body.s_room_number = (req.body.s_room_number == undefined) ? '' : req.body.s_room_number
  req.body.s_adhar_number = (req.body.s_adhar_number == undefined) ? '' : req.body.s_adhar_number

    obj.queryString = `call MarkVisitorsAttendance (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

  obj.arr = [req.body.n_prsnl_reg_id ,req.body.s_acc_type ,req.body.s_prsnl_email_id ,req.body.s_prsnl_name ,req.body.s_bsns_email_id ,req.body.n_bsns_reg_id ,req.body.d_date ,req.body.punch_type ,req.body.punch_time ,req.body.s_contact_prsn_name ,req.body.s_reason ,req.body.s_room_number ,req.body.s_adhar_number ,req.body.s_bsns_type ];
  /* obj.arr = [req.body.n_reg_id ,req.body.s_acc_type ,req.body.s_email_id ,req.body.s_name ,req.body.s_bsns_email_id ,req.body.s_bsns_reg_id ,req.body.d_date ,req.body.punch_type ,req.body.punch_time ,req.body.s_contact_prsn_name ,req.body.s_reason ,req.body.s_room_number ,req.body.s_adhar_number ,req.body.s_bsns_type ]; */
  return obj;

},

MarkVisitorsAttWithImg :function(req,res){

  let data = JSON.parse(req.body.data);
  let file_data = req.file;
  obj = {};
  
  req.body.n_bsns_reg_id = Number(req.body.n_bsns_reg_id);
  req.body.n_prsnl_reg_id = Number(req.body.n_prsnl_reg_id);
  data.s_contact_prsn_name = (data.s_contact_prsn_name == undefined) ? '' : data.s_contact_prsn_name
  data.s_reason = (data.s_reason == undefined) ? '' : data.s_reason
  data.s_room_number = (data.s_room_number == undefined) ? '' : data.s_room_number
  data.s_adhar_number = (data.s_adhar_number == undefined) ? '' : data.s_adhar_number
  file_data.filename = (file_data.filename == undefined) ? '' : file_data.filename
  file_data.destination = (file_data.destination == undefined) ? '' : file_data.destination

    obj.queryString = `call MarkVisitorsAttWithImg (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    obj.arr = [data.n_prsnl_reg_id ,data.s_acc_type ,data.s_prsnl_email_id ,data.s_prsnl_name ,data.s_bsns_email_id ,data.n_bsns_reg_id ,data.d_date ,data.punch_type ,data.punch_time ,data.s_contact_prsn_name ,data.s_reason ,data.s_room_number ,data.s_adhar_number ,data.s_bsns_type,data.s_entry_type,file_data.destination, file_data.filename]; 
/*   obj.arr = [data.n_reg_id ,data.s_acc_type ,data.s_email_id ,data.s_name ,data.s_bsns_email_id ,data.s_bsns_reg_id ,data.d_date ,data.punch_type ,data.punch_time ,data.s_contact_prsn_name ,data.s_reason ,data.s_room_number ,data.s_adhar_number ,data.s_bsns_type,file_data.destination, file_data.filename];  */
  return obj;

},


MarkAttendanceByBsns :function(req,res){
  obj = {};
    req.body.n_bsns_reg_id = Number(req.body.n_bsns_reg_id);
    req.body.n_prsnl_reg_id = Number(req.body.n_prsnl_reg_id);
    obj.queryString = `call MarkAttendanceByBsns (?,?,?,?,?,?,?,?)`;

  obj.arr = [req.body.n_bsns_reg_id ,req.body.s_acc_type ,req.body.s_bsns_email_id ,req.body.s_prsnl_email_id ,req.body.n_prsnl_reg_id ,req.body.d_date ,req.body.punch_type ,req.body.punch_time ];
  return obj;

},

MarkVisitorsAttendanceByBsns :function(req,res){
  obj = {};

    obj.queryString = `call MarkVisitorsAttendanceByBsns (?,?,?,?,?,?,?,?,?,?)`;

  obj.arr = [req.body.n_bsns_reg_id ,req.body.s_acc_type ,req.body.s_bsns_email_id ,req.body.s_prsnl_email_id ,req.body.s_prsnl_reg_id ,req.body.d_date ,req.body.punch_type ,req.body.punch_time ,req.body.s_contact_prsn_name ,req.body.s_reason ];
  return obj;

},

getPunchData :function(req,res){
  obj = {};  
    obj.queryString = `call getPunchData (?,?)`;

  obj.arr = [req.body.n_reg_id , req.body.s_acc_type];
  return obj;

},

getDashboardData :function(req,res){
  obj = {};  
    obj.queryString = `call getDashboardData (?,?,?)`;

  obj.arr = [req.body.n_reg_id,req.body.s_acc_type,req.body.bsns_type];
  return obj;

},

getBsnsTypeData :function(req,res){
  obj = {};  
    obj.queryString = `call getBsnsTypeData ()`;

  obj.arr = [];
  return obj;

},

checkPunchData :function(req,res){
  obj = {};  
    obj.queryString = `call checkPunchData (?,?)`;

  obj.arr = [req.body.reg_id,req.body.d_date];
  return obj;

},

getBsnsTypeDataById :function(req,res){
  obj = {};  
    obj.queryString = `call getBsnsTypeDataById (?)`;

  obj.arr = [req.body.s_bsns_type_id];
  return obj;

},

getUserDataByEmail :function(req,res){
  obj = {};  
    obj.queryString = `call getUserDataByEmail (?)`;

  obj.arr = [req.body.email];
  return obj;

},

getManualVisitorEntry :function(req,res){
  obj = {};  
    obj.queryString = `call getManualVisitorEntry (?)`;

  obj.arr = [req.body.s_bsns_reg_id];
  return obj;

},
	
	    getvisitorData: function(req, res) {
        obj = {};
        obj.queryString = `SELECT * FROM tbl_visitor_attendance order by n_id desc`;
        obj.arr = [];
        return obj;

    },

    getcount: function(req, res) {
        var obj = {};
        obj.queryString = `call get_dashboard_count`;
        obj.arr = [];
        return obj;

    },
}