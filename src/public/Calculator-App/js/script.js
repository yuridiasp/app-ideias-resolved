const keys = document.querySelectorAll(".key")
const screen = document.querySelector(".screen")

let primaryValue = null, operation = null

function resetPrimaryValue() {
    primaryValue = null
}

function add (x, y) {
    return x + y
}

function sub (x, y) {
    return x - y
}

function div (x, y) {
    if (y == 0)
        return "ERROR: DIV / 0"
    return x / y
}

function mult (x, y) {
    return x * y
}

function inserKey(key) {
    if (screen.value !== "0" || (screen.value === "0" && key === ".")) {
        screen.value += key
    } else {
        screen.value = key
    }
}

function clear() {
    screen.value = 0
}

function clearAll() {
    resetPrimaryValue()
    clear()
}

function resolveExpression() {
    if (operation) {
        const x = Number(primaryValue)
        const y = Number(screen.value)
        screen.value = operation(x, y)
    }
}

function insertDot() {
    const regex = /\./g

    const hasDot = regex.test(screen.value)

    if (!hasDot) {
        inserKey(".")
    }
}

function inverter() {
    const regex = /-/g

    const isNegative = regex.test(screen.value)

    if (!isNegative && screen.value !== "0") {
        screen.value = "-" + screen.value
    } else {
        screen.value = screen.value.replace("-", "")
    }
}

keys.forEach(key => {
    key.addEventListener("click", event => {
        const { innerText: keyPressed } = event.target

        const functions = {
            "+": add,
            "-": sub,
            "/": div,
            "*": mult,
            "=": resolveExpression,
            ".": insertDot,
            "C": clearAll,
            "CE": clear,
            "+/-": inverter
        }

        operation = functions[keyPressed]
        
        if (!operation) {
            inserKey(keyPressed)
        } else {
            operation()
        }
    })
})