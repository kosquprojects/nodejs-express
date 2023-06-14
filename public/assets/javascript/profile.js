getdata = () =>{
    var BID = localStorage.getItem("BID");
    try {
        var data={
            id:BID
        }

        $.ajax({
            url: './Qr/getuserdetails',
            type: 'POST',
            crossDomain: true,
            data: data,
            beforeSend: function () {

            },
            success: function (result) {
debugger
                console.log(result);
                var data =result.data
                $("#b_name").val(data.s_bsns_name);
                $("#s_email_id").val(data.s_email_id);
                $("#s_mobile_no").val(data.s_mobile_no);
                $("#s_bsns_address").val(data.s_bsns_address);
                var html=''
                html+='<img src="'+data.s_img_path+'/'+data.s_image_name+'" class="avatar img-circle img-thumbnail" alt="avatar" style="width:50%">'
                $('#imgpp').html(html)

            }, error: function (error) {
                console.log(error);
            },

            complete: function () {
                const today = new Date()
                var month = today.toLocaleString('default', { month: 'long' })
                //$("#s_month").val(month)
            }

        });

    } catch (err) {
        console.log(err);
    }
}
getdata()