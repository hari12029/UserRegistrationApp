window.addEventListener("DOMContentLoaded", () => {
    $.ajax({
        url: 'https://localhost:44382/api/Register/GetAllRegister',
        method: 'get',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            // var k = '<tbody>'
            let k=''; 
            $.each(data, function(key,val) {
                if(val !=null ){
                for(let i = 0;i < val.length - 1; i++){
                k+= '<tr>';
                k+= '<td>' + val[i].id + '</td>';
                k+= '<td>' + val[i].firstname + '</td>';
                k+= '<td>' + val[i].lastname + '</td>';
                k+= '<td>' + val[i].mobile + '</td>';   
                k+= '<td>' + val[i].dob + '</td>';
                k+= '<td>' + val[i].gender + '</td>';
                k+= '<td>' + val[i].state + '</td>';
                k+= '<td>' + val[i].city + '</td>';
                k+= '<td>' + val[i].email + '</td>';
                k+= '<td>' + val[i].password + '</td>';
                k+= '</tr>';
                }}
              });
              //  k+='</tbody>';
                document.getElementById('tableData').innerHTML = k;
    
        },
       fail : function( jqXHR, textStatus ) {
         alert( "Request failed: " + textStatus );
       }
    })
});

$(document).ready(function(){
    $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#tableData tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });


