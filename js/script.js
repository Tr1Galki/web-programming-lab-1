let submit_param = document.getElementById("submit_button");

submit_param.addEventListener("click", function (e) {
    e.preventDefault()
    let x_param_value = getX();
    let y_param_value = getY();
    let r_param_value = getR();
    // if ((y_param_value !== false) && (r_param_value !== false)){
    //     alert("gg")
    // }
    let xhr = new XMLHttpRequest();
    xhr.open("get", "../php/server.php?x=" + x_param_value + "&y=" + y_param_value + "&r=" + r_param_value[0]
    + "&startTime=" + new Date().getTime() + '&timeZone=' + new Date().getTimezoneOffset())
    xhr.onloadend = () => {
        showRequest(xhr.status, xhr.responseText)
    }
    xhr.send()
})

function showRequest(status, text){
    // result_table.createElement("tr")
    // alert(JSON.parse(text).date)
    alert(text)
    let table = document.querySelector(".table--main")
    let new_row = table.insertRow(-1)
    let answer_cell = new_row.insertCell(0);
    answer_cell.appendChild(document.createTextNode(JSON.parse(text).answer));
    let x_cell = new_row.insertCell(1);
    x_cell.appendChild(document.createTextNode(JSON.parse(text).x));
    let y_cell = new_row.insertCell(2);
    y_cell.appendChild(document.createTextNode(JSON.parse(text).y));
    let r_cell = new_row.insertCell(3);
    r_cell.appendChild(document.createTextNode(JSON.parse(text).r));
    let date_cell = new_row.insertCell(4);
    date_cell.appendChild(document.createTextNode(JSON.parse(text).date));
    let time_cell = new_row.insertCell(5);
    time_cell.appendChild(document.createTextNode(JSON.parse(text).time));

}

function getX() {
    return document.querySelector("input[name='x_param']:checked").value
}

function getY() {
    let y_value = document.getElementById("y_input").value.trim().replaceAll(",", ".");
    const Y_MIN = -5
    const Y_MAX = 3
    if (y_value.length === 0) {
        alert("Field Y can't be empty'")
        return false
    } else if (/^-?\d*(\.?\d+)?$/.test(y_value)) {
        y_value = parseFloat(y_value)
        if (y_value <= Y_MIN || y_value >= Y_MAX) {
            alert("Y is out of range")
            return false
        } else {
            return y_value
        }
    } else {
        alert("Please write a number")
        return false
    }
}

function getR() {
    let z_boxes = document.querySelectorAll("input[name='z_param']:checked");
    if (z_boxes.length === 0) {
        alert("choose Z")
        return false
    }
    let z_value = null;
    for (let i = 0; i < z_boxes.length; i++) {
        z_value = (z_boxes[i].value)
    }
    return z_value
}