formNumber = document.querySelector("#phone_number")

num1 = document.querySelector("#num1");
num1.addEventListener('click', function (e) {
    formNumber.value += '1';
})

num2 = document.querySelector("#num2");
num2.addEventListener('click', function (e) {
    formNumber.value += '2';
})

num3 = document.querySelector("#num3");
num3.addEventListener('click', function (e) {
    formNumber.value += '3';
})

num4 = document.querySelector("#num4");
num4.addEventListener('click', function (e) {
    formNumber.value += '4';
})

num5 = document.querySelector("#num5");
num5.addEventListener('click', function (e) {
    formNumber.value += '5';
})

num6 = document.querySelector("#num6");
num6.addEventListener('click', function (e) {
    formNumber.value += '6';
})
num7 = document.querySelector("#num7");
num7.addEventListener('click', function (e) {
    formNumber.value += '7';
})

num8 = document.querySelector("#num8");
num8.addEventListener('click', function (e) {
    formNumber.value += '8';
})

num9 = document.querySelector("#num9");
num9.addEventListener('click', function (e) {
    formNumber.value += '9';
})

num0 = document.querySelector("#num0");
num0.addEventListener('click', function (e) {
    formNumber.value += '0';
})

numDel = document.querySelector("#numDel");
numDel.addEventListener('click', function (e) {
    formNumber.value = formNumber.value.substring(0, formNumber.value.length - 1);
})

numPlus = document.querySelector("#numPlus");
numPlus.addEventListener('click', function (e) {
    let str = formNumber.value;
    let flag = true;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '+') {
            flag = false;
        }
    }
    if (flag) {
        formNumber.value = "+" + formNumber.value;
    }
})



formSMS = document.querySelector("#sms_code_form")

num1_1 = document.querySelector("#num1_1");
num1_1.addEventListener('click', function (e) {
    formSMS.value += '1';
})

num2_1 = document.querySelector("#num2_1");
num2_1.addEventListener('click', function (e) {
    formSMS.value += '2';
})

num3_1 = document.querySelector("#num3_1");
num3_1.addEventListener('click', function (e) {
    formSMS.value += '3';
})

num4_1 = document.querySelector("#num4_1");
num4_1.addEventListener('click', function (e) {
    formSMS.value += '4';
})

num5_1 = document.querySelector("#num5_1");
num5_1.addEventListener('click', function (e) {
    formSMS.value += '5';
})

num6_1 = document.querySelector("#num6_1");
num6.addEventListener('click', function (e) {
    formSMS.value += '6';
})
num7_1 = document.querySelector("#num7_1");
num7_1.addEventListener('click', function (e) {
    formSMS.value += '7';
})

num8_1 = document.querySelector("#num8_1");
num8_1.addEventListener('click', function (e) {
    formSMS.value += '8';
})

num9_1 = document.querySelector("#num9_1");
num9_1.addEventListener('click', function (e) {
    formSMS.value += '9';
})

num0_1 = document.querySelector("#num0_1");
num0_1.addEventListener('click', function (e) {
    formSMS.value += '0';
})

numDel_1 = document.querySelector("#numDel_1");
numDel_1.addEventListener('click', function (e) {
    formSMS.value = formSMS.value.substring(0, formSMS.value.length - 1);
})