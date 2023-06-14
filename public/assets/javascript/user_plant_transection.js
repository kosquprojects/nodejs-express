(function(){
var tag = '', status = '';

//class header:represents the header 
class Header {
  constructor(n_vend_trans_id, n_plant_id, s_excutive_id, s_supervisor_id, s_manger_id) {
    this.n_vend_trans_id = n_vend_trans_id;
    this.n_plant_id = n_plant_id;
    this.s_excutive_id = s_excutive_id;
    this.s_supervisor_id = s_supervisor_id;
    this.s_manger_id = s_manger_id;



  }
}


//Class UI: Handle UI Task
class UI {

  //this is use for creating Manager dropdown
  static displayManager(manager) {
    try {
      //this is use for creating Manager dropdown
      let html1 = '<option label="select manager"></option>';
        //this is use for creating Executor dropdown
        let html2 = '<option label="select Executor"></option>';
       //this is use for creating Supervisor dropdown
      let html = '<option label="select Supervisor"></option>';

      manager.forEach(element => {
        html1 += `<option value="${element.s_email_id}">${element.s_email_id}</option>`;
      
      });
      manager.forEach(element => {
        html2 += `<option value="${element.s_email_id}">${element.s_email_id}</option>`;

      });
      manager.forEach(element => {
        html += `<option value="${element.s_email_id}">${element.s_email_id}</option>`;

      });

      $("#s_excutive_id").html(html2);
      $("#s_manger_id").html(html1);
      $("#s_supervisor_id").html(html);

    } catch (err) {
      console.log(err);
    }
  }


  //this is use for creating Executor dropdown
  static displayPlant(plant) {
    try {
      let html = '<option label="select Plant"></option>';
      plant.forEach(element => {
        html += `<option value="${element.n_plant_id}">${element.s_plant_name}</option>`;

      });
      $("#n_plant_id").html(html);

    } catch (err) {
      console.log(err);
    }
  }



  //this is the method for showing data in table
  static displayHeader(header) {
    try {
      debugger;
      if ($.fn.dataTable.isDataTable('#userplant')) {
        $('#userplant').DataTable().destroy();
      }
      $('#userplant').DataTable({
        'data': header,
        // "scrollX": true,
        'aoColumns': [
          { 'data': 'n_plant_id' },
          { 'data': 's_excutive_id' },
          { 'data': 's_supervisor_id' },
          { 'data': 's_manger_id' },

          {
            'render': function (data, type, row, meta) {
              // var a = `<button type='button' class='btn active btn-info btn-sm'  data-toggle='modal' data-target='#myModalfordcloc' onclick='getstatusById(${row.n_status_no})'><span class='glyphicon glyphicon-pencil'></span></button><button type='button' class='btn active btn-info btn-sm'  onclick='deletestatusById(${row.n_status_id})' style='margin-left:4px' id='delete'><span class='glyphicon glyphicon-trash'></span></button>`;
              return '<button type="button" class="btn active btn-info btn-sm" data-toggle="modal"   onclick="userplantbyid(' + row.n_vend_trans_id + ')"><span class="glyphicon glyphicon-pencil"></span></button><button type="button" class="btn active btn-danger btn-sm " onclick="deleteuserplant( ' + row.n_vend_trans_id + ')" style="margin-left:7px"><span class="glyphicon glyphicon-trash"></span></button> ';

            },
          }
        ],
      });
      $('[data-toggle="popover"]').popover({ html: true, placement: "top", trigger: "click" });

    }
    catch (err) {
      console.log(err);
    }
  }


  //thi sfunction will clear form fields
  static clearfields() {
    try {
      $("#n_vend_trans_id").val('');
      $("#n_plant_id").val('');
      $("#s_excutive_id").val('');
      $("#s_supervisor_id").val('');
      $("#s_manger_id").val('');


    } catch (err) {
      console.log(err);
    }
  }
}

//class transaction: its handle request and responses from server side
class Transaction {

  //this function get all the manager from the database
  static getManager() {
    try {
      debugger;
      $.ajax({
        url: './evim/getManager',
        type: 'POST',
        crossDomain: true,
        //data: data,
        success: function (result) {
          console.log(result);
          UI.displayManager(result.data);

          // UI.displayExecutor(result.data);
          // UI.displaysupervisor(result.data);
        }, error: function (error) {
          console.log(error);
        }, complete: function () {

        }
      });

    } catch (err) {
      console.log(err);
    }
  }

  //this function get all the Plant from the database
  static getPlant() {
    try {
      debugger;
      $.ajax({
        url: './evim/getPlant',
        type: 'POST',
        crossDomain: true,
        //data: data,
        success: function (result) {
          console.log(result);
          UI.displayPlant(result.data);


        }, error: function (error) {
          console.log(error);
        }, complete: function () {

        }
      });

    } catch (err) {
      console.log(err);
    }
  }

  //this function get all status data
  static getUserPlantData() {
    try {
      debugger;
      $.ajax({
        url: './evim/getUserPlantData',
        type: 'POST',
        crossDomain: true,
        //data: data,
        success: function (result) {
          console.log(result);
          UI.displayHeader(result.data);
          $('#saveuserplant').show();
          $('#updateuserplant').hide();
        }, error: function (error) {
          console.log(error);
        }, complete: function () {

        }
      });

    } catch (err) {
      console.log(err);
    }
  }

  //for adding or updating user plant data into table
  static addUserPlant(url, head) {
    try {
      debugger;
      let data = { data: head, status: status };
      $.ajax({
        type: 'POST',
        url: url,
        crossDomain: true,
        data: data,
        beforeSend: function () { },
        success: function (result) {
          console.log(result);
          getnotify('success', undefined, 1, 'stack_top_right', result.mess, result
            .mess_body);
        }, error: function (err) {

          console.log(err);
          getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess,
            err.responseJSON.mess_body);
        }, complete: function () {
          UI.clearfields();
          Transaction.getUserPlantData();
        }
      });
    } catch (err) {
      console.log(err);
    }
  }


  //getuser plant by id
  static getuserplantById(n_vend_trans_id) {
    debugger;
    try {
      var data = {
        n_vend_trans_id: n_vend_trans_id,
      }
      $.ajax({
        type: 'POST',
        url: "./evim/get_userplant_Databyid",
        data: data,
        beforeSend: function (xhr) {

          $('#saveuserplant').hide();
          $('#updateuserplant').show();
          xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem("auth2token"));
        },
        success: function (result) {
          debugger;
          var data = result.data[0];
          $('#n_plant_id').val(data.n_plant_id);
          $('#s_excutive_id').val(data.s_excutive_id);
          $('#s_supervisor_id').val(data.s_supervisor_id);
          $('#s_manger_id').val(data.s_manger_id);

          $('#n_vend_trans_id').val(data.n_vend_trans_id);



        },
        error: function (error) {
          console.log(error);
        },
      });
    } catch (error) {
      alert(error);
    }

  }
  //delete user plant by id
  static deleteuserplantById(n_vend_trans_id) {
    try {
      debugger;
      var data = {
        n_vend_trans_id: n_vend_trans_id,
      };
      $.ajax({
        type: 'POST',
        url: "./evim/deleteuserplantById",

        data: data,
        beforeSend: function (xhr) {

          xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem("auth2token"));
        },
        success: function (result) {
          Transaction.getUserPlantData();
          UI.clearfields();
          getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
          setTimeout(() => {

          }, 2000)

        },
        error: function (error) {
          console.log(error);
        },

      });
    } catch (error) {
      alert(error);
    }
  }


}
debugger;

//onload event for getting user plant data
document.addEventListener('DOMContentLoaded', Transaction.getManager(), Transaction.getPlant(), Transaction.getUserPlantData());

//for saving data into draft
$('#saveuserplant').click(function (event) {
  event.preventDefault();
  tag = 'SAVE';
  status = '0';
  $('#form-userplant').submit();
});

//for update data
$('#updateuserplant').click(function (event) {
  event.preventDefault();
  tag = 'UPDATE';
  status = '1';
  $('#form-userplant').submit();
});
$('#form-userplant').on('submit', function (event) {
  try {


    const n_vend_trans_id = $("#n_vend_trans_id").val();
    const n_plant_id = $("#n_plant_id").val();
    const s_excutive_id = $("#s_excutive_id").val();
    const s_supervisor_id = $("#s_supervisor_id").val();
    const s_manger_id = $("#s_manger_id").val();



    const header = new Header(n_vend_trans_id, n_plant_id, s_excutive_id, s_supervisor_id, s_manger_id);

    if (tag == 'SAVE') {
      var url = './evim/saveuserplant'
      Transaction.addUserPlant(url, header);
      $('#status_form').hide();
    $('#plantauth').show();
    }
    else if (tag == 'UPDATE') {

      var url = './evim/update_userplant_Data'
      Transaction.addUserPlant(url, header);
      $('#status_form').hide();
    $('#plantauth').show();
    }
    else {
      return alert('Something Wrong !!!!');
    }
  } catch (err) {
    console.log(err);
  }



});

$('#resetuserplant').click(function (event) {
  $('#saveuserplant').show();
  $('#updateuserplant').hide();
  $('#status_form').hide();
    $('#plantauth').show();
});

userplantbyid = function (n_vend_trans_id) {
  Transaction.getuserplantById(n_vend_trans_id);
  $('#status_form').show();
  $('#plantauth').hide();
}

deleteuserplant = function (n_vend_trans_id) {
  Transaction.deleteuserplantById(n_vend_trans_id);
  $('#status_form').hide();
  $('#plantauth').show();
}

 divopennclose=function(){
    $('#status_form').show();
    $('#plantauth').hide();
    $('#saveuserplant').show();
    $('#updateuserplant').hide();
    }
    back=function(){
    $('#status_form').hide();
    $('#plantauth').show();  
    }

})();