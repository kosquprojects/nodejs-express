
const email = require('emailjs');
var mailserver = email.server.connect({
    user: "knocktechlab@gmail.com",
    password: "goals@2022",
    host: "smtp.gmail.com",
    port: 465,
    ssl: true
}); // this is for Query execution phase with COnnection   // This is emailing .js
module.exports = {

    mail_for_task: function (email,randm_no) {
        return new Promise(function (resolve, reject) {
            
        var html='';var sub='OTP for VMS System';
        html = `Dear Sir/Madam,<br><br><blockquote>Verification OTP for VMS registraction System is :<br> `;
        html += `${randm_no}</blockqoute>`;
     html += "<br><br>With Regards,<br><font color='red'><b>Note:</b>*** This is a system generated email, please do not reply. ***";

    mailserver.send({
        from: "shwetagaikwad134@gmail.com",
        to: email,//'shwetagaikwad134@gmail.com',
        //cc: ccmail,
        subject: sub,
        attachment:
            [
                { data: html, alternative: true }
            ]
    },
        function (err, message) {
            if(err){
                reject(err);
            }else{
                resolve(message);
            }
        });
        });
    },

    sendCredtoUser: function (data) {
        console.log(data);
        return new Promise(function (resolve, reject) {
            
            var html='';var sub='Credentials for VMS System';
            html = `Dear Sir/Madam,<br><br><blockquote>Credentials for VMS System is :<br> `;
            html += `Email Id : ${data.s_email_id}<br> `;
            html += `Mobile No : ${data.s_mobile_no}<br> `;
            html += `Password : ${data.s_password}`;
         html += "<br><br>With Regards,<br><font color='red'><b>Note:</b>*** This is a system generated email, please do not reply. ***";
    
        mailserver.send({
            from: "shwetagaikwad134@gmail.com",
            to: data.s_email_id,//'shwetagaikwad134@gmail.com',
            //cc: ccmail,
            subject: sub,
            attachment:
                [
                    { data: html, alternative: true }
                ]
        },
            function (err, message) {
                if(err){
                    reject(err);
                }else{
                    resolve(message);
                }
            });
            });
    },


    get_demo_mail: function (email) 
    {
        return new Promise(function (resolve, reject) 
        {
            
        var html='';var sub='Schedule Knock Demo';
        html = `Dear Sir/Madam,<br><br><blockquote> Welcome to knock.<br> `;
        html += `we will schedule your Demo As soon As possible</blockqoute>`;
       html += "<br><br>Thanks and  Regards,<br><b>Team Knock</b>";

    mailserver.send({
        from: "shwetagaikwad134@gmail.com",
        to: email,
        //cc: ccmail,
        subject: sub,
        attachment:
            [
                { data: html, alternative: true }
            ]
    },
        function (err, message) 
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(message);
            }
        });
        });
    },
    subscribe_mail: function (email) 
    {
        return new Promise(function (resolve, reject) 
        {
            
        var html='';var sub='Schedule Knock Demo';
        html = `Dear Sir/Madam,<br><br><blockquote> Thank yor Subscribe <br> `;
        html += `Our team very soon will get back to you </blockqoute>`;
     html += "<br><br>Thanks and  Regards,<br>Team Knock";

    mailserver.send({
        from: "shwetagaikwad134@gmail.com",
        to: email,
        //cc: ccmail,
        subject: sub,
        attachment:
            [
                { data: html, alternative: true }
            ]
    },
        function (err, message) 
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(message);
            }
        });
        });
    },
}