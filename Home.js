$(document).ready(function() {
  LoadRegisteredUsers();
} );

function LoadRegisteredUsers(){
  $.ajax({
    url: 'https://localhost:44382/api/Register/GetAllRegister',
    success: function (json) {
      console.log(json)
        table = $('#tableId').DataTable({
           "order": [[0, "asc"]],  
            columns: [
              { data: 'id' },
              { data: 'firstname' },
              { data: 'lastname' },
              { data: 'mobile' },
              { data: 'dob' },
              { data: 'gender' },
              { data: 'state' },
              { data: 'city' },
              { data: 'email'},              
              { data: function (row) {
                return '<a title="Edit" class="btn action-btn btn-primary btn-sm edit-btn mr-1" data-id="'+row.id+'">'+'<i class="glyphicon glyphicon-edit"></i>'+'Edit</a>'+
                '<a title="Delete" class="btn action-btn btn-danger btn-sm delete-btn" data-id="'+
                row.id+'">'+'<i class="glyphicon glyphicon-trash"></i> Delete</a>' 
               }
              }
            ]
        });
        table.clear();
        table.rows.add(json.data).draw();
    },    
})
}

$(document).on('click','.delete-btn',function(event){
  const id = $(event.currentTarget).data('id');
  deleteitem(id);
})

function deleteitem(id) {
 $.ajax({
      url: 'https://localhost:44382/api/Register/DeleteRegister?id='+id,
      type: 'DELETE',
      success: function(response) {
        $("#tableId").dataTable().fnDestroy()
        LoadRegisteredUsers();
      }
  });
}

$(document).on('click','.edit-btn',function(event){
  const id = $(event.currentTarget).data('id');
  edititem(id);
})

function edititem(id) {
  //  var id = $('#btndelete').attr('id'),
  localStorage.setItem("id",id);
  window.location.href = 'Edit.html';
  ///?id='+id;
  //  $.ajax({
  //       url: 'https://localhost:44382/api/Register?id='+id,
  //       type: 'GET',
  //       success: function(response) {
  //         if (!$("#tableId").classList.contains("hide"))
  //         {
  //           $("#tableId").classList.add("hide");
  //         }
  //         $("#tableId").classList.remove("hide");

  //       }
  //   });
  }

  function updateitem(id){
    $.ajax({
      url: 'https://localhost:44382/api/Register/UpdateRegister?id='+id,
      type: 'GET',
      success: function(response) {
        $("#tableId").dataTable()
        LoadRegisteredUsers();
      }
  });
  }
// function deleteitem() {
//   $("#tableId").on('click','.btndelete',function () {
//     $(this).closest('tr').remove();
// });
// }

// function edititem()
// $('#tableId').on( 'click', '.btnEdit', function () {
//   tableId.row( this ).edit( {
//         buttons: [
//             { label: 'Cancel', fn: function () { this.close(); } },
//             'Edit'
//         ]
//     } );
// } );

// $(document).ready(function(){
//     $("#myInput").on("keyup", function() {
//       var value = $(this).val().toLowerCase();
//       $("#tableData tr").filter(function() {
//         $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
//       });
//     });
//   });


