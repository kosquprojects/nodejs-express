var dbValidation = require("./../../utils/dbValidation.js"); // this is contain all Validation part

module.exports = {
    // Save User Data 

    saveuser: function(req, res) {
        var obj = {};
        obj.queryString = "Insert into tbl_emp (s_emp_name,s_emp_id,s_designation,s_office,s_dept_name,s_company,s_location,n_mobile_no,s_email_id,s_pass,n_isadmin,n_status) values(?,?,?,?,?,?,?,?,?,?,?,?)";
        obj.arr = [req.body.data.s_emp_name, req.body.data.s_emp_id, req.body.data.s_designation, req.body.data.s_office, req.body.data.s_dept_name, req.body.data.s_company, req.body.data.s_location, req.body.data.n_mobile_no, req.body.data.s_email_id, req.body.data.s_pass, 1, req.body.data.n_status];
        return obj;

    },
    checkEmail: function(req, res) {
        var obj = {};
        obj.queryString = "select email from vw_login where email=?";
        obj.arr = [req.body.s_email_id];
        return obj;

    },
    getvisitorData: function(req, res) {
        var obj = {};
        obj.queryString = "SELECT * FROM tbl_visitor_attendance order by n_id desc";
        obj.arr = [];
        return obj;

    },

    getcount: function(req, res) {
        var obj = {};
        obj.queryString = "call get_dashboard_count";
        obj.arr = [];
        return obj;

    },

    // delete data by user id 
    deleteuserData: function(req, res) {
        var obj = {};
        obj.queryString = "Delete from tbl_emp where n_emp_auto_id =?";
        obj.arr = [req.body.n_emp_auto_id];
        return obj;

    },

    // get by user id 

    getuserByIddata: function(req, res) {
        var obj = {};
        obj.queryString = "select * from tbl_emp where n_emp_auto_id =?";
        obj.arr = [req.body.n_emp_auto_id];
        return obj;

    },
    //update user 
    updateuser: function(req, res) {
        var obj = {};
        obj.queryString = "UPDATE tbl_emp SET s_emp_name=?,s_emp_id=?,s_designation=?,s_office=?,s_dept_name=?,s_company=?,s_location=?,n_mobile_no=?,s_email_id=?,s_pass=?,n_status=? WHERE n_emp_auto_id=?;";
        obj.arr = [req.body.data.s_emp_name, req.body.data.s_emp_id, req.body.data.s_designation, req.body.data.s_office, req.body.data.s_dept_name, req.body.data.s_company, req.body.data.s_location, req.body.data.n_mobile_no, req.body.data.s_email_id, req.body.data.s_pass, req.body.data.n_status, req.body.data.n_emp_auto_id];
        return obj;

    },

}