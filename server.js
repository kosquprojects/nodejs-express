const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
http = require('http');
const fs = require('fs');
const formidable = require('formidable');
const csv = require('csvtojson');
var csvToJson = require('convert-csv-to-json');
var multer  = require('multer'); 
//var log4js = require('log4js');
//const RateLimiterRedis = require('rate-limiter-flexible/lib/RateLimiterRedis');

// const busboy = require('connect-busboy'); 
const busboy = require('connect-busboy');
var path = require('path');
const app = express();

app.set('views', __dirname + '/public'); // Main Entrance of project     
// app.use(express.static(__dirname + "/public/jadoo/public")); // Main Entrance of Doctor 
app.use(express.static(__dirname + "/public")); // Main Entrance of Doctor 
// app.use(express.static(__dirname + "/public/assets")); // Main Entrance of Doctor 
// app.use(express.static(__dirname + "/public/email-templates")); // Main Entrance of Doctor 
// app.use(express.static(__dirname + "/public/landing-page")); // Main Entrance of Doctor 
// app.use(express.static(__dirname + "/public/Trident")); // Main Entrance of Doctor 
// app.use(express.static(__dirname + "/public/vendor")); // Main Entrance of Doctor 
app.use(express.static(__dirname + "/utils")); // Main Entrance of Doctor 

app.use(express.static(__dirname + "/uploads"));
app.use('/uploads', express.static('uploads'));

//log4js.configure('./config/log4js.json');

app.use(busboy({            // This is BusBoy File Uploadiing MiddelWare
  highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
})); // Insert the busboy middle-ware


app.set('view engine', 'ejs'); //extension of views
// app.use(bodyParser({
//   limit: '50mb'
// }));
app.use(bodyParser.json({
  limit: '50mb', 
  extended: true
})); // this is 4 Json Data
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit:1000000000
}));
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'ssshhhhh'
}));

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

  // Pass to next layer of middleware
  next();
});

var config = require('./config/config.js'); //this is server configuration file.
var con = config.connection; // DB conectivity  

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
   /*  let extArray1 = file.mimetype.split("/");
    let extension1 = extArray[extArray.length - 1]; */
    let extArray = file.originalname.split(".");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + '-' + Date.now()+ '.' +extension )
  }
});
var storageProfile = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/ProfilePic')
  },
  filename: function (req, file, cb) {
   /*  let extArray1 = file.mimetype.split("/");
    let extension1 = extArray[extArray.length - 1]; */
    let extArray = file.originalname.split(".");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + '-' + Date.now()+ '.' +extension )
  }
})
var upload = multer({ storage: storage });
var uploadProfile = multer({ storage: storageProfile });

// global variable 
var sess;
var sesss;
// var date = Date.now();  // current datetime 
/*******Login Page******/

//var log = log4js.getLogger("app");
// routes goes here 
// var project_admin = require('./utils/route_goes_here');
// app.use('/dashboard', project_admin)  

// Url Routes goes here 
// Url Routes goes here 

//var legalRoutes = require("./routes/legalController/legalRoutes");
var QrController = require("./routes/QrController/QrRoutes");
var QrContr = require("./routes/QrController/QrController");
//app.use('/vser-server', legalRoutes);
app.use('/Qr', QrController);

//var legalRoutes = require("./routes/legalController/legalRoutes");
//app.use('/vser-server', legalRoutes);
// var legalController = require("./routes/legalController/legalController.js");
// var legalsqlc = require("./routes/legalController/legalSqlc.js");

// var pg_conn = require("./config/config");
//var con = require("./utils/dbqyeryexecute").nodeServerBridge;

var con = require("./utils/dbqyeryexecute").executeSelect;
var conmul = require("./utils/dbqyeryexecute").executeMultiple;


app.use(function (req, res, next) {
  const {
    rawHeaders,
    httpVersion,
    method,
    socket,
    url
  } = req;
  const {
    remoteAddress,
    remoteFamily
  } = socket;
  next();
})
app.get('/', function (req, res) {
  res.sendfile("./public/index.html");
});

app.post('/uploadimage', upload.single("uploadimg"), (req, res) =>{

  try {
     var a = req.file.filename;
     var b = req.body;
     
     QrContr.MarkVisitorsAttWithImg(req,res);
     
     console.log(req)
   
  } catch (error) {
    console.log(error);
  }

  // importExcelData2MySQL('./uploads/device_class/' + req.file.filename,req, res);
  // console.log(res);

  });

 app.post('/uploadManualDataWithImage', upload.single("uploadManualimg"), (req, res) =>{

     try {
       var a = req.file.filename;
       var b = req.body;
       
       QrContr.ManualVisitorsAttWithImg(req,res);
       
       console.log(req)
     
    } catch (error) {
      console.log(error);
    }
  
    // importExcelData2MySQL('./uploads/device_class/' + req.file.filename,req, res);
    // console.log(res);
  
    });
 app.post('/uploadManualDataByEmpWithImage', upload.single("uploadManImgEmp"), (req, res) =>{

    try {
       var a = req.file.filename;
       var b = req.body;
       
       QrContr.ManualVisitorsAttWithImgByEmp(req,res);
       
       console.log(req)
     
    } catch (error) {
      console.log(error);
    }
  
    // importExcelData2MySQL('./uploads/device_class/' + req.file.filename,req, res);
    // console.log(res);
  
    });
app.post('/uploadProfileImage', uploadProfile.single("uploadProfileImg"), (req, res) =>{

      try {
         var a = req.file.filename;
         var b = req.body;
         
         QrContr.uploadProfileImage(req,res);
         
         console.log(req)
       
      } catch (error) {
        console.log(error);
      }
    
      // importExcelData2MySQL('./uploads/device_class/' + req.file.filename,req, res);
      // console.log(res);
    
      });

var jwt = require('jsonwebtoken');
// var bcrypt = require('bcrypt')
/*for testing deployment */

app.post('/login', function (req, res) {
  var user_name = req.body.username;
  var password = req.body.password;
  var obj = {};
  obj.queryString = "SELECT *,getBsnsTypeById(n_bsns_type_id) as bsns_type FROM tbl_business_registration WHERE s_email_id =? and s_password=?";
  obj.arr = [user_name, password];
  con(obj).then(data => {
    if (data.length == 0) {
      res.status(400).json({
        "status": 400,
        "mess": "Record Not Found !",
        "mess_body": "You have Entered Wrong Credentials."
      });
    } else {
        if (data[0].n_delete === 0) {
        res.status(400).json({
          "status": 400,
          "mess": "Delete Account !",
          "mess_body": "Your account was deleted by Admin."
        });
      } else {
        getsession(data, req, res);
        var userdata = {
          s_email: data[0].email,
          s_pass: data[0].pass
        }
        var token = jwt.sign(userdata, "this is mine", {
          expiresIn: '1hr'
        }, {
            algorithm: 'RS256'
          });

        res.status(200).json({
          "status": 200,
          "mess": "Record Found !",
          "mess_body": "Credentials Successfully Authenticate.",
          data: data[0],
          token
        });
      }

    }
  })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        "status": 500,
        "mess": `${err.code} !`,
        "mess_body": err.message
      });
    });
})




function getsession(data, req, res) {
  sess = req.session;
  sess.user_name = req.body.username;
  console.log(sess.user_name);
}

app.get('/signin', function (req, res) {
    res.sendfile('./public/index_login.html');
})
app.get('/Privacy-Policy', function (req, res) {
  res.sendfile('./public/views/Privacypolicy.html');
})
app.get('/About', function (req, res) {
  res.sendfile('./public/views/About.html');
})
app.get('/Career', function (req, res) {
  res.sendfile('./public/views/Career.html');
})
app.get('/Help', function (req, res) {
  res.sendfile('./public/views/Help.html');
})
app.get('/Support', function (req, res) {
  res.sendfile('./public/views/Support.html');
})
app.get('/Contact-us', function (req, res) {
  res.sendfile('./public/views/contact-us.html');
})
app.get('/Pricing', function (req, res) {
  res.sendfile('./public/views/Pricing.html');
})
app.get('/Terms-and-conditions', function (req, res) {
  res.sendfile('./public/views/TNC.html');
})


app.get('/main', function (req, res) {
  sess = req.session;
  if (sess.user_name) {
    res.sendfile('./public/main.html');
  } else {
    res.redirect('/login');
  }
})


app.get('/login', function (req, res) {
  sess = req.session;
  if (sess.user_name) {
    res.redirect('/main');
  } else {
    res.redirect('/');
    //res.sendfile('./public/index.html');
  }
})

app.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('login');
    }
  })
})

/**
 * Upload photos route.
 */

app.post('/my_profile_pic', function (req, res) {
  try {
    var photos = [],
      fieldss = [];
    form = new formidable.IncomingForm();

    form.multiples = false;
    // Upload directory for the images
    form.uploadDir = path.join(__dirname, './public/assets/img/avatars/');

    // Invoked when a file has finished uploading.
    form.on('file', function (name, file) {
      try {
        // Allow only 3 files to be uploaded.
        if (photos.length === 2) {
          fs.unlink(file.path);
          return true;
        }

        var buffer = null,
          type = file.type,
          filename = '';

        // // Read a chunk of the file.
        // buffer = readChunk.sync(file.path, 0, 262);
        // // Get the file type using the buffer read using read-chunk
        // type = fileType(buffer);

        // Check the file type, must be either png,jpg or jpeg
        if (type !== null && (type === "image/png" || type === 'image/jpg' || type === 'image/jpeg')) {
          // Assign new file name
          filename = Date.now() + '-' + file.name;

          // Move the file with the new file name
          fs.rename(file.path, path.join(__dirname, './public/assets/img/avatars/' + filename), function (err, data) {
            if (err) {
              console.log(err);
            } else {
              // Add to the list of photos
              photos.push({
                status: true,
                filename: filename,
                type: type,
                publicPath: '/assets/img/avatars/' + filename,
                role: fieldss[0].role,
                id: fieldss[0].id
              });
              photos = photos[0];
              var obj = {};
              if(photos.role == 'ven'){
                obj.queryString = `update tbl_vendor set n_img_path=? where n_vendor_code=?;`;
                obj.arr = [photos.publicPath, photos.id]
              }else{
                obj.queryString = `update tbl_emp set n_img_path=? where s_emp_id=?;`;
                obj.arr = [photos.publicPath, photos.id]
              }
             
              con(obj).then(data => {
                res.status(200).json({
                  "status": 200,
                  "mess": "Updated !",
                  "mess_body": `Image Uploaded Successfully.`,
                  "data":photos.publicPath
                });
              })
                .catch(err => {
                  res.status(500).json({
                    "code": 500,
                    "status": 500,
                    "mess": "Error !",
                    "mess_body": `Error Uploading file.`
                  });
                });
            }
          });

        } else {
          photos.push({
            status: false,
            filename: file.name,
            message: 'Invalid file type'
          });
          fs.unlink(file.path, function (err, data) {
            if (err) {
              console.log(err);
            } else {
              console.log(`${file.path} deleted Succesfully.`)
            }
          });
        }
      } catch (error) {
        res.status(500).json(error);
      }
    });

    form.on('error', function (err) {
      console.log('Error occurred during processing - ' + err);
    });

    // Invoked when all the fields have been processed.
    form.on('end', function (err, fields, files) {
      console.
        log(`All Process Done here`);
    });
    // Parse the incoming form fields.
    form.parse(req, (err, fields, files) => {
      console.log('fields:', fields);
      fieldss.push(fields);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// ************** GIVEN BY GANESH***************
///////////////server.js code for image uypload

app.post('/uploadImg', function (req, res) {
  try {
    var photos = [],
      fieldss = [];
    form = new formidable.IncomingForm();

    form.multiples = false;
    // Upload directory for the images
    form.uploadDir = path.join(__dirname, './public/assets/img/logos/');

    // Invoked when a file has finished uploading.
    form.on('file', function (name, file) {
      try {
        // Allow only 3 files to be uploaded.
        if (photos.length === 2) {
          fs.unlink(file.path);
          return true;
        }

        var buffer = null,
          type = file.type,
          filename = '';

        // // Read a chunk of the file.
        // buffer = readChunk.sync(file.path, 0, 262);
        // // Get the file type using the buffer read using read-chunk
        // type = fileType(buffer);

        // Check the file type, must be either png,jpg or jpeg
        if (type !== null && (type === "image/png" || type === 'image/jpg' || type === 'image/jpeg')) {
          // Assign new file name
          filename = Date.now() + '-' + file.name;

          // Move the file with the new file name
          fs.rename(file.path, path.join(__dirname, './public/assets/img/logos/' + filename), function (err, data) {
            if (err) {
              console.log(err);
            } else {
              // Add to the list of photos
              photos.push({
                status: true,
                filename: filename,
                type: type,
                s_og_name: file.name,
                publicPath: '/assets/img/logos/' + filename,
                n_user_id: fieldss[0].n_user_id,
                s_email_id: fieldss[0].s_login_id,
                n_system_param_id: fieldss[0].n_system_param_id1,

                s_type: fieldss[0].s_type
              });
              photos = photos[0];
              var date = new Date();
              var d_created_date = date.getTime();

              if (photos.n_system_param_id == "" || photos.n_system_param_id == undefined) {
                var obj = {}
                obj.queryString = `INSERT INTO tbl_temp_img  (s_og_name , s_new_name ,  s_path ,  s_type , s_created_by , d_created_date ) VALUES ($1,$2,$3,$4,$5,$6);`;


                obj.arr = [photos.s_og_name, photos.filename, photos.publicPath, photos.s_type, photos.s_email_id, d_created_date]

              } else if (photos.n_system_param_id != "") {
                var obj = {}

                // fieldss.logoid

                // var sql  = `INSERT INTO tbl_attachment_master  (s_og_name , s_new_name ,  s_path ,  s_type , s_created_by , d_created_date,n_system_param_id ) VALUES ($$${photos.s_og_name}$$, $$${photos.filename}$$,$$${photos.publicPath}$$,$$${photos.s_type}$$, $$${photos.s_email_id}$$,$$${d_created_date}$$,$$${photos.n_system_param_id}$$);`;

                obj.queryString = `INSERT INTO tbl_attachment_master  (s_og_name , s_new_name ,  s_path ,  s_type , s_created_by , d_created_date,n_system_param_id ) VALUES ($1,$2,$3,$4,$5,$6,$7);`;

                obj.arr = [photos.s_og_name, photos.filename, photos.publicPath, photos.s_type, photos.s_email_id, d_created_date, photos.n_system_param_id]



              }


              con(obj).then(data => {
                res.status(200).json({
                  "status": 200,
                  "mess": "Updated !",
                  "mess_body": `Image Uploading Successfully.`
                });
              })
                .catch(err => {
                  res.status(500).json({
                    "code": 500,
                    "status": 500,
                    "mess": "Error !",
                    "mess_body": `Error Uploading file.`
                  });
                });
            }
          });

        } else {
          photos.push({
            status: false,
            filename: file.name,
            message: 'Invalid file type'
          });
          fs.unlink(file.path, function (err, data) {
            if (err) {
              console.log(err);
            } else {
              console.log(`${file.path} deleted Succesfully.`)
            }
          });
        }
      } catch (error) {
        res.status(500).json(error);
      }
    });

    form.on('error', function (err) {
      console.log('Error occurred during processing - ' + err);
    });

    // Invoked when all the fields have been processed.
    form.on('end', function (err, fields, files) {
      console.log(`All Process Done here`);
    });
    // Parse the incoming form fields.
    form.parse(req, (err, fields, files) => {
      console.log('fields:', fields);
      fieldss.push(fields);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// *************** GANESH*******************
// *************** Export File*******************
var http = require("http").createServer(app);
// var fileSystem = require("fs");
var fastcsv = require("fast-csv");
app.use("/public/download", express.static(__dirname + "/public/download"));
app.post("/exportData", function (req, res) {
  var obj = {};
  obj.queryString = "SELECT * from tbl_asset_master where n_status=$1"
  obj.arr = ['0'];

  con(obj).then(data => {
    var ws = fs.createWriteStream("public/download/Assetdata.csv");
    fastcsv
      .write(data.rows, {
        headers: true
      })
      .on("finish", function () {

        res.send("<a href='public/download/Assetdata.csv' download='Assetdata.csv' id='download-link'></a><script>document.getElementById('download-link').click();</script>");
      })
      .pipe(ws);
    // log.info({ "status": 500, "mess": "Record Not Found !", "mess_body": "You have Entered Wrong Credentials." });
    // res.status(500).json({ "status": 500, "mess": "Record Not Found !", "mess_body": "You have Entered Wrong Credentials." });
  })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        "code": 500,
        "status": 500,
        "mess": "Error !",
        "mess_body": "Server side Error."
      });
    });


});

//uplpoad cha form files
app.post('/uploadfile', function (req, res) {
  try {
    var sql = '';
    var obj={
      queryString:'',
      arr:[]
    };
    var uploadss = './public/assets/uploads/';
    if (!fs.existsSync(uploadss)) {
        fs.mkdirSync(uploadss);
    }
    req.pipe(req.busboy); // Pipe it through busboy
    var uploadPath_ = path.join('./public/assets/uploads/'); // Register the upload path

    var fields = {},
        files = [],
        fileSize = null;
    var date = new Date();
    req.busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
        console.log('Field [' + fieldname + ']: value: ' + val);
        fields[fieldname] = val;
    });

    req.busboy.on('file', (fieldname, file, filename) => {
        // file.on('data', function (data) {
        //     console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
        //     // fileSize += data.length;
        // });

        file.on('end', function () {
            console.log('File [' + fieldname + '] Finished');
        });

        console.log(`Upload of '${filename}' started`);
        var replaceName = filename.replace(/[&\/\\#,+( )$~%'":*?<>{}]/g, '_');
        var filenm = Date.now() + '_' + replaceName;
        //fs.rename(file.path, form.uploadDir + '/' + filenm);
        // Create a write stream of the new file
        files.push({ name: filenm, path: './assets/uploads/', oginame: replaceName });

        const fstream = fs.createWriteStream(path.join(uploadPath_, filenm));

        file.pipe(fstream);

        //On finish of the upload
        fstream.on('close', () => {
            // console.log(fileSize);
            console.log(`Upload of '${filename}' finished`);
            var data_arr = [];
            var field = fields;

            /* if(fields.n_field_id = ""){
             fields.n_field_id = null;
            }
            if(fields.n_action_id1 = ""){
             fields.n_action_id1 = null;
            } */
           
           
            if (fields.child_id == "" && obj.queryString == '') {
              obj.queryString = "INSERT INTO tbl_temp_file (s_og_name,s_new_name,s_path,s_uid,s_attach_type,s_head_id,s_seq_no) VALUES ?";
              //var dum=[]
                for (var i = 0; i < files.length; i++) {

                    obj.arr.push([ files[i].oginame ,files[i].name , files[i].path, fields.emailid , fields.type , fields.head_id ,fields.seqno]);
                    
                }

                conmul(obj).then(data => {
                  res.status(200).json({
                    "status": 200,
                    "mess": "Inserted !",
                    "mess_body": `data Uploaded Successfully.`
                  });
                })
                  .catch(err => {
                    res.status(500).json({
                      "code": 500,
                      "status": 500,
                      "mess": "Error !",
                      "mess_body": `Error Uploading file.`
                    });
                  });
            } else if (fields.child_id != "" && obj.queryString == '') {
              obj.queryString = "INSERT INTO tbl_file_master (s_evim_id,s_evim_tracking_id,s_og_name,s_new_name,s_path,s_uid,s_attach_type,s_seq_no) VALUES ?";
              for (var i = 0; i < files.length; i++) {
                  obj.arr.push([  fields.head_id , fields.child_id,files[i].oginame , files[i].name,files[i].path , fields.emailid,fields.type ,fields.seqno ]);
                  
              }
              conmul(obj).then(data => {
                res.status(200).json({
                  "status": 200,
                  "mess": "Inserted !",
                  "mess_body": `data Uploaded Successfully.`
                });
              })
                .catch(err => {
                  res.status(500).json({
                    "code": 500,
                    "status": 500,
                    "mess": "Error !",
                    "mess_body": `Error Uploading file.`
                  });
                });
            }
            
           
        });
       
    });

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// upload dynamic form file
app.post('/uploadDynfile', function (req, res) {
  
  try {
    var sql = '';
    var obj={
      queryString:'',
      arr:[]
    };
    var uploadss = './public/assets/uploads/';
    if (!fs.existsSync(uploadss)) {
        fs.mkdirSync(uploadss);
    }
    req.pipe(req.busboy); // Pipe it through busboy
    var uploadPath_ = path.join('./public/assets/uploads/'); // Register the upload path

    var fields = {},
        files = [],
        fileSize = null;
    var date = new Date();
    req.busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
        console.log('Field [' + fieldname + ']: value: ' + val);
        fields[fieldname] = val;
    });

    req.busboy.on('file', (fieldname, file, filename) => {
        // file.on('data', function (data) {
        //     console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
        //     // fileSize += data.length;
        // });

        file.on('end', function () {
            console.log('File [' + fieldname + '] Finished');
        });

        console.log(`Upload of '${filename}' started`);
        var replaceName = filename.replace(/[&\/\\#,+( )$~%'":*?<>{}]/g, '_');
        var filenm = Date.now() + '_' + replaceName;
        //fs.rename(file.path, form.uploadDir + '/' + filenm);
        // Create a write stream of the new file
        files.push({ name: filenm, path: './assets/uploads/', oginame: replaceName });

        const fstream = fs.createWriteStream(path.join(uploadPath_, filenm));

        file.pipe(fstream);

        //On finish of the upload
        fstream.on('close', () => {
            // console.log(fileSize);
            console.log(`Upload of '${filename}' finished`);
            var data_arr = [];
            var field = fields;

            /* if(fields.n_field_id = ""){
             fields.n_field_id = null;
            }
            if(fields.n_action_id1 = ""){
             fields.n_action_id1 = null;
            } */
           
           
            if (fields.head_id == "" && obj.queryString =="") {
              obj.queryString = "INSERT INTO tbl_temp_dynfile (n_form_id,n_field_id,s_og_name,s_new_name,s_path,s_uid,s_attach_type,s_show_file_name) VALUES ?";
              //var dum=[]
                for (var i = 0; i < files.length; i++) {

                    obj.arr.push([ fields.n_form_id,fields.n_field_id,files[i].oginame ,files[i].name , files[i].path, fields.emailid , fields.type ,fields.show_file_name]);
                    
                }

                conmul(obj).then(data => {
                  res.status(200).json({
                    "status": 200,
                    "mess": "Inserted !",
                    "mess_body": `data Uploaded Successfully.`
                  });
                })
                  .catch(err => {
                    res.status(500).json({
                      "code": 500,
                      "status": 500,
                      "mess": "Error !",
                      "mess_body": `Error Uploading file.`
                    });
                  });
            } else if (fields.head_id != "" && obj.queryString =="") {
              obj.queryString = "INSERT INTO tbl_dyn_file (n_form_id,n_field_id,s_evim_id,s_og_name,s_new_name,s_path,s_uid,s_attach_type,s_show_file_name) VALUES ?";
              for (var i = 0; i < files.length; i++) {
                obj.arr.push([ fields.n_form_id,fields.n_field_id,fields.head_id,files[i].oginame ,files[i].name , files[i].path, fields.emailid , fields.type ,fields.show_file_name])
                  
              }
              conmul(obj).then(data => {
                res.status(200).json({
                  "status": 200,
                  "mess": "Inserted !",
                  "mess_body": `data Uploaded Successfully.`
                });
              })
                .catch(err => {
                  res.status(500).json({
                    "code": 500,
                    "status": 500,
                    "mess": "Error !",
                    "mess_body": `Error Uploading file.`
                  });
                });
            }
            
           
        });
       
    });

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});



// ***************************************CSV File Upload*******************************

  app.post('/uploadAsset', function (req, res) {
    try {
      var photos = [],
        fieldss = [];
      form = new formidable.IncomingForm();

      form.multiples = false;
      // Upload directory 
      form.uploadDir = path.join(__dirname, './public/assets/img/avatars/');

      // Invoked when a file has finished uploading.
      form.on('file', function (name, file) {
        try {
          type = file.type,
            filename = '';
          // Check the file type, must be either png,jpg or jpeg
          if (type !== null && type === "application/vnd.ms-excel") {
            // filename = Date.now() + '-' + file.name;
            filename = Date.now() + '-' + name + '.csv';

            // Move the file with the new file name
            fs.rename(file.path, path.join(__dirname, './public/assets/img/avatars/' + filename), function (err, data) {
              if (err) {
                console.log(err);
              } else {
                var fileInputName = './public/assets/img/avatars/' + filename;

                const csvFilePath = fileInputName;

                var arruCsv = [];

                (async () => {
                  const jsonObj = await csv().fromFile(csvFilePath)
                  console.log(jsonObj);
                  arruCsv.push(jsonObj);
                  if (arruCsv.length == 0) {
                    return;
                  } else {
                    var obj = {};
                    var CSVdata = arruCsv[0]
                    for (i = 0; i < CSVdata.length; i++) {
                      var date = new Date();
                      var d_created_date = date.getTime();

                      obj.queryString = `insert into tbl_asset_master(s_asset_name,n_asset_no,s_manufacturer_name,s_make,n_model_no,s_device_category,n_serial_number,n_barcode_number,s_owner_name,s_owner_email,n_u_size,n_u_position,d_install_date,n_u_height,s_supplier,s_rated_power, s_rated_current,n_rated_voltage,s_maintenance_cycle,s_contact_person,n_contact_number,d_next_maintenance,s_customized_notes,n_status,s_created_by,d_created_date) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26)`;

                      obj.arr = [CSVdata[i].AssetName, CSVdata[i].AssetNo, CSVdata[i].Manufacrturer, CSVdata[i].Maker, CSVdata[i].ModelNo, CSVdata[i].DeviceCategory, CSVdata[i].SerialNo, CSVdata[i].BarcodeNo, CSVdata[i].OwnerName, CSVdata[i].OwnerEmail, CSVdata[i].Usize, CSVdata[i].Uposition, CSVdata[i].InstallDate, CSVdata[i].UHeight, CSVdata[i].Supplier, CSVdata[i].RatedPower, CSVdata[i].RatedCurrent, CSVdata[i].RatedVoltage, CSVdata[i].MaintenanceCycle, CSVdata[i].ContactPerson, CSVdata[i].ContactNo, CSVdata[i].NextMaintenance, CSVdata[i].CustomizedNote, '0', fieldss[0].s_created_by, d_created_date];
                      con(obj).then(data => { })
                        .catch(err => {
                          res.status(500).json({
                            "code": 500,
                            "status": 500,
                            "mess": "Error !",
                            "mess_body": `Error Uploading file.`
                          });
                        });
                    }
                    res.status(200).json({
                      "status": 200,
                      "mess": "Updated !",
                      "mess_body": `Image Uploading Successfully.`
                    });
                  }
                })();


              }
            });

          } else {
            photos.push({
              status: false,
              filename: file.name,
              message: 'Invalid file type'
            });
            fs.unlink(file.path, function (err, data) {
              if (err) {
                console.log(err);
              } else {
                console.log(`${file.path} deleted Succesfully.`)
              }
            });
          }
        } catch (error) {
          res.status(500).json(error);
        }
      });

      form.on('error', function (err) {
        console.log('Error occurred during processing - ' + err);
      });

      // Invoked when all the fields have been processed.
      form.on('end', function (err, fields, files) {
        console.
          log(`All Process Done here`);
      });
      // Parse the incoming form fields.
      form.parse(req, (err, fields, files) => {
        console.log('fields:', fields);
        fieldss.push(fields);
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });
  // ***************************************CSV File Upload End*******************************

  //start server
  var server = require('http').createServer(app)

  // Start server
  var port = process.env.PORT || 9003
  server.listen(port, function () {
    //log.info('Express server listening on port %d in %s mode', port, app.get('env'));
    console.log('Express server listening on port %d in %s mode', port, app.get('env'))
  })