const fs = require('fs');

var uploadss = './uploads';
if (!fs.existsSync(uploadss)) {
  fs.mkdirSync(uploadss);
}

/*var LitiAttch = './uploads/LitigationUpload';
if (!fs.existsSync(LitiAttch)) {
  fs.mkdirSync(LitiAttch);
}*/


module.exports = {
formatdateYYMMDD : function(date) {
var date = typeof date == "string" ? new Date(date) : date
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
checkTime: function (i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  },
  startTime: function (time) {
    var dd = String(date.getDate());
    var h = String(time.getHours());
    var m = String(time.getMinutes());
    var s = String(time.getSeconds());
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    return h + ":" + m + ":" + s;
  },

  index_Of: function (str, indexVal) {
    try {
      if (indexVal != '' || indexVal != undefined) {
        return str.toUpperCase().indexOf(indexVal.toUpperCase());
      }
    } catch (err) {
      console.log(err)
    }
  },
 
  modifiyData:function(data) {
    var date = new Date()
    var maindata={};
    var dateRange={};

    if (data.length > 7) {
        var str = data.replace(/\(|\)/g, "");
        dateRange.fromDate=str.substring(0, 7);
        dateRange.toDate=str.substring(11, 18);
        maindata.month=this.getMonthName(dateRange.fromDate.substring(5,7))+','+this.getMonthName(dateRange.toDate.substring(5,7));
        var stryear=dateRange.fromDate.substring(0,4);
        if(stryear != dateRange.toDate.substring(0,4)){
          stryear +=','+dateRange.toDate.substring(0,4);
        }
        maindata.year=stryear;
        return maindata;
        console.log(maindata);
    } else if (data.length == 7) {
        var mon= data.split('-');
        console.log(mon);
         maindata.month=this.getMonthName(mon[1]);
         maindata.year=mon[0];
         return maindata;
    }/*  else if (data.length == 2) {
        return date.getFullYear() + '-' + data
    } */
},

modifyFiscalyear:function(year){
   var prevyear=year-1;
  // return "31-03-"+prevyear+",01-04-"+year;
  return prevyear+'-'+year.substring(2,4);

},
getMonthName:function(mon){
  var yr='';
  if(mon =='01'){
    return yr="January";
  }else if(mon =='02'){
    return yr="February";
  }else if(mon =='03'){
    return yr="March";
  }else if(mon =='04'){
    return yr="April";
  }else if(mon =='05'){
    return yr="May";
  }else if(mon =='06'){
    return yr="June";
  }else if(mon =='07'){
    return yr="July";
  }else if(mon =='08'){
    return yr="August";
  }else if(mon =='09'){
    return yr="September";
  }else if(mon =='10'){
    return yr="October";
  }else if(mon =='11'){
    return yr="November";
  }else if(mon =='12'){
    return yr="December";
  }
},
getLocationParam:function(val){
  if(val == 'India' || val == 'Egypt' || val=='USA' || val=='Mexico'|| val=='China'|| val=='Phillipines' || val=='UK'){
    return 2;
  }else if(val == 'Vasind' || val=='Wada' || val=='Murbad' || val=='Silvasa' || val=='Goa' || val=='Nallagarh' ||val == 'Vapi' || val=='EP-GL' || val=='EP-HB' || val=='EP-KB' || val=='EP-TB' || val=='EP-SL'){
    return 3;
  }
},
  getFiscalYear: function () {
    var date = new Date();
    var mon = date.getMonth() + 1; //1=January, 2=February ,3=march
    var yearDiff = '';
    if (mon == 4) {
      yearDiff = date.getFullYear() + '-' + (date.getFullYear() + 1).toString().substring(2, 4);
    } else {
      yearDiff = date.getFullYear() - 1 + '-' + (date.getFullYear()).toString().substring(2, 4);
    }
    return yearDiff;
  }
}