(function () {
$("#content").show();
$("#topbar-dropmenu").hide(); 
    get_user_detail=function(id){
        try{
            var data={
                emailid: localStorage.getItem("email"), 
            }; 
            $.ajax({ 
                url: '/vser-server/get_user_detail',
                type: 'POST',
                crossDomain: true,
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                     $("#loader").addClass("is-active");
                     document.getElementById("loader").setAttribute("data-text", "Loading...");
                },
                success: function (result) {  
                    getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                    $(".s_about_me").text(result.data.s_about_me);  
                    $("#s_about_me").val(result.data.s_about_me);  
                    $(".n_con_number").text(result.data.n_con_number);  
                    $("#n_con_number").val(result.data.n_con_number);  
                    $(".s_user_name").text(`${result.data.s_first_name} ${result.data.s_last_name}`);  
                    $("#s_user_name").val(result.data.s_first_name);  
                    $('#image-profile').attr('src',result.data.n_img_path);
                    $('#profile_image_side').attr('src',result.data.n_img_path);
                    localStorage.setItem("img", result.data.n_img_path); 
                    $("#n_user_id").val(result.data.s_user_id);   
                    $(".n_user_id").val(result.data.s_user_id);   
                    $("#s_first_name").val(result.data.s_first_name);   
                    $(".s_first_name").val(result.data.s_first_name);
                    $("#s_last_name").val(result.data.s_last_name);   
                    $(".s_last_name").val(result.data.s_last_name); 
                     
                    $("#s_address").val(result.data.s_address);   
                    $(".s_address").val(result.data.s_address);    
                    $("#emailid").val(localStorage.getItem("email"));  
                    $(".emailid").text(localStorage.getItem("email"));   

                },
                error: function (err) {  
                    getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);
                },
                complete: function (response) {
                     $("#loader").removeClass("is-active");
                     tag = ""; 
                }
            });
        }catch(err){
            alert(err);
        }
    };
    var tag = '';
    $("#btn_update").click(function (e) {
        e.preventDefault();  
        tag = "UPDATE"; 
        $("#my-profile").submit();
    });
  
    $("#my-profile").on("submit", function (e) {
        try { 
             if (tag === "UPDATE") {
                if (confirm("Do you really want to update the profile ?")) {
                    data = {
                        s_about_me: $("#s_about_me").val(),
                        n_con_number: $("#n_con_number").val(),
                        s_user_name: $("#s_user_name").val(), 
                        n_user_id: $("#n_user_id").val(),
                        s_last_name: $("#s_last_name").val(),
                        s_first_name: $("#s_first_name").val(),
                        s_address: $("#s_address").val(),
                    
                        tag:tag
                    }; 
                } else {
                    return false;
                }
            }else{
                return false;
            };
            $.ajax({ 
                url:  "/vser-server/update_my_profile",
                type: 'POST',
                crossDomain: true,
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                beforeSend: function (xhr) {
                     $("#loader").addClass("is-active");
                     document.getElementById("loader").setAttribute("data-text", "Loading...");
                     xhr.setRequestHeader ("authorization", localStorage.getItem("myidentity"));
                },
                success: function (result) {
                    getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                },
                error: function (err) {
                    getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);
                },
                complete: function (response) {
                     $("#loader").removeClass("is-active");
                     get_user_detail();  
                }
            });
        } catch (error) {
            alert(error);
        }
    }); 
    $("#btn_change_password").click(function (e) {
        e.preventDefault();  
        tag = "CHANGEPASSWORD"; 
        $("#my-profile-password").submit();
    });
    
    $("#my-profile-password").on("submit", function (e) {
        try {   
            if(tag === "CHANGEPASSWORD") {
                if($("#s_pass_confirmation").val() != $("#s_confirmation").val()){
                    alert("Password is not match");
                    return false;
                };
                data={
                    s_confirmation: $("#s_confirmation").val(),
                    tag:tag ,
                    n_user_id: $("#n_user_id").val(),
                };
            }  else{
                return false;
            }
            $.ajax({
                url:  "/vser-server/update_my_profile",
                type: 'POST',
                crossDomain: true,
                data: JSON.stringify(data),
                contentType: "application/json;charset=utf-8",
                beforeSend: function () {
                     $("#loader").addClass("is-active");
                     document.getElementById("loader").setAttribute("data-text", "Loading...");
                },
                success: function (result) {
                    
                    getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                    $(".bandkro").click();
                    $("#s_pass_confirmation").val("");
                    $("#s_confirmation").val("");
                },
                error: function (err) {
                    
                    getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);
                },
                complete: function (response) {
                     $("#loader").removeClass("is-active");
                }
            });
        } catch (error) {
            alert(error);
        }  
    });
    
    $("#btn_change_profilepic").click(function (e) {
        e.preventDefault();  
        tag = ""; 
        $("#my-profile-pic").submit();
    });
    
    $("#my-profile-pic").on("submit", function (e) {
        try { 
            getCall_active()  
        } catch (error) {
            alert(error);
        }  
    });

    getCall_active = function () {
        try {
            $("#loader").addClass("is-active");
            document.getElementById("loader").setAttribute("data-text", "Loading...");
        } catch (error) {
            alert(error);
        }
    };


    
    getCall_deactive = function () {
        
        try {
            $("#loader").removeClass("is-active");
            var ifram = $("#output_frame1").contents().find("pre").html();
            if (!ifram) {
                return;
            }
            var jsonData = this.JSON.parse(ifram);
            
            if (jsonData.status == 200) {
                get_user_detail()
                $(".bandkro").click(); 
                sataus = 'success';
            }else{
                sataus = 'danger';
            }
            getnotify(sataus, undefined, 1, 'stack_top_right', jsonData.mess, jsonData.mess_body);
      
        } catch (err) {
            alert(err);
        }
    };

    get_user_detail();
})();

