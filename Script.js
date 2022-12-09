var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        let formData = readFormData();
        if (selectedRow == null)
          insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
        // if((document.forms.g[0].checked==false)  && ( document.form.g[1].checked==false))
        // {
        //     alert("please select your gender");
        //     return false;
        // }
    }
}

function readFormData() {
    let formData = {};
    formData["FirstName"] = document.getElementById("FirstName").value;
    formData["LastName"] = document.getElementById("LastName").value;
    formData["email"] = document.getElementById("email").value;
    formData["Password"] = document.getElementById("Password").value;
    formData["Mobile"] = document.getElementById("Mobile").value;
    formData["DateOfBirth"] = document.getElementById("DateOfBirth").value;
    formData["gender"]=document.querySelector('input[name="gender"]:checked').value;

    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("RegisterList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.FirstName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.LastName;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.email;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.Password;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.Mobile;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = data.DateOfBirth;
    cell7 = newRow.insertCell(6);
    cell7.innerHTML = data.gender;
    cell8 = newRow.insertCell(7);
    cell8.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("FirstName").value = "";
    document.getElementById("LastName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("Password").value = "";
    document.getElementById("Mobile").value = "";
    document.getElementById("DateOfBirth").value = "";
    document.getElementsByName("gender").value = "";
    
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("FirstName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("LastName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("email").value = selectedRow.cells[2].innerHTML;
    document.getElementById("Password").value = selectedRow.cells[3].innerHTML;
    document.getElementById("Mobile").value = selectedRow.cells[3].innerHTML;
    document.getElementById("DateOfBirth").value = selectedRow.cells[3].innerHTML;
    document.getElementsByName("gender").value = selectedRow.cells[4].innerHTML;
    document.getElementById("btnSubmit").value = 'Update';
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.FirstName;
    selectedRow.cells[1].innerHTML = formData.LastName;
    selectedRow.cells[2].innerHTML = formData.email;
    selectedRow.cells[3].innerHTML = formData.Password;
    selectedRow.cells[4].innerHTML = formData.Mobile;
    selectedRow.cells[4].innerHTML = formData.DateOfBirth;
    selectedRow.cells[4].innerHTML = formData.gender;
    document.getElementById("btnSubmit").value = 'Submit';

}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("RegisterList").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
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
    // if (document.getElementById("city").value == "") {
    //     isValid = false;
    //     document.getElementById("cityValidationError").classList.remove("hide");
    // } 
    // else {
    //     isValid = true;
    //     if (!document.getElementById("cityValidationError").classList.contains("hide"))
    //         document.getElementById("cityValidationError").classList.add("hide");
    // }

    return isValid;
    
}