const keys = document.querySelectorAll(".key")
const screen = document.querySelector(".screen")

let firstNumber = null, currentOperation = null

function setFirstNumber(number) {
    firstNumber = number
}

function setCurrentNumber(number) {
    screen.value = number
}

function resetPrimaryValue() {
    firstNumber = null
}

function resetCurrentOperation() {
    currentOperation = null
}

function deleteNumber () {
    const result = screen.value.slice(0, -1)
    if (result.length) {
      setCurrentNumber(result)
    } else {
      setCurrentNumber(0)
    }
}

function add () {
    setCurrentOperation('+')
    if (!firstNumber) {
      setFirstNumber(screen.value)
      clear()
    } else {
        const sum = Number(firstNumber) + Number(screen.value)
        console.log(sum);
        setCurrentNumber(sum)
    }
}

function sub () {
    setCurrentOperation('-')
    if (!firstNumber) {
      setFirstNumber(screen.value)
      clear()
    } else {
        const subtraction = Number(firstNumber) - Number(screen.value)

        setCurrentNumber(subtraction)
    }
}

function div () {
    setCurrentOperation('/')
    if (!firstNumber) {
        setFirstNumber(screen.value)
        clear()
    } else {
        if (screen.value === "0") {
            setCurrentNumber("ERROR: DIV / 0")
        } else {
            const division = Number(firstNumber) / Number(screen.value)

            setCurrentNumber(division)
        }
    }
}

function mult () {
    setCurrentOperation('*')
    if (!firstNumber) {
        setFirstNumber(screen.value)
        clear()
    } else {
        const multiplication = Number(firstNumber) * Number(screen.value)

        setCurrentNumber(multiplication)
    }
}

function insertKey(key) {
    if (screen.value !== "0" || (screen.value === "0" && key === ".")) {
        screen.value += key
    } else {
        setCurrentNumber(key)
    }
}

function clear() {
    setCurrentNumber(0)
}

function clearAll() {
    resetCurrentOperation()
    resetPrimaryValue()
    clear()
}

function insertDot() {
    const regex = /\./g

    const hasDot = regex.test(screen.value)

    if (!hasDot) {
        insertKey(".")
    }
}

function inverter() {
    const regex = /-/g

    const isNegative = regex.test(screen.value)

    if (!isNegative && screen.value !== "0") {
        setCurrentNumber("-" + screen.value)
    } else {
        setCurrentNumber(screen.value.replace("-", ""))
    }
}

function resolveExpression() {
    const opeations = {
        '+': () => add(),
        '-': () => sub(),
        '*': () => mult(),
        '/': () => div()
      }
  
      if (currentOperation) {
        opeations[currentOperation]()
        setFirstNumber(null)
      }
}

function setCurrentOperation(opeation) {
    currentOperation = opeation
}

function isNumber(value) {
    return !isNaN(value) && value.trim() !== '';
}

keys.forEach(key => {
    key.addEventListener("click", event => {
        const { innerText: keyPressed } = event.target

        if (isNumber(keyPressed)) {
            insertKey(keyPressed)
        } else {
            const functions = {
                "=": () => resolveExpression(),
                ".": () => insertDot(),
                "C": () => clearAll(),
                "CE": () => clear(),
                "+/-": () => inverter(),
                "+": () => add(),
                "-": () => sub(),
                "*": () => mult(),
                "/": () => div(),
                "backspace": () => deleteNumber()
            }

            functions[keyPressed]()
        }
    })
})