(function () {
  
  var url_params = getAllUrlParams(window.location)
  var idd = url_params;
  var idofurl = idd["id"]
  $("#updateRack").hide();

  var tag = '';
  $('#saveuserrole').click(function (event) {
    event.preventDefault();
    tag = 'SAVE';
    $('#form-userrole').submit();
  });

  $('#updateuserrole').click(function (event) {
    event.preventDefault();
    tag = 'UPDATE';
    $('#form-userrole').submit();
  });

  $('#resetuserole').click(function (event) {
    $('#saveuserrole').show();
    $('#updateuserrole').hide();
  });

  // onSubmit starts from here...
  $('#form-userrole').on('submit', function (event) {
    
    try {
      if (tag == 'SAVE') {
        
        var date = new Date();
        var d_created_date = date.getTime();
        
        // var userid= document.getElementById("userid").innerHTML
        var data = {


          // s_rake_name: $('#s_rake_name').val(),
          // n_datacenter_id: $('#n_datacenter_id').val(),
          // s_asset_code: $('#s_asset_code').val(),
          // n_status: $('#n_status').val(),

          // s_floor_loc: $('#s_floor_loc').val(),
          // n_room_no: $('#n_room_no').val(),
          s_user_id: $('#s_user_id').val(),
          // s_user_id:userid,
          n_role_id: $("#n_role_id").val(),
          d_created_date: d_created_date,
          s_created_by: localStorage.getItem('email'),

        };
        var url = './vser-server/save_user_role_record';
      } else if (tag == 'UPDATE') {
        
        var date = new Date();
        var d_modified_date = date.getTime();
        var data = {


          // s_user_id:$("#s_user_id").val(),
          // n_role_id:$("#n_role_id").val(),
          s_user_id: $('#s_user_id').val(),
          // s_user_id:userid,
          n_role_id: $("#n_role_id").val(),
          d_modified_date: d_modified_date,
          s_modified_by: localStorage.getItem('email'),
          s_userrole_id: $('#s_userrole_id').val(),
        };
        var url = './vser-server/update_user_role_Data';
      } else {
        return alert('Something Wrong !!!!');
      }
      
      $.ajax({
        type: 'POST',
        url: url,
        crossDomain: true,
        data: data,
        beforeSend: function () {
          $('reset').click();
          // localStorage.setItem("myidentity", `auth2 ${result.token}`);
        },
        success: function (result) {

          $('#resetuserole').click();
          $("#userid").val('');
          $("#roleid").val('');
          $('#s_user_id1').val(''),
            // s_user_id:userid,
            $("#n_role_id1").val(''),
            $('#saveuserrole').show();
          $('#updateuserrole').hide();
          get_user_role_Data();

          localStorage.setItem("myidentity", `auth2 ${result.token}`);
          getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
          setTimeout(() => {
            // window.location = "/main";
          }, 2000);

        },
        error: function (err) {
          getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);
        },
        complete: function (response) {
          get_user_role_Data();
          //  $("#loader").removeClass("is-active");
        }
      });
    } catch (error) {
      alert(error);
    }
  });
  // get_Rack_Data();

  //  get_user_role_Data=function () {
  get_user_role_Data = function () {
    try {
      $.ajax({
        type: 'POST',
        url: "./vser-server/get_user_role_Data", 
        beforeSend: function (xhr) { 
          //   xhr.setRequestHeader ("Authorization", "Basic "+localStorage.getItem("auth2token"));
        },
        success: function (result) {
          getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
          var i = 0;
          if ($.fn.dataTable.isDataTable('#userroletbl')) {
            $('#userroletbl').DataTable().destroy();
          }
          //   var tdata=result.data
          $('#userroletbl').DataTable({
            'data': result.data,
            //  "scrollX":true,
            'aoColumns': [
              /*  {
                 'render': function() 
                 {
                   i++;
                   return i;
                 },
               }, */

              {
                'data': 'username'
              },
              {
                'data': 'rolename'
              },

              //   { 'data': 's_created_by' },
              //  { 'render': function(data, type, row, meta) {
              //     return '<button type="button" class="btn active btn-info btn-sm" data-toggle="modal"  onclick="getuserroleById(' + row.s_userrole_id + ')"><span class="glyphicon glyphicon-pencil"></span></button><button type="button" class="btn active btn-info btn-sm" onclick="deleteuserroleById(' + row.s_userrole_id + ')" style="margin-left:7px"><span class="glyphicon glyphicon-trash"></span></button>';
              //   }
              // }
              {
                'render': function (data, type, row, meta) {
                  var a = `<button type='button' class='btn active btn-info btn-sm'  onclick='getuserroleById(${row.s_userrole_id})'><span class='glyphicon glyphicon-pencil'></span></button><button type='button' class='btn active btn-info btn-sm' onclick='deleteuserroleById(${row.s_userrole_id})'style='margin-left:4px'><span class='glyphicon glyphicon-trash'></span></button>`;
                  return '<span class="btn btn-info glyphicon glyphicon-cog" data-toggle="popover" title ="' + a + '"></span>';

                },
              }

            ],
          });
        },
        complete: function (res) {
          // $('.glyphicon-cog').tooltip({title: "<h1><strong>HTML</strong> inside <code>the</code> <em>tooltip</em></h1>", html: true, placement: "bottom"}); 
          $('[data-toggle="popover"]').popover({
            html: true,
            placement: "top",
            trigger: "click"
          });

        },
        error: function (error) {
          console.log(error);
        },
      });
    } catch (error) {
      alert(error);
    }
  }

  deleteuserroleById = function (s_userrole_id) {
    try {
      var data = {
        s_userrole_id: s_userrole_id,
      };
      $.ajax({
        type: 'POST',
        url: "./vser-server/deleteuserroleById",

        data: data,
        beforeSend: function (xhr) {
          $('#reset').click();
          xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem("auth2token"));
        },
        success: function (result) {
          get_user_role_Data();
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

  getuserroleById = function (s_userrole_id) {
    

    try {
      var data = {
        s_userrole_id: s_userrole_id,
      }
      $.ajax({
        type: 'POST',
        url: "./vser-server/getuserroleById",
        data: data,
        beforeSend: function (xhr) {
          //  BrandDiv();

          // $('#reset').click();
          $('#saveuserrole').hide();
          $('#updateuserrole').show();
          xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem("auth2token"));
        },
        success: function (result) {
          

          // alert("edit")

          var data = result.data;
          // $('#s_user_id1').val(data.s_user_id);
          // Alluserdata(data.s_user_id);
          Allroledata(data.n_role_id);
          //       $('#n_role_id1').val(data.n_role_id);
          // s_user_id: $('#s_user_id').val(),
          // // s_user_id:userid,
          // n_role_id:$("#n_role_id").val(),

          $('#s_user_id').val(data.s_user_id);
          $('#n_role_id').val(data.n_role_id);

          $('#s_userrole_id').val(data.s_userrole_id);



          // $('#reset').click();


        },
        error: function (error) {
          console.log(error);
        },
      });
    } catch (error) {
      alert(error);
    }

  }

  Alluserdata = function (usere_id) {
    try { 
      var data ={
        user_role : localStorage.getItem("role"),
        user_tag: "ROLE_MAPPING" ,
      }
      $.ajax({
        type: 'POST',
        url: "./vser-server/get_user_Data",
        data: data,
        beforeSend: function (xhr) {
          //  BrandDiv();

          $('#reset').click();
          $('#saveuser').hide();
          $('#updateuser').show();
          xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem("auth2token"));
        },
        success: function (result) {
          // alert("dropdown");
          
          // var url_params = getAllUrlParams(window.location)
          // // window.location
          // console.log(url_params)
          // var u=idd;
          // console.log("ll",u)

          var data = result.data[0];
          var userdrp = '';
          
          // userdrp += "<select class='fstdropdown-select form-control input-sm' id='s_user_id1' >";
          userdrp += '<option label="--select User --"></option>';
          for (var i = 0; i < result.data.length; i++) {
            userdrp += '<option value="' + result.data[i].s_user_id + '">' + result.data[i].username + '</option>';
          }
          $('#s_user_id').html(userdrp);
          // setFstDropdown();

          if (idofurl != undefined) {
            $('#s_user_id').val(idofurl);

          }
          if (usere_id != undefined) {
            $('#s_user_id').val(usere_id);

          }



          //   function setDrop() {
          //     if (!document.getElementById('third').classList.contains("fstdropdown-select"))
          //         document.getElementById('third').className = 'fstdropdown-select';
          //     setFstDropdown();
          //     // setFstDropdown1();
          // }

          // setFstDropdown1();
          // function removeDrop() {
          //     if (document.getElementById('third').classList.contains("fstdropdown-select")) {
          //         document.getElementById('third').classList.remove('fstdropdown-select');
          //         document.getElementById("third").fstdropdown.dd.remove();
          //     }
          // }
          // function addOptions(add) {
          //     var select = document.getElementById("fourth");
          //     for (var i = 0; i < add; i++) {
          //         var opt = document.createElement("option");
          //         var o = Array.from(document.getElementById("fourth").querySelectorAll("option")).slice(-1)[0];
          //         var last = o == undefined ? 1 : Number(o.value) + 1;
          //         opt.text = opt.value = last;
          //         select.add(opt);
          //     }
          // }
          // function removeOptions(remove) {
          //     for (var i = 0; i < remove; i++) {
          //         var last = Array.from(document.getElementById("fourth").querySelectorAll("option")).slice(-1)[0];
          //         if (last == undefined)
          //             break;
          //         Array.from(document.getElementById("fourth").querySelectorAll("option")).slice(-1)[0].remove();
          //     }
          // }
          // function updateDrop() {
          //     document.getElementById("fourth").fstdropdown.rebind();
          // }


        },
        error: function (error) {
          console.log(error);
        },
      });
    } catch (error) {
      alert(error);
    }
  }

  
  Allroledata = function (role_id) {
    try {
      if (window.location.hash.split("/user_role?")[1] != undefined) {
        var n_role_id = window.location.hash.split("/user_role?")[1]
        var data = {
          n_role_id: n_role_id
        }
      }
      $.ajax({
        type: 'POST',
        url: "./vser-server/get_role_Data",
        data: data,
        beforeSend: function (xhr) {
          //  BrandDiv();

          $('#reset').click();
          $('#saveuser').hide();
          $('#updateuser').show();
          xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem("auth2token"));
        },
        success: function (result) {
          

          if (window.location.hash.split("/user_role?")[1] != undefined) {
            
            var iddd = window.location.hash.split("/user_role?")[1];
            // $('#n_role_id').val(iddd);

            // $('#n_role_id').val(iddd);
            var roledrp = '';
            roledrp += "<select class='fstdropdown-select form-control form-control-sm' id='n_role_id1' > <option value='" + iddd + "'>" + result.data[0].s_role_name +
              "</option></select>";
            $('#n_role_id').html(roledrp);
            setFstDropdown();
            // $('#roleid').val(iddd);

          } else {
            
            var data = result.data[0];
            var roledrp = '';
            // roledrp+="<select class='fstdropdown-select form-control form-control-sm' id='n_role_id1' >";
            // $("#N_MAKER_ID").text("");
            roledrp += '<option label="--select Role --"></option>';
            for (var i = 0; i < result.data.length; i++) {
              roledrp += '<option value="' + result.data[i].n_role_id + '">' + result.data[i].rolename + '</option>';
            }
            // $('#n_role_id').html(roledrp);
            $('#n_role_id').html(roledrp);
            setFstDropdown();
          }
          if (role_id != undefined) {
            $('#n_role_id').val(role_id);

          }



        },
        error: function (error) {
          console.log(error);
        },
      });
    } catch (error) {
      alert(error);
    }
  } 
  if (idofurl != undefined) {
    Alluserdata(idofurl);
    Allroledata(idofurl);
  } else {
    Alluserdata();
    Allroledata();
  }
  get_user_role_Data();
})();