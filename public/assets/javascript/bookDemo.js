(function () 
{

  $("#demo_login_btn").click(function (e) 
  {    e.preventDefault();

  
     debugger;
      $("#demo-form-login").submit();
      

  });

  $("#subscribe_form_login_btn").click(function (e) 
  {    e.preventDefault();

       debugger;
      $("#subscribe-form-login").submit();

  });


  $("#subscribe-form-login").on("submit", function (e) 
  {
    var   email= $("#subscribeEmail").val();

var atposition=email.indexOf("@");  
var dotposition=email.lastIndexOf(".");  


 if (atposition<1 || dotposition<atposition+2 || dotposition+2>=email.length)
  {  
    alert("Please enter a valid e-mail address \n atpostion:"+atposition+"\n dotposition:"+dotposition);  
    return true;  
   } 
   else
    {   
    try {
      var data = 
      {
          subscribeEmail: $("#subscribeEmail").val(),
          
      };
      // return;
      $.ajax({
          url: './Qr/subscribemail',
          type: 'POST',
          crossDomain: true,
          data: data,
          // beforeSend: function () {
          //     $("#loader").addClass("is-active");
          //     document.getElementById("loader").setAttribute("data-text", "Loading...");
          // },
          success: function (result) 
          {
            $("#subscribeEmail").val("");
       

            alertify.set('notifier','position', 'top-center');
            alertify.success('Thank you for subscribe ');

          },
          error: function (err) 
          {
              getnotify('danger', undefined, 1, 'stack_top_right');
          },
          complete: function (response) 
          {
              $("#loader").removeClass("is-active");
          }
      });
  } catch (error) {
      alert(error);
  }
}  
  });



  $("#demo-form-login").on("submit", function (e) 
  {
    var name = $("#demo_name").val();
    var   email= $("#demo_mail").val();
    var  contact= $("#demo_contact").val();
    var atposition=email.indexOf("@");  
    var dotposition=email.lastIndexOf(".");  
  
      if (name==null || name=="")
      {  
        alert("Name can't be blank");  
        return true;  
      }
      else if (atposition<1 || dotposition<atposition+2 || dotposition+2>=email.length)
      {  
        alert("Please enter a valid e-mail address \n atpostion:"+atposition+"\n dotposition:"+dotposition);  
        return true;  
       } 
       else if (isNaN(contact))
       {  
          document.getElementById("demo_contact").innerHTML="Enter Numeric value only";  
          return true;  
        }
        else
        {
          alert("BOK DEMO HERE")
          try {
            var data = {
                username: $("#demo_name").val(),
                email: $("#demo_mail").val(),
                contact: $("#demo_contact").val(),
  
  
                //demo_contact
            };
            // return;
            $.ajax({
                url: './Qr/getDemo',
                type: 'POST',
                crossDomain: true,
                data: data,
                // beforeSend: function () {
                //     $("#loader").addClass("is-active");
                //     document.getElementById("loader").setAttribute("data-text", "Loading...");
                // },
                success: function (result) 
                {
                  //exampleModal
                  $("#demo_name").val("");
                  $("#demo_mail").val("");
                  $("#demo_contact").val("");
                  $('#exampleModal').modal('hide');
  
                  // var msg = alertify.message('Default message');
                  // msg.delay(10).setContent('CHECK YOUR MAIL FOR DEMO');
                
  
                  alertify.set('notifier','position', 'top-center');
                  alertify.success('CHECK YOUR MAIL FOR DEMO  ');
                  // + alertify.get('notifier','position')
  
                },
                error: function (err) 
                {
                    // getnotify('danger', undefined, 1, 'stack_top_right');
                },
                complete: function (response) {
                    // $("#loader").removeClass("is-active");
                }
            });
        } catch (error) {
            alert(error);
        }
        }
     
  });
  
  function validateform(){

  var name = $("#demo_name").val();
  var   email= $("#demo_mail").val();
  var  contact= $("#demo_contact").val();
  var atposition=email.indexOf("@");  
  var dotposition=email.lastIndexOf(".");  

    if (name==null || name=="")
    {  
      alert("Name can't be blank");  
      return;  
    }else if (atposition<1 || dotposition<atposition+2 || dotposition+2>=x.length){  
      alert("Please enter a valid e-mail address \n atpostion:"+atposition+"\n dotposition:"+dotposition);  
      return;  
     } 
     else if (isNaN(contact)){  
        document.getElementById("demo_contact").innerHTML="Enter Numeric value only";  
        return;  
      } 
    }  
})();
