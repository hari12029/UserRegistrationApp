toastr.options = {
    positionClass: 'toast-top-center'
}

function LoginSubmit() {
    if (validateLoginForm()) {
    let userName = $('#email').val();
    let password = $('#Password').val();
     $.ajax({
        url: 'https://localhost:44382/api/Register/Login?userName='+userName+'&password='+password,
        method: 'get',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
        if(data.data === true){
            toastr.success('Logged in Successfully');
            window.location.href = 'users.html';
        }
        else{
            toastr.error('Please Login with correct credentials');
        }
        },
       fail : function( jqXHR, textStatus ) {
         alert( "Request failed: " + textStatus );
       }
    })
}
else{
    toastr.error('Please Enter Correct Credentials');

}
};

function validateLoginForm() {
    let isValid = true;

    if (document.getElementById("email").value == "") {
        isValid = false;
        document.getElementById("emailValidationError").classList.remove("hide");
    } 
    else {
        if (!document.getElementById("emailValidationError").classList.contains("hide"))
            document.getElementById("emailValidationError").classList.add("hide");
    }
    if (document.getElementById("Password").value == "") {
        isValid = false;
        document.getElementById("PasswordValidationError").classList.remove("hide");
    } 
    else {
        if (!document.getElementById("PasswordValidationError").classList.contains("hide"))
            document.getElementById("PasswordValidationError").classList.add("hide");
    }

    return isValid;
    
}