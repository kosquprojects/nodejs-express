var fs = require("fs")
module.exports = {
  replace: function (userText) {
    try {
      var userTexts = userText;
      if (typeof userText === "number") {
        return userText = userText === null ? 0 : userText;
      } else {
        var regExpr = /'/g; // replace the " ' " (ampersand symbol)
        //var regExpr = /[^a-zA-Z0-9-. ]/g;   // Replace all the symbol except the charcter
        // var userTexts = userText;
        if (userText == '' || userText == undefined) {
          return userText;
        } else {
          return userTexts.replace(regExpr, "''");
        }
      }
    } catch (err) {
      console.log("Json Error : " + err)
    }
  },
  dateFormate: function (UserDate) {
    try {
      var str = UserDate;
      var res = str.split("T");
      return res[0];
    } catch (err) {
      console.log("Json Error : " + err)
    }
  },

  formatdateYYMMDD: function (UserDate) {
    var date = new Date(UserDate);
    var dd = String(date.getDate());
    var mm = String(date.getMonth() + 1);
    var yr = String(date.getFullYear());
    if (dd.length == 1)
      dd = "0" + dd;
    if (mm.length == 1)
      mm = "0" + mm;
    console.log(yr + '-' + mm + '-' + dd)
    return yr + '-' + mm + '-' + dd;

  },
  delete_file: function (main_Dir, file_name) {
    try {
      var filePath = main_Dir + "/" + file_name;
      fs.unlink(filePath, function (err) {
        if (err) {
          console.log(err)
        };
        console.log('File deleted!');
        return;
      });
    } catch (error) {
      console.log(error);
      return;
    }
  },

  newDatetimeInInteger: function (dateVal) {
    try {
      var datee = dateVal == '' ? new Date() : dateVal;

      return datee.getTime();
    } catch (err) {
      console.log(err)
    }
  },

  role: function (roleVal) {
    try {
      roleName = roleVal === "ADMIN" ? 1 : 0;
      return roleName;
    } catch (error) {
      console.log(error);
    }
  }
};