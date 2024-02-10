const display1El = document.querySelector(".display-1");
const display2El = document.querySelector(".display-2");
const tempResultEl = document.querySelector(".temp-result");
const numbersEl = document.querySelectorAll(".number");
const operationEl = document.querySelectorAll(".operation");
const equalEl = document.querySelector(".equal");
const clearAllEl = document.querySelector(".all-clear");
const clearLastEl = document.querySelector(".last-entity-clear");
let dis1Num = ""; // Contains first number that the user input
let dis2Num = ""; // Contains second number that the user input
let result = null;
let lastOperation = "";
let haveDot = false; // Contains true or false value when the number is in decimal format or not

// Adding event listener to each number present (It's an array)
numbersEl.forEach((number) => {
    number.addEventListener("click", (e) => {
        // Check if exists a dot on the screen, if already exist, doesn't allow to put another one
        if (e.target.innerText == "." && !haveDot) {
            haveDot = true;
        // Check whether the number contains two decimals
        } else if (e.target.innerText === "." && haveDot) {
            return;
        }
        // Display any number the user type in the application on the screen
        dis2Num += e.target.innerText;
        display2El.innerText = dis2Num;
    });
});

operationEl.forEach((operation) => {
    operation.addEventListener("click", (e) => {
        // If the second number doesn't exists, do nothing
        if (!dis2Num) return;
        haveDot = false;
        // Store the operation button the user have clicked
        const operationName = e.target.innerText;
        if (dis1Num && dis1Num && lastOperation) {
            mathOperation();
        } else {
            result = parseFloat(dis2Num);
        }
        // Set variables to empty and shows up the last operation in the top screen
        clearVar(operationName);
        lastOperation = operationName;
    })
});

// Clear the first screen, where shows all the previous operations
function clearVar(name = "") {
    dis1Num += dis2Num + " " + name + " ";
    display1El.innerText = dis1Num;
    display2El.innerText = "";
    dis2Num = "";
    tempResultEl.innerText = result;
}

// Make math operations
function mathOperation() {
    if (lastOperation === 'x') {
        result = parseFloat(result) * parseFloat(dis2Num);
    } else if (lastOperation === "+") {
        result = parseFloat(result) + parseFloat(dis2Num);
    } else if (lastOperation === "-") {
        result = parseFloat(result) - parseFloat(dis2Num);
    } else if (lastOperation === "/") {
        result = parseFloat(result) / parseFloat(dis2Num);
    } else if (lastOperation === "%") {
        result = parseFloat(result) % parseFloat(dis2Num)
    }
}

equalEl.addEventListener("click", () => {
    if (!dis2Num || !dis1Num) return;
    haveDot = false;
    mathOperation();
    clearVar();
    display2El.innerText = result;
    tempResultEl.innerText = "";
    dis2Num = result;
    dis1Num = "";
});

clearAllEl.addEventListener("click", () => {
    dis1Num = "";
    dis2Num = "";
    display1El.innerText = "";
    display2El.innerText = "";
    result = "";
    tempResultEl.innerText = "";
});

// Delete last element enetered
clearLastEl.addEventListener("click", () => {
    display2El.innerText = "";
    dis2Num = "";
});

// Read events from the keyboard, to make operations without the mouse
window.addEventListener("keydown", (e) => {
    if(
        e.key === '0' ||
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9" ||
        e.key === "."
    ) {
        clickButtonEl(e.key);
    } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key == "%") {
        clickOperation(e.key);
    } else if (e.key === "*") {
        clickOperation("x");
    } else if (e.key === "Enter" || e.key == "=") {
        clickEqual();
    }
});

function clickButtonEl(key) {
    numbersEl.forEach((button) => {
        if (button.innerText === key) {
            // Equivalent to number.clickEventListener
            button.click();
        }
    })
}

function clickOperation(key) {
    operationEl.forEach((operation) => {
        if (operation.innerText === key) {
            // Equivalent to operation.clickEventListener
            operation.click();
        }
    })
}

function clickEqual() {
    equalEl.click();
}