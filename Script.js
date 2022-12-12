document.addEventListener("DOMContentLoaded", () => {
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
});
toastr.options = {
    positionClass: 'toast-top-center'
};

toastr.options.onHidden = function(){
    window.location.reload();
  }

$(function() {
    $("#stateList").change(function() {
        let stateId = $('#stateList').val();
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
    });
});

function GetRadioButtonSelection(){
    var reasons= document.getElementsByName("gender");
var answer;
for (var j = 0; j < reasons.length; j++) {
    if (reasons[j].checked) {
        answer = reasons[j].value;
        if(answer==='male')
           answer = 1;
        else
           answer = 2;   
    }
}
return answer;
}

function SubmitData() {
        let registerData = {};
        registerData.FirstName = document.getElementById('FirstName').value;
        registerData.LastName = $('#LastName').val();
        registerData.Mobile = document.getElementById('Mobile').value;
        registerData.Dob = document.getElementById('DateOfBirth').value;
        registerData.genderId = GetRadioButtonSelection();
        registerData.stateId = $('#stateList').val();
        registerData.cityId = $('#cityList').val();
        registerData.email = document.getElementById('email').value;
        registerData.Password = document.getElementById('Password').value;
        registerData.conformPassword = document.getElementById('conformPassword').value;

     $.ajax({
        url: 'https://localhost:44382/api/Register/CreateRegister',
        method: 'post',
        dataType: 'json',
        data: JSON.stringify(registerData),
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            toastr.success('Registered Successfully',{
                timeOut: 2000,
                positionClass: 'toast-top-center',
                // Redirect 
                onHidden: function() {
                    window.location.href = 'Login.html';
                }});
             window.location.href = 'Login.html';
        },
       fail : function( jqXHR, textStatus ) {
         alert( "Request failed: " + textStatus );
       }
    })
  
};

function onFormSubmit() {
    if (validateRegisterForm()) {
        SubmitData();
    }
    else 
    {
      toastr.error('Form is Filled with Invalid Data');
    }
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
        toastr.success('Logged in Successfully');
        if(data.data === true){
            window.location.href = 'Home.html';
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

function validateRegisterForm() {
    let isValid = true;
    if (document.getElementById("FirstName").value == "") {
        isValid = false;
        document.getElementById("FirstNameValidationError").classList.remove("hide");
    } 
    else {
        isValid = true;
        if (!document.getElementById("FirstNameValidationError").classList.contains("hide"))
            document.getElementById("FirstNameValidationError").classList.add("hide");
    }
   
    if (document.getElementById("LastName").value == "") {
        isValid = false;
        document.getElementById("LastNameValidationError").classList.remove("hide");
    } 
    else {
        isValid = true;
        if (!document.getElementById("LastNameValidationError").classList.contains("hide"))
            document.getElementById("LastNameValidationError").classList.add("hide");
    }
  
    if (document.getElementById("email").value == "") {
        isValid = false;
        document.getElementById("emailValidationError").classList.remove("hide");
    } 
    else {
        isValid = true;
        if (!document.getElementById("emailValidationError").classList.contains("hide"))
            document.getElementById("emailValidationError").classList.add("hide");
    }
    if (document.getElementById("Password").value == "") {
        isValid = false;
        document.getElementById("PasswordValidationError").classList.remove("hide");
    } 
    else {
        isValid = true;
        if (!document.getElementById("PasswordValidationError").classList.contains("hide"))
            document.getElementById("PasswordValidationError").classList.add("hide");
    }
    if (document.getElementById("Mobile").value == "") {
        isValid = false;
        document.getElementById("MobileValidationError").classList.remove("hide");
    } 
    else {
        isValid = true;
        if (!document.getElementById("MobileValidationError").classList.contains("hide"))
            document.getElementById("MobileValidationError").classList.add("hide");
    }
    if (document.getElementById("DateOfBirth").value == "") {
        isValid = false;
        document.getElementById("DateOfBirthValidationError").classList.remove("hide");
    } 
    else {
        isValid = true;
        if (!document.getElementById("DateOfBirthValidationError").classList.contains("hide"))
            document.getElementById("DateOfBirthValidationError").classList.add("hide");
    }
    if(document.querySelectorAll('input[type="radio"][name="gender"]:checked').length < 1)
    {
        isValid = false;
        document.getElementById("GenderValidationError").classList.remove("hide");
    } 
    else {
        isValid = true;
        if (!document.getElementById("GenderValidationError").classList.contains("hide"))
            document.getElementById("GenderValidationError").classList.add("hide");
    }
    if(document.getElementById("conformPassword").value !== document.getElementById("Password").value)
    {
        isValid = false;
        document.getElementById("ConfirmPasswordValidationError").classList.remove("hide");
    } 
    else {
        isValid = true;
        if (!document.getElementById("ConfirmPasswordValidationError").classList.contains("hide"))
            document.getElementById("ConfirmPasswordValidationError").classList.add("hide");
    }
    if(document.getElementById("stateList").value==='0')
    {
        isValid = false;
        document.getElementById("StateValidationError").classList.remove("hide");
    } 
    else {
        isValid = true;
        if (!document.getElementById("StateValidationError").classList.contains("hide"))
            document.getElementById("StateValidationError").classList.add("hide");
    }
    if(document.getElementById("cityList").value==='0')
    {
        isValid = false;
        document.getElementById("CityValidationError").classList.remove("hide");
    } 
    else {
        isValid = true;
        if (!document.getElementById("CityValidationError").classList.contains("hide"))
            document.getElementById("CityValidationError").classList.add("hide");
    }
    return isValid;
    
}

function validateLoginForm() {
    let isValid = true;

    if (document.getElementById("email").value == "") {
        isValid = false;
        document.getElementById("emailValidationError").classList.remove("hide");
    } 
    else {
        isValid = true;
        if (!document.getElementById("emailValidationError").classList.contains("hide"))
            document.getElementById("emailValidationError").classList.add("hide");
    }
    if (document.getElementById("Password").value == "") {
        isValid = false;
        document.getElementById("PasswordValidationError").classList.remove("hide");
    } 
    else {
        isValid = true;
        if (!document.getElementById("PasswordValidationError").classList.contains("hide"))
            document.getElementById("PasswordValidationError").classList.add("hide");
    }

    return isValid;
    
}