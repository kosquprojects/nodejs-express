var email = require("emailjs");
var mailserver = email.server.connect({
    user: "shikha.dwivedi2707@gmail.com",
    password: "9594600327",
    host: "smtp.gmail.com",
    port: 465,
    ssl: true
});

module.exports = {
        //aprname is contain legal name in it when asign send  to legal


        mail_for_approve: function (req,appr) {
            var legal = [];
            var emails = '';
            var html='';var sub='',burl='',jobno='';

            if(req.body.cat_nm=='IMPORT' && req.body.subcat == 'CHA'){
                 burl="upload-invoice";
                 jobno=req.body.jobno;
               
            }else{
                burl='upload-dynamic';
                var ind=req.body.data.fields.findIndex(e => (e.name =="189"));
                if(ind!=-1){
                  jobno=req.body.data.fields[ind].value;
                }
            }
             
             
             if(req.body.status == 'C2' || req.body.status == 'A1' || req.body.status == 'A2'){
                 if(req.body.status == 'C2'){
                    emails=appr[0].s_excutive_id;
                 }else if(req.body.status == 'A1'){
                    emails=appr[0].s_supervisor_id;
                 }else if(req.body.status == 'A2'){
                    emails=appr[0].s_manger_id;
                 }
                html = `Dear Sir/Madam,<br><br><blockquote>You have received a request from eVIM portal for clearing of Invoices against below <br> 
                 Job Work N0  ${jobno} / eVIM ID- ${req.body.head}  <br>
                Kindly click on the below link to approve the same.<br>`;
                
                html += `<a href="http://1.6.30.198:9003/main#/${burl}/${emails}?head=${req.body.head}&act=${req.body.status}&lvl=${req.body.lvl}&type=a&cat=${req.body.cat_nm}&subcat=${req.body.subcat}">Click Here</a></blockqoute>
                `;
                sub=`Job Work N0 ${jobno} / eVIM ID- ${req.body.head}`;
             }else if(req.body.status == 'U1' || req.body.status == 'U2' || req.body.status == 'U3'){
                 emails=req.body.created_by;

                html = `Dear Sir/Madam,<br><br><blockquote>Your request through eVIM portal has been rejected against below <br> 
                Job Work N0  ${jobno} / eVIM ID- ${req.body.head} <br>
                Kindly click on the below link to do the necessary corrections.<br>`;
                html += `<a href="http://1.6.30.198:9003/main#/${burl}/${emails}?head=${req.body.head}&act=${req.body.status}&lvl=${req.body.lvl}&cat=${req.body.cat_nm}&subcat=${req.body.subcat}">Click Here</a></blockqoute>
                `; 
                sub=`Return Job Work N0 ${jobno} / eVIM ID- ${req.body.head}`;
             }else if(req.body.status == 'U4'){
                emails=req.body.created_by;

                html = `Dear Sir/Madam,<br><br><blockquote>Your request through eVIM portal has been rejected against below <br> 
                Job Work N0  ${jobno} / eVIM ID- ${req.body.head} <br>
                Kindly click on the below link to create a new request.<br>`;
                html += `<a href="http://1.6.30.198:9003/main#/upload-invoice">Click Here</a></blockqoute>
                `; 
                sub=`Rejected Job Work N0 ${jobno} / eVIM ID- ${req.body.head}`;
             }

             html += "<br><br>With Regards,<br><font color='red'><b>Note:</b>*** This is a system generated email, please do not reply. ***";
           

            // console.log(emails + "," + toemail)
            mailserver.send({
                from: "evim@eplglobal.com",
                to:  emails,
                // cc: emails + " " + toemail,
                subject: sub,
                attachment:
                    [
                        { data: html, alternative: true }
                    ]
            },
                function (err, message) {
                    if(err){
                    console.log(err );return;}
                    console.log(message);
                });
        },
        mail_to_approve:function (req,appr) {
            var legal = [];
            var emails = '';

            req.body.child.forEach(element => {
                if(req.body.status == 'A3'){
                    var html = `Dear Sir/Madam,<br><br><blockquote>Your request through eVIM portal has been accepted against below:<br> Job Work N0 ${req.body.jobno} / eVIM ID- ${req.body.head} / eVIM Tracking Id- ${element.s_evim_tracking_id}</blockquote>`;
                         
                    html += "<br><br>With Regards,<br><br><font color='red'><b>Note:</b>*** This is system generated Email,do not reply. ***";
                    var attachment= [
                        { data: html, alternative: true },
                       
                    ]
                    var files=element.files.split(",");
                    files.forEach(f => {
                        var file = f.split(";");
                        if (file[3] == 'inv') {
                          
                          var ext=file[0].slice((file[0].lastIndexOf(".") - 1 >>> 0) + 2);
                          console.log(ext);
                           var path=file[2].replace(".","");
                          attachment.push({path:`public${path}${file[1]}`,type:`application/${ext}`,name:`${file[0]}`})
                            }
                      });
                  
       
                   // console.log(emails + "," + toemail)
                   mailserver.send({
                       from: "evim@eplglobal.com",
                       to: "ep_iv@eplglobal.com",// ep_iv@eplglobal.com to epglobal
                       // cc: emails + " " + toemail,
                       subject: `1100_${element.s_evim_tracking_id}`,//`${element.s_evim_tracking_id.substring(0, 4)}_${element.s_evim_tracking_id}`,
                       attachment:attachment
                          /*  [
                               { data: html, alternative: true },
                               { path: 'path/to/file.zip', type: 'application/zip', name: 'renamed.zip' },
                           ] */
                   },
                       function (err, message) {
                           console.log(err || message);
                           console.log(message);
                       });
               
                }
            });
           
               

        },

        mail_to_approve_dynamic:function (req) {
            var legal = [],attachment=[];
            var emails = '';
            debugger;
            var ind=req.body.data.fields.findIndex(e => (e.name =="189"));
            if(ind!=-1){
              var jobno=req.body.data.fields[ind].value;
    
              
            }
            
                if(req.body.status == 'A3'){
                    var html = `Dear Sir/Madam,<br><br><blockquote>Your request through eVIM portal has been accepted against below:<br> Job Work N0 ${jobno} / eVIM ID- ${req.body.head} / eVIM Tracking Id- ${req.body.head}01</blockquote>`;
                       
                    html += "<br><br>With Regards,<br><br><font color='red'><b>Note:</b>*** This is system generated Email,do not reply. ***";
                  
                    attachment.push( { data: html, alternative: true });
                    var files=req.body.files;
                    files.forEach(f => {
                      //  var file = f.split(";");
                        if (f.s_attach_type == 'inv') {
                          
                          var ext=f.s_og_name.slice((f.s_og_name.lastIndexOf(".") - 1 >>> 0) + 2);
                          console.log(ext);
                           var path=f.s_path.replace(".","");
                          attachment.push({path:`public${path}${f.s_new_name}`,type:`application/${ext}`,name:`${f.s_og_name}`})
                            }
                      });
                   // console.log(emails + "," + toemail)
                   mailserver.send({
                    from: "apponext.soft.2020@gmail.com",
                      to:"dwivedishikha2707@gmail.com",
                      
                      subject: `1100_${req.body.head}01`,//`${req.body.head.substring(0, 4)}_${req.body.head}01`,
                      
                     attachment:attachment
                        //    [
                        //        { data: html, alternative: true }
                        //    ]
                   },
                       function (err, message) {
                           console.log(err || message);
                           console.log(message);
                       });
               
                }
            //});
           
               

        },
        smail_to_approve:function (data) {
            var legal = [];
            var emails = '';

            data.forEach(element => {
               // if(req.body.status == 'A3'){
                    var html = `Dear Sir/Madam,<br><br><blockquote>Your request through eVIM portal has been accepted against below:<br> Job Work N0 ${element.s_job_no} / eVIM ID- ${element.s_evim_id} / eVIM Tracking Id- ${element.s_evim_id}01</blockquote>`;
                         
                    html += "<br><br>With Regards,<br><br><font color='red'><b>Note:</b>*** This is system generated Email,do not reply. ***";
                    var attachment= [
                        { data: html, alternative: true },
                       
                    ]
                    var files=element.files.split(",");
                    files.forEach(f => {
                        var file = f.split(";");
                        if (file[3] == 'inv') {
                          
                          var ext=file[0].slice((file[0].lastIndexOf(".") - 1 >>> 0) + 2);
                          console.log(ext);
                           var path=file[2].replace(".","");
                          attachment.push({path:`public${path}${file[1]}`,type:`application/${ext}`,name:`${file[0]}`})
                            }
                      });
                  
       
                   // console.log(emails + "," + toemail)
                   mailserver.send({
                       from: "apponext.soft.2020@gmail.com",
                       to: "dwivedishikha2707@gmail.com",// ep_iv@eplglobal.com to epglobal
                       // cc: emails + " " + toemail,
                       subject: `${element.s_evim_id.substring(0, 4)}_${element.s_evim_id}01`, //`${element.s_evim_id.substring(0, 4)}_${element.s_evim_id}01`,
                       attachment:attachment
                          /*  [
                               { data: html, alternative: true },
                               { path: 'path/to/file.zip', type: 'application/zip', name: 'renamed.zip' },
                           ] */
                   },
                       function (err, message) {
                           console.log(err || message);
                           console.log(message);
                       });
               
                //}
            });
        
        },

        approved_mail:function (data) {
            var legal = [];
            var emails = '';
            var html = `Dear Sir/Madam,<br><br><blockquote>Below List contain no of invoices which are approved through eVIM portal :<br></blockquote> `;
            data.forEach(element => {
               // if(req.body.status == 'A3'){
                   
                    
                    html+=`${element.type} : ${element.total}<br>`;
            });
                         
                    html += "<br><br>With Regards,<br><br><font color='red'><b>Note:</b>*** This is system generated Email,do not reply. ***";
                    var attachment= [
                        { data: html, alternative: true },
                       
                    ]
                 
                      
                   // console.log(emails + "," + toemail)
                   mailserver.send({
                       from: "shikha.dwivedi2707@gmail.com",
                       to: "dwivedishikha2707@gmail.com",// ep_iv@eplglobal.com to epglobal
                       // cc: emails + " " + toemail,
                       subject: `Invoices Approved in eEVIM System`, //`${element.s_evim_id.substring(0, 4)}_${element.s_evim_id}01`,
                       attachment:attachment
                          /*  [
                               { data: html, alternative: true },
                               { path: 'path/to/file.zip', type: 'application/zip', name: 'renamed.zip' },
                           ] */
                   },
                       function (err, message) {
                           console.log(err || message);
                           console.log(message);
                       });
               
                //}
        
        },

    }