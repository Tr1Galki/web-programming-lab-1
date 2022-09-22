import {initializeApp} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import {
    getAuth,
    RecaptchaVerifier,
    signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBXdfmRUM56vir3pD9VQLYvIR36OKukyMI",
    authDomain: "web-programming-itmo.firebaseapp.com",
    projectId: "web-programming-itmo",
    storageBucket: "web-programming-itmo.appspot.com",
    messagingSenderId: "74373191250",
    appId: "1:74373191250:web:144194481dd7352015718b",
    measurementId: "G-XJ4R16YM2F"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';

window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
    'size': 'invisible',
    'callback': (response) => {
    }
}, auth);

const phoneButton = document.querySelector("#sign_in_button");
phoneButton.addEventListener("click", handlingPhoneNumber);

const SMSButton = document.querySelector("#confirm_code");
SMSButton.addEventListener("click", handlingSMSNumber);


function handlingPhoneNumber() {
    let phoneNumber = document.querySelector("#phone_number").value;


    if (phoneNumber[0] !== "+") {
        userError("first_plus")
        return;
    }

    let appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier).then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
    }).catch((error) => {
        userError("incorrect");
    });
}

function handlingSMSNumber() {
    let code = document.querySelector("#sms_code_form").value;
    confirmationResult.confirm(code).then((result) => {
        const user = result.user;
        window.location.replace("./html/main.html");
    }).catch((error) => {
        userError("invalid_sms_code");
    });
}

function userError(id) {
    let elem = document.querySelector("#" + id);
    elem.style.display = "block";
    setTimeout(() => {
        elem.style.display = "none";
    }, 5000)
}