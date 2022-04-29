const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//Show input error messages
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//show success colour
function showSucces(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

//check email is valid
function checkEmail(input) {
    const re = /^[a-zA-Z0-9._]{3,}@[a-zA-Z0-9]{3,15}[.][a-zA-Z]+[.]*[a-zA-Z]*$/;
    if(re.test(input.value.trim())) {
        showSucces(input);
        return true;
    }else {
        showError(input,'Email is not invalid');
        return false;
    }
}


//checkRequired fields
function checkRequired(inputArr) {
    let result = false;
    result = inputArr.every(function(input){
        if(input.value.trim() === ''){
            showError(input,`${getFieldName(input)} is required`);
            return false;
        }else {
            showSucces(input);
            return true;
        }
    });
    return result;
}


//check input Length
function checkLength(input, min ,max) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
        return false;
    }else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
        return false;
    }else {
        showSucces(input);
        return true;
    }
}

//get FieldName
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// check passwords match
function checkPasswordMatch(input1, input2) {
    if(input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
        return false;
    }
    else{
        return true;
    }
}


//Event Listeners
form.addEventListener('submit',function(e) {
    e.preventDefault();

    if(checkRequired([username, email, password, password2]) && checkLength(username,3,25) && checkLength(password,6,25) && checkEmail(email) || checkPasswordMatch(password, password2))
    {
        console.log("hello");
        window.location = "success.html"
    }
});