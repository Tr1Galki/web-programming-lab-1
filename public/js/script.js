let formValueX,
    formValueY,
    formValueR;


let inputFormX = document.querySelectorAll("input[name='x_param']");

for (let i = 0; i < inputFormX.length; i++) { //when page start, x is undefined
    inputFormX[i].addEventListener("change", (e) => {
        formValueX = e.target.value;
        let elem = document.querySelector("#empty_X");
        elem.style.display = "none";
    })
}

let inputFormY = document.querySelector("#y_input");

inputFormY.addEventListener("input", (e) => {
    formValueY = e.target.value;
    let elemEmpty = document.querySelector("#empty_Y");
    let elemNum = document.querySelector("#not_number_Y");
    let elemRange = document.querySelector("#Y_is_out_of_range");
    if ((!formValueY || !(formValueY.trim())) && (formValueY !== 0)) {
        elemEmpty.style.display = "block";
        elemNum.style.display = "none";
        elemRange.style.display = "none";
    } else {
        elemEmpty.style.display = "none";
        if (/^-?\d*(\.?\d+)?$/.test(formValueY)) {
            let currY = parseFloat(formValueY)
            if (currY > -5 && currY < 3) {
                elemNum.style.display = "none";
                elemRange.style.display = "none";
            } else {
                elemNum.style.display = "none";
                elemRange.style.display = "block";
            }
        } else {
            elemNum.style.display = "block";
            elemRange.style.display = "none";
        }
    }
})

let inputFormR = document.querySelectorAll("input[name='r_param']");

for (let i = 0; i < inputFormR.length; i++) {
    inputFormR[i].addEventListener("change", (e) => {
        let x = e.target.value
        if (!formValueR) {
            formValueR = [];
        }
        if (e.target.checked) {
            if (!formValueR.includes(x)) {
                formValueR.push(x)
            }
        } else {
            let index = formValueR.indexOf(x);
            if (index !== -1) {
                formValueR.splice(index, 1);
            }
        }
        let elem = document.querySelector("#empty_R");
        if (formValueR.length === 0) {
            elem.style.display = "block";
        } else {
            elem.style.display = "none";
        }
    })
}

let submit = document.querySelector("#submit_button");

submit.addEventListener("click", facade);

function facade(e) {
    e.preventDefault()
    let newValueX = getX(formValueX);
    let newValueY = getY(formValueY);
    let newValueR = getR(formValueR);

    if (newValueX && (newValueY || newValueY === 0) && newValueR) {
        for (let i = 0; i < newValueR.length; i++) {
            sendDataToServer(newValueX, newValueY, newValueR[i]);
        }
    }
}

function getX(currX) {
    if ([-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2].includes(parseFloat(currX))) {
        return currX;
    }
    let currFormX = document.querySelectorAll("input[name='x_param']");
    if (currFormX.length !== 9) {
        location.reload();
    } else {
        userError("empty_X");
        return null;
    }
}

function getY(currY) {
    if ((!currY || !(currY.trim())) && (currY !== 0)) {
        if (document.querySelector("#y_input")) {
            userError("empty_Y");
            return null;
        } else {
            location.reload();
        }
    } else {
        currY = currY.trim().replaceAll(",", ".")
        if (/^-?\d*(\.?\d+)?$/.test(currY)) {
            currY = parseFloat(currY)
            if (currY > -5 && currY < 3) {
                return currY
            } else {
                userError("Y_is_out_of_range");
                return null;
            }
        } else {
            if (document.querySelector("#y_input")) {
                userError("not_number_Y");
                return null;
            } else {
                location.reload();
            }
        }
    }
}

function getR(currR) {
    if (!currR) {
        let currFormR = document.querySelectorAll("input[name='r_param']");
        if (currFormR.length !== 5) {
            location.reload();
        } else {
            userError("empty_R");
            return null;
        }
    } else {
        if (Array.isArray(currR)) {
            let isCorrect = true;
            for (let i = 0; i < currR.length; i++) {
                if (![1, 1.5, 2, 2.5, 3].includes(parseFloat(currR[i]))) {
                    isCorrect = false;
                }
            }
            if (isCorrect) {
                return currR;
            } else {
                let currFormR = document.querySelectorAll("input[name='r_param']:checked");
                if (currFormR.length !== 0) {
                    currR = [];
                    for (let i = 0; i < currFormR.length; i++) {
                        currR.push(i.value);
                    }
                    return currR;
                } else {
                    userError("empty_R");
                    return null;
                }
            }
        } else {
            return null;
        }
    }
}

function sendDataToServer(valX, valY, valR) {
    let params = "?x=" + valX + "&y=" + valY + "&r=" + valR + "&startTime=" + new Date().getTime() + '&timeZone=' + new Date().getTimezoneOffset();
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://se.ifmo.ru/~s335066/server.php" + params);
    xhr.onloadend = () => {
        requestToTable(xhr.status, xhr.responseText);
    }
    xhr.send();
}

function requestToTable(status, response) {
    if (!response) {
        return
    }
    if (!JSON.parse(response).correct) {
        //обработка
    } else {
        if (!document.querySelector(".table--main")) {
            if (!document.querySelector(".table__container")) {
                let divTable = document.createElement("div");
                divTable.classList.add("table__container")
                document.body.appendChild(divTable);
            }
            let divTable = document.querySelector(".table__container");
            let table = document.createElement("table");
            table.classList.add("table--main");
            divTable.appendChild(table);
            let new_row = table.insertRow(0);
            new_row.insertCell(0).appendChild(document.createTextNode('Is in area?'));
            new_row.insertCell(1).appendChild(document.createTextNode('X value'));
            new_row.insertCell(2).appendChild(document.createTextNode('Y value'));
            new_row.insertCell(3).appendChild(document.createTextNode('R value'));
            new_row.insertCell(4).appendChild(document.createTextNode('Date'));
            new_row.insertCell(5).appendChild(document.createTextNode('Script\'s time'));
        }
        let table = document.querySelector(".table--main")
        let new_row = table.insertRow(1)
        new_row.insertCell(0).appendChild(document.createTextNode(JSON.parse(response).isIn));
        new_row.insertCell(1).appendChild(document.createTextNode(JSON.parse(response).x));
        new_row.insertCell(2).appendChild(document.createTextNode(JSON.parse(response).y));
        new_row.insertCell(3).appendChild(document.createTextNode(JSON.parse(response).r));
        new_row.insertCell(4).appendChild(document.createTextNode(JSON.parse(response).date));
        new_row.insertCell(5).appendChild(document.createTextNode(Math.abs(JSON.parse(response).time)));
    }
}

function userError(id) {
    let elem = document.querySelector("#" + id);
    elem.style.display = "block";
    setTimeout(() => {
        elem.style.display = "none";
    }, 5000)
}