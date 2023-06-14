(function () {
    var tag = '', status = '', vendor_data;
    //Class dashboardUI: Handle dashboardUI Task
    class
        dashboardUI {
        
        static showchart(){
            var ctx = document.getElementById('myChart').getContext('2d');
            var chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'line', // also try bar or other graph types
            
                // The data for our dataset
                data: {
                    labels: ["Jun 2016", "Jul 2016", "Aug 2016", "Sep 2016", "Oct 2016", "Nov 2016", "Dec 2016", "Jan 2017", "Feb 2017", "Mar 2017", "Apr 2017", "May 2017"],
                    // Information about the dataset
                datasets: [{
                        label: "Visitors",
                        backgroundColor: 'lightblue',
                        borderColor: 'royalblue',
                        data: [26.4, 39.8, 66.8, 66.4, 40.6, 55.2, 77.4, 69.8, 57.8, 76, 110.8, 142.6],
                    }]
                },
            
                // Configuration options
                options: {
                layout: {
                  padding: 10,
                },
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: 'Monthly Visitors Data'
                    },
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Visitors Visited'
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Month of the Year'
                            }
                        }]
                    }
                }
            });
            
        }

        //this is use for vendor dropdown
        static displayDetailData(data){
            try{
                if ($.fn.dataTable.isDataTable('#detaildata')) {
                    $('#detaildata').DataTable().destroy();
                  }
                  $('#detaildata').DataTable({
                    lengthMenu: [[26, 100, -1], [26, 100, "All"]],
                    pageLength: -1,
                    'data': data,
                    "scrollX": true,
                    'aoColumns': [
                        //{ 'data': 'EVIM' },
                         { 'data': 's_evim_id' },
                         { 'data': 's_evim_tracking_id' },
                         {'data':'category'},
                         {'data':'subcat'},
                         { 'data': 's_job_no' },
                         { 'data': 'billing_plant' },
                         { 'data': 'submission_plant' },
                         { 'data': 's_evim_name' },
                    ],
                    deferRender: true,
                    scrollY: 1000,
                    scrollCollapse: true,
                    scroller: true
          
                });
             }catch(err){
                console.log(err);
            }
        }
        static displayvendor(ven, label) {

            try {

                let html = `<option value="">Select Vendor Code</option>`;
                ven.forEach(element => {
                    html += `<option value="${element.s_email_id}">${element.n_vendor_code}-${element.s_vendor_name}</option>`;

                });
                $("#" + label).html(html);

            } catch (err) {
                console.log(err);
            }
        }
        static display_dash_table(data) {
            const months = { "April": 1, "May": 2, "June": 3, "July": 4, "August": 5, "September": 6, "October": 7, "November": 8, "December": 9, "January": 10, "February": 11, "March": 12 };
            data.sort(function (a, b) {
                return months[a.Month] - months[b.Month];
            });
            console.log("abd", data)
            debugger;
            try {
                let html = ``;
                if (data.length == 0 || data[0].Month == null) {
                    html += `<div><center><b>Data Not Available</b></center></div>`
                } else {


                    html += `<table class="table table-bordered datatab" id="report_table" style="width:100%">`
                    html += `<thead class="thead-light">`;
                    html += `<tr>`;
                    html += `<th>Month</th>`;
                    html += `<th style="color:blue">Invoice Uploaded</th>`;
                    html += `<th style="color:green">Accepted</th>`;
                    html += `<th td style="color:red">Rejected</th>`;
                    html += `<th style="color:orange">Invoice On Hold</th>`;
                    html += `<th>With Level 1</th>`;
                    html += `<th>With Level 2</th>`;
                    html += `<th>With Level 3</th>`;
                    html += `<th>Finance</th>`;
                    html += `</tr>`;
                    html += ` </thead>`;
                    html += ` <tbody>`;

                    data.forEach((e, i) => {
                        // html += `<tr><td colspan="9"> <center><h3>${e.Month}</h3></center></td></tr>`;
                        html += `<tr sort-order="${i}"><td>${e.Month} Nos.</td><td style="color:blue;text-align:right;"><a style="cursor: pointer;color:blue;" onclick='getDetaildata("${e.Month}","al");' data-toggle="modal" data-target="#detailModal">${e.uploaded_invoice}</a></td><td style="color:green;text-align:right;"><a style="cursor: pointer;color:blue;" onclick='getDetaildata("${e.Month}","ac");' data-toggle="modal" data-target="#detailModal">${e.accepted_invoice}</a></td><td td style="color:red;text-align:right;"><a style="cursor: pointer;color:blue;" onclick='getDetaildata("${e.Month}","U4");' data-toggle="modal" data-target="#detailModal">${e.Rejected_invoice}</a></td><td style="color:orange;text-align:right;"><a style="cursor: pointer;color:blue;" onclick='getDetaildata("${e.Month}","C1");' data-toggle="modal" data-target="#detailModal">${e.onhold_invoice}</a></td><td style="text-align:right;"><a style="cursor: pointer;color:blue;" onclick='getDetaildata("${e.Month}","C2");' data-toggle="modal" data-target="#detailModal">${e.level_1}</a></td><td style="text-align:right;"><a style="cursor: pointer;color:blue;" onclick='getDetaildata("${e.Month}","A1");' data-toggle="modal" data-target="#detailModal">${e.level_2}</a></td><td style="text-align:right;"><a style="cursor: pointer;color:blue;" onclick='getDetaildata("${e.Month}","A2");' data-toggle="modal" data-target="#detailModal">${e.level_3}</a></td><td style="text-align:right;"><a style="cursor: pointer;color:blue;" onclick='getDetaildata("${e.Month}","A3");' data-toggle="modal" data-target="#detailModal">${e.level_4}</a></td></tr>`;
                        html += `<tr><td>${e.Month}  Values.</td><td style="color:blue;text-align:right;">${numberWithCommas(e.uploaded_invoice_amt.toFixed(2))}</td><td style="color:green;text-align:right;">${numberWithCommas(e.accepted_invoice_amt.toFixed(2))}</td><td style="color:red;text-align:right;">${numberWithCommas(e.Rejected_invoice_amt.toFixed(2))}</td><td style="color:orange;text-align:right;">${numberWithCommas(e.onhold_invoice_amt.toFixed(2))}</td><td style="text-align:right;">${numberWithCommas(e.level_1_amt.toFixed(2))}</td><td style="text-align:right;">${numberWithCommas(e.level_2_amt.toFixed(2))}</td><td style="text-align:right;">${numberWithCommas(e.level_3_amt.toFixed(2))}</td><td style="text-align:right;">${numberWithCommas(e.level_4_amt.toFixed(2))}</td></tr>`;
                        html += `<tr><td colspan="9"></td></tr>`;



                    });
                    html += `</tbody>`;
                    html += ` </table>`;
                }
                $("#report_tab").html(html);

            } catch (err) {
                console.log(err);
            }
        }
        //this is use for vendor dropdown
        static displayPlant(plant, bill_plant, sub_plant) {
            try {

                let html = `<option value="">Select Plant</option>`;
                plant.forEach(element => {
                    html += `<option value="${element.s_plant_name}">${element.s_plant_name}</option>`;

                });
                $("#" + bill_plant).html(html);
                $("#" + sub_plant).html(html);
            } catch (err) {
                console.log(err);
            }
        }
        //get Financial Year 
        static get_financial_year() {

            var currentYear = new Date().getFullYear();
            for (var i = 0; i < 30; i++) {
                var next = currentYear + 1;
                var year = currentYear + '-' + next.toString().slice(-2);
                $('#d_year').append(new Option(year, year));
                currentYear--;
            }
        }

        static getMonthFromString(mon){
            return new Date(Date.parse(mon +" 1, 2012")).getMonth()+1
          }
    }
    class dashboardTransaction {

        static test() {

            alert('test')
        }

        // this function for get users
        static getcount() {
            debugger
			var BID = localStorage.getItem("BID");
            try {
                var data={
					id:BID
				}

                $.ajax({
                    url: './Qr/getcount',
                    type: 'POST',
                    crossDomain: true,
                    data: data,
                    beforeSend: function () {

                    },
                    success: function (result) {
debugger
                        console.log(result);
                        $("#daycnt").html(result.data[0].daily_count);
                        $("#weekcnt").html(result.data[0].weekly_count);
                        $("#monthcnt").html(result.data[0].monthly_count);
                        $("#totalcnt").html(result.data[0].total_count);
                        $("#IN_COUNT").html(result.data[0].IN_COUNT);
                        $("#OUT_COUNT").html(result.data[0].OUT_COUNT);
						$("#EMP_IN_COUNT").html(result.data[0].EMP_IN_COUNT);
                        $("#EMP_OUT_COUNT").html(result.data[0].EMP_OUT_COUNT);
                        dashboardUI.showchart();
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

        static gettodaydata() {
            debugger
			var BID = localStorage.getItem("BID");
            try {
                var data={
					id:BID
				}

                $.ajax({
                    url: './Qr/gettodaydata',
                    type: 'POST',
                    crossDomain: true,
                    data: data,
                    beforeSend: function () {

                    },
                    success: function (result) {
debugger
                        console.log(result);
                        var data = result.data
                        var html=''
                        data.forEach(element => {
                         html+='<tr>'
                         html+='<td>'+element.s_visitor_name+'</td>'
                         html+='<td>'+element.s_contact_prsn_name+'</td>'
                         html+='<td>'+element.s_reason+'</td>'
                         html+='</tr>' 
                        });
                        $('#INDATA').html(html)
                        dashboardUI.showchart();
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

        static gettodayoutdata() {
            debugger
			var BID = localStorage.getItem("BID");
            try {
                var data={
					id:BID
				}

                $.ajax({
                    url: './Qr/gettodayoutdata',
                    type: 'POST',
                    crossDomain: true,
                    data: data,
                    beforeSend: function () {

                    },
                    success: function (result) {
debugger
                        console.log(result);
                        var data = result.data
                        var html=''
                        data.forEach(element => {
                         html+='<tr>'
                         html+='<td>'+element.s_visitor_name+'</td>'
                         html+='<td>'+element.s_contact_prsn_name+'</td>'
                         html+='<td>'+element.s_reason+'</td>'
                         html+='</tr>' 
                        });
                        $('#OUTDATA').html(html)
                        dashboardUI.showchart();
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


    }

    reload =()=>{
        dashboardTransaction.getcount(),
        dashboardTransaction.gettodaydata(),
        dashboardTransaction.gettodayoutdata()
    }

    window.setInterval(reload, 1000);


    document.addEventListener('DOMContentLoaded', dashboardTransaction.getcount(),dashboardTransaction.gettodaydata(),dashboardTransaction.gettodayoutdata());
    get_report = function () {

        dashboardTransaction.get_report();

    }

    getDetaildata=function(mon,type){
        dashboardTransaction.getDetailData(mon,type);
    }


})();

