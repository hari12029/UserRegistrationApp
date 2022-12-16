window.addEventListener("DOMContentLoaded", () => {
        $.ajax({
            url: 'https://localhost:44382/api/Register/GetAllRegister',
            method: 'get',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                localStorage.setItem("gender",gender);

            }
                
        })
    });