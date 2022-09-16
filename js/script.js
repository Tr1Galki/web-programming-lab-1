let formValueX,
    formValueY,
    formValueR;


let inputFormX = document.querySelectorAll("input[name='x_param']");

for (let i = 0; i < inputFormX.length; i++) { //when page start, x is undefined
    inputFormX[i].addEventListener("change", (e) => {
        formValueX = e.target.value;
        console.log(formValueX);
    })
}

let inputFormY = document.querySelector("#y_input");

inputFormY.addEventListener("input", (e) => {
    formValueY = e.target.value;
    console.log(formValueY);
})

let inputFormR = document.querySelectorAll("input[name='r_param']");

for (let i = 0; i < inputFormR.length; i++) { //when page start, x is undefined
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
        console.log(formValueR);
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
        // Надо добавить обработку
        return null;
    }
}

function getY(currY) {
    if ((!currY || !(currY.trim())) && (currY !== 0)) {
        if (document.querySelector("#y_input")) {
            //обработать что пустое Y
            return null
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
                if (currY > 3) {
                    // обработка Y > 3
                    return null
                } else {
                    // обработка Y < -5
                    return null
                }
            }
        } else {
            if (document.querySelector("#y_input")) {
                // обработать нечисловое Y
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
            // Надо добавить обработку
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
                    // обработать отсутсвие выборов у чела
                    return null;
                }
            }
        } else {
            // хз когда такое возможно но стоит чекнуть
            return null;
        }
    }
}

function sendDataToServer(valX, valY, valR) {
    let params = "?x=" + valX + "&y=" + valY + "&r=" + valR + "&startTime=" + new Date().getTime() + '&timeZone=' + new Date().getTimezoneOffset();
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "../php/server.php" + params);
    xhr.onloadend = () => {
        requestToTable(xhr.status, xhr.responseText);
    }
    xhr.send();
}

function requestToTable(status, response) {
    if (!JSON.parse(response).correct) {
        //обработка
    } else {
        if (!document.querySelector(".table--main")) {
            if (!document.querySelector(".table__container")){
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
        new_row.insertCell(5).appendChild(document.createTextNode(JSON.parse(response).time));
    }
}