(function() {
    class Header {
        constructor(n_emp_auto_id, s_emp_name, s_emp_id, s_designation, s_office, s_dept_name, s_company, s_location, n_mobile_no, s_email_id, s_pass, n_status, s_user_id) {
            this.s_emp_name = s_emp_name;
            this.s_emp_id = s_emp_id;
            this.s_designation = s_designation;
            this.s_office = s_office;
            this.s_dept_name = s_dept_name;
            this.s_company = s_company;
            this.s_location = s_location;
            this.s_email_id = s_email_id;
            this.n_mobile_no = n_mobile_no;
            this.s_pass = s_pass;
            this.n_status = n_status;
            this.n_emp_auto_id = n_emp_auto_id;
            this.s_user_id = s_user_id;

        }
    }


    //Class UI: Handle UI Task
    class UI {

        //this is the method for showing User data in table
        static displayuser(header) {

            try {
                if ($.fn.dataTable.isDataTable('#makerTable12')) {
                    $('#makerTable12').DataTable().destroy();
                }
                $('#makerTable12').DataTable({
                    'data': header,
                    "scrollX": true,
                    "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
                    //'data': 'n_status'
                    'aoColumns': [
                        { 'data': 's_visitor_name' },
                        { 'data': 's_visitor_email' },
                        { 'data': 's_contact_prsn_name' },
                        { 'data': 's_reason' },
                        { 'data': 'd_date' },
                        { 'data': 's_punch_in' },
                        { 'data': 's_punch_out' },
                    ],
                });
            } catch (err) {
                console.log(err);
            }
        }

        static showuserdatabyid(userdata) {
                $('#content_form').show();
                $('#userlisttbl').hide();
                $('#updateuser').show();
                $('#saveuser').hide();

                try {
                    $("#s_emp_name").val(userdata.s_emp_name);
                    $("#s_emp_id").val(userdata.s_emp_id);
                    $("#s_designation").val(userdata.s_designation);
                    $("#s_office").val(userdata.s_office);
                    $("#s_dept_name").val(userdata.s_dept_name);
                    $("#s_company").val(userdata.s_company);
                    $("#s_email_id").val(userdata.s_email_id);
                    $("#s_location").val(userdata.s_location);
                    $("#n_mobile_no").val(userdata.n_mobile_no);
                    $("#s_pass").val(userdata.s_pass);
                    $("#n_status").val(userdata.n_status);
                    $("#n_emp_auto_id").val(userdata.n_emp_auto_id);
                } catch (err) {
                    console.log(err);
                }
            }
            //thi sfunction will clear form fields
        static clearfields() {
            try {

                $("#s_emp_name").val('');
                $("#s_emp_id").val('');
                $("#s_designation").val('');
                $("#s_office").val('');
                $("#s_dept_name").val('');
                $("#s_company").val('');
                $("#s_email_id").val('');
                $("#s_location").val('');
                $("#n_mobile_no").val('');
                $("#s_pass").val('');
                $("#n_status").val('');

            } catch (err) {
                console.log(err);
            }
        }

    }


    class Transaction {

        //check vendor code 
        static empCode() {
            try {
                var data = { s_emp_id: $("#s_emp_id").val() }
                debugger;
                $.ajax({
                    url: './Qr/empCode',
                    type: 'POST',
                    crossDomain: true,
                    data: data,
                    success: function(result) {
                        console.log(result);
                        var joblist = result.data;
                        if (result.data.length > 0) {
                            alert("This emp-id is allready exist");
                            $("#s_emp_id").val('');
                        }

                    },
                    error: function(err) {
                        getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess,
                            err.responseJSON.mess_body);
                        console.log(err);
                    },
                    complete: function() {

                    }
                });
            } catch (err) {
                console.log(err);
            }
        }

        static checkEmailid(tag, header) {
                try {
                    var data = { s_email_id: $("#s_email_id").val() }
                    $.ajax({
                        url: './Qr/checkEmail',
                        type: 'POST',
                        crossDomain: true,
                        data: data,
                        success: function(result) {
                            console.log(result);
                            var joblist = result.data;
                            if (result.data.length > 0 && tag != 'UPDATE') {
                                alert("This email-id is allready exist");
                                $("#s_email_id").val('');
                                return true;
                            } else {
                                if (tag == 'SAVE') {


                                    var url = './evim/saveuser'
                                    Transaction.addHeader(url, header);
                                } else if (tag == 'UPDATE') {
                                    var url = './evim/updateuser'
                                    Transaction.addHeader(url, header);
                                }
                            }


                        },
                        error: function(err) {
                            getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess,
                                err.responseJSON.mess_body);
                            console.log(err);
                        },
                        complete: function() {

                        }
                    });
                } catch (err) {
                    console.log(err);
                }
            }
            //for adding or updating header data into table
        static addHeader(url, head) {
            try {
                let data = { data: head, status: status };
                $.ajax({
                    type: 'POST',
                    url: url,
                    crossDomain: true,
                    data: data,
                    beforeSend: function() {},
                    success: function(result) {
                        console.log(result);
                        getnotify('success', undefined, 1, 'stack_top_right', result.mess, result
                            .mess_body);
                        UI.clearfields();
                        Transaction.getuserData(result);
                        $('#content_form').hide();
                        $('#userlisttbl').show();
                    },
                    error: function(err) {

                        console.log(err);
                        getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess,
                            err.responseJSON.mess_body);
                    },
                    complete: function() {


                    }
                });
            } catch (err) {
                console.log(err);
            }
        }

        //this function get User data
        static getuserData() {
			debugger;
			var BID = localStorage.getItem("BID");
            try {
				var data={
					id:BID
				}
                $.ajax({
                    url: './Qr/getvisitorData',
                    type: 'POST',
                    crossDomain: true,
                    data: data,
                    success: function(result) {
                        console.log(result);
                        UI.displayuser(result.data);

                    },
                    error: function(error) {
                        console.log(error);
                    },
                    complete: function() {

                    }
                });

            } catch (err) {
                console.log(err);
            }
        }

        //get User data by id
        static getuserByIddata(id) {

            try {
                let data = { n_emp_auto_id: id, status: status };
                $.ajax({
                    url: './Qr/getuserByIddata',
                    type: 'POST',
                    crossDomain: true,
                    data: data,
                    success: function(result) {
                        console.log(result);
                        var userdata = result.data[0];
                        UI.showuserdatabyid(userdata);
                        getnotify('success', undefined, 1, 'stack_top_right', result.mess, result
                            .mess_body);
                    },
                    error: function(err) {

                        console.log(err);
                        getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess,
                            err.responseJSON.mess_body);
                    },
                    complete: function() {

                    }
                });

            } catch (err) {
                console.log(err);
            }
        }

        // delete vender data by id
        static deleteuserById(id) {

            try {
                let data = { n_emp_auto_id: id, status: status };
                $.ajax({
                    url: './Qr/deleteuserData',
                    type: 'POST',
                    crossDomain: true,
                    data: data,
                    success: function(result) {
                        console.log(result);
                        Transaction.getuserData();
                        getnotify('success', undefined, 1, 'stack_top_right', result.mess, result
                            .mess_body);
                    },
                    error: function(err) {

                        console.log(err);
                        getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess,
                            err.responseJSON.mess_body);
                    },
                    complete: function() {

                    }
                });

            } catch (err) {
                console.log(err);
            }
        }






    }

    deleteuser = (id) => {
            Transaction.deleteuserById(id);
        }
        // onclick get User by id
    getuserById = (id) => {
        Transaction.getuserByIddata(id);
    }


    //onload event for getting user data
    document.addEventListener('DOMContentLoaded', Transaction.getuserData());

    //for saving data into draft
    $('#saveuser').click(function(event) {

        event.preventDefault();
        tag = 'SAVE';
        status = '0';
        $('#form-user').submit();
    });

    //for submiting data for others
    $('#updateuser').click(function(event) {

        event.preventDefault();
        tag = 'UPDATE';
        status = '1';
        $('#form-user').submit();
    });

    $('#form-user').on('submit', function(event) {

        try {
            const s_emp_name = $("#s_emp_name").val();
            const s_emp_id = $("#s_emp_id").val();
            const s_designation = $("#s_designation").val();
            const s_office = $("#s_office").val();
            const s_dept_name = $("#s_dept_name").val();
            const s_company = $("#s_company").val();
            const s_email_id = $("#s_email_id").val();
            const s_location = $("#s_location").val();
            const n_mobile_no = $("#n_mobile_no").val();
            const s_pass = $("#s_pass").val();
            const n_status = $("#n_status").val();
            const s_user_id = localStorage.getItem("email");
            const n_emp_auto_id = $("#n_emp_auto_id").val();

            const header = new Header(n_emp_auto_id, s_emp_name, s_emp_id, s_designation, s_office, s_dept_name, s_company, s_location, n_mobile_no, s_email_id, s_pass, n_status, s_user_id);

            Transaction.checkEmailid(tag, header);

            // if(tag == 'SAVE'){
            //     var email = document.getElementById('s_email_id');
            // var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            // if (!filter.test(email.value)) {
            //     alert('Please provide a valid email id');
            //     email.focus;
            //     return false;
            // }
            // else{
            //   var url='./evim/saveuser'
            //   Transaction.addHeader(url,header);
            // }
            //}
            // else if(tag == 'UPDATE'){
            //   var url='./evim/updateuser'
            //   Transaction.addHeader(url,header);
            // }

        } catch (err) {
            console.log(err);
        }
    });
    divopennclose = function() {
        $('#content_form').show();
        $('#userlisttbl').hide();
        $('#saveuser').show();
        $('#updateuser').hide();
    }
    back = function() {
        $('#content_form').hide();
        $('#userlisttbl').show();
    }


    $("#s_emp_id").blur(() => {
        debugger;
        Transaction.empCode();
    });
})();