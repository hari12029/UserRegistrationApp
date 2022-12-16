$(document).ready(function() {
    LoadStates(GetRegisterById);
  });

 function GetRegisterById(){
  var id = localStorage.getItem("id");
       $.ajax({
          url: 'https://localhost:44382/api/Register?id='+id,
          type: 'GET',
          success: function(response) {
            console.log(response);
            $('#id').val(response.data.id);
            $('#FirstName').val(response.data.firstname);
            $('#LastName').val(response.data.lastname);
            $('#Mobile').val(response.data.mobile);
            //  d.setDate(15);
            $('#DateOfBirth').val(setDate(response.data.dob));
            // document.getElementById("DateOfBirth").value = d;
            //  $('#DateOfBirth').val(toDate(response.data.dob));
            $('#email').val(response.data.email);
            //  $('#Password').val(response.data.password);
            //  $('#subtotal').val(str3);
            //  $('#subtotal').val(str3);
            $('#stateList').val(response.data.stateId);
            //$('#cityList').val(response.data.cityId);
            $('#gender').val(response.data.genderId).change();
            LoadCitiesByState(response.data.stateId,response.data.cityId);
          }
        });
        
 }

 function LoadStates(callback){
  $.ajax({
    url: 'https://localhost:44382/api/Register/GetAllStates',
    method: 'get',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    success: function (data) {
        $.each(data.data, function(key,val) {
            $('#stateList').append( '<option value="'+val.id+'">'+val.stateName+'</option>' );
          });


          if(typeof callback==='function')
          callback()
    },
   fail : function( jqXHR, textStatus ) {
     alert( "Request failed: " + textStatus );
   }
})
 }

 function LoadCitiesByState(stateId,cityId){
  $.ajax({
     url: 'https://localhost:44382/api/Register/GetAllCitiesByState?id='+stateId,
     method: 'get',
     dataType: 'json',
     contentType: 'application/json; charset=utf-8',
     success: function (data) {
      console.log(data)
         $.each(data.data, function(key,val) {
             $('#cityList').append( '<option value="'+val.id+'">'+val.cityName+'</option>' );
           });

           if(cityId)
           $('#cityList').val(cityId)
     },
    fail : function( jqXHR, textStatus ) {
      alert( "Request failed: " + textStatus );
    }
 })
 } 


 function toFormat(date, settings) {
  //Setting default valaues
  var defaults = {
      format: 'ddmmyyyy',
      seperator: '/'
  };
  settings = $.extend(defaults, settings);
  var d = '';
  try {
      d = new Date(date)
      if (d == 'Invalid Date' || d == NaN)
          throw DOMException;
  }
  catch (err) {
      try {
          d = new Date(date.match(/\d+/)[0] * 1)
          if (d == 'Invalid Date' || d == NaN)
              throw DOMException;
      }
      catch (err) {
          console.log('Entered date is invalid')
          return '';
      }
  }
  var month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
  if (month.length < 2)
      month = '0' + month;
  if (day.length < 2)
      day = '0' + day;
  switch (settings.format) {
      case 'yyyymmdd':
          return [year, month, day].join(settings.seperator);
      case 'mmddyyyy':
          return [month, day, year].join(settings.seperator);
      default:
          return [day, month, year].join(settings.seperator);
  }
}

function setDate(date) {
  if (date)
      return toFormat(date, { format: 'yyyymmdd', seperator: '-' });
  else
      return toFormat(new Date(), { format: 'yyyymmdd', seperator: '-' });
}