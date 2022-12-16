$(document).ready(function() {
    LoadStates();
    GetRegisterById();
  });

 function GetRegisterById(){
  var id = localStorage.getItem("id");
       $.ajax({
          url: 'https://localhost:44382/api/Register?id='+id,
          type: 'GET',
          success: function(response) {
            console.log(response);
            LoadCitiesByState(response.data.stateId);
           $('#id').val(response.data.id);
           $('#FirstName').val(response.data.firstname);
           $('#LastName').val(response.data.lastname);
           $('#Mobile').val(response.data.mobile);
           const d = toDate(response.data.dob);
          //  d.setDate(15);
          $('#DateOfBirth').val(d);
          // document.getElementById("DateOfBirth").value = d;
          //  $('#DateOfBirth').val(toDate(response.data.dob));
           $('#email').val(response.data.email);
          //  $('#Password').val(response.data.password);
          //  $('#subtotal').val(str3);
          //  $('#subtotal').val(str3);
          $('#stateList').val(response.data.stateId);
          $('#cityList').val(response.data.cityId);
          $('#gender').val(response.data.genderId);
         }
      });

 }

 function LoadStates(){
  $.ajax({
    url: 'https://localhost:44382/api/Register/GetAllStates',
    method: 'get',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    success: function (data) {
        $.each(data.data, function(key,val) {
            $('#stateList').append( '<option value="'+val.id+'">'+val.stateName+'</option>' );
          });
    },
   fail : function( jqXHR, textStatus ) {
     alert( "Request failed: " + textStatus );
   }
})
 }

 function LoadCitiesByState(stateId){
  $.ajax({
     url: 'https://localhost:44382/api/Register/GetAllCitiesByState?id='+stateId,
     method: 'get',
     dataType: 'json',
     contentType: 'application/json; charset=utf-8',
     success: function (data) {
         $.each(data.data, function(key,val) {
             $('#cityList').append( '<option value="'+val.id+'">'+val.cityName+'</option>' );
           });
     },
    fail : function( jqXHR, textStatus ) {
      alert( "Request failed: " + textStatus );
    }
 })
 } 


 function toDate(dateStr) {
  const [year, month, day] = dateStr.split("-")
  return new Date(year, month - 1, day.slice(0,2))
}