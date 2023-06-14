(function () {
    $("#login_btn").click(function (e) {
        debugger
        e.preventDefault();
        localStorage.setItem("email", '');
        localStorage.setItem("name", '');
        //localStorage.setItem("role", '');                     

        localStorage.setItem("id", '');
        localStorage.setItem("role", '');
        localStorage.setItem("profile", '');
        
        $("#form-login").submit();


    })
    $("#form-login").on("submit", function (e) {
        try {
            var data = {
                username: $("#email").val(),
                password: $("#pass").val(),
            };
            // return;
            $.ajax({
                url: '/login',
                type: 'POST',
                crossDomain: true,
                data: data,
                // beforeSend: function () {
                //     $("#loader").addClass("is-active");
                //     document.getElementById("loader").setAttribute("data-text", "Loading...");
                // },
                success: function (result) {
                    localStorage.setItem("email", result.data.s_email_id);
                    localStorage.setItem("name", result.data.s_bsns_name);
					localStorage.setItem("BID", result.data.n_bsns_reg_id);
					localStorage.setItem("path", result.data.s_img_path);
					localStorage.setItem("iname", result.data.s_image_name);
                    localStorage.setItem("reg_id", result.data.n_bsns_reg_id);
                    localStorage.setItem("acc_type", result.data.s_acc_type);
                    localStorage.setItem("bsns_type", result.data.bsns_type);
                    window.location = "/main";
                    //localStorage.setItem("role", result.data.id);                     

                    // localStorage.setItem("id", result.data.id);
                    // localStorage.setItem("role", result.data.role);
                    // localStorage.setItem("profile", result.data.n_img_path);



                    // localStorage.setItem("myidentity", `auth2 ${result.token}`);
                    // getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);

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
    chk_cps = function (event) {
        try {
            $("#inputUid_error").text("");
            var x = event.getModifierState("CapsLock");
            if (x == false) {
                $("#inputUid_error").text("");
                return true;
            }
            $("#inputUid_error").text("Caps Lock activated: ");
        } catch (error) {
            console.log(error);
        }
    }
})();