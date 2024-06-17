const keys = document.querySelectorAll(".key")
const screen = document.querySelector(".screen")


let firstNumber = null, currentOperation = null

function getFractionDigitsLength() {
    const screenDecimals = screen.value.split(".")[1]
    const firstNumberDecimals = firstNumber.split(".")[1]
    let screenDecimalsLength = 0, firstNumberDecimalsLength = 0

    if (screenDecimals) {
        screenDecimalsLength = screenDecimals.length
    }

    if (firstNumberDecimals) {
        firstNumberDecimalsLength = firstNumberDecimals.length
    }

    return screenDecimalsLength >= firstNumberDecimalsLength ? screenDecimalsLength : firstNumberDecimalsLength
}

function showError (error = "ERR") {
    screen.value = error
}

function validateDecLength (number) {
    const limit = 3
    const { length } = number

    if (length > limit) {
        return false
    }

    return true

}

function validateIntLength (number) {
    const limit = 8
    const regex = /[0-9]/g
    const [ integerNumber, decimalPlaces ] = number.split(".")
    const { length } = integerNumber.match(regex).join("")

    if (length > limit) {
        return [ false, decimalPlaces ]
    }

    return [ true, decimalPlaces ]
}

function showResult(number) {
    const [ isValidInt ] = validateIntLength(number)
    
    if (isValidInt) {
        const fractionDigits = getFractionDigitsLength()

        screen.value = Number(number).toLocaleString('en-US', { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits })
    } else {
        showError()
    }
}

function setCurrentNumber(number) {
    const [ isValidInt, decimalPlaces ] = validateIntLength(number)
    
    if (isValidInt) {
        if (decimalPlaces) {
            const isValidDec = validateDecLength(decimalPlaces)
            
            if (!isValidDec) {
                return
            }
        }

        screen.value = number
    }

}

function setFirstNumber(number) {
    firstNumber = number
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
        showResult(sum.toString())
    }
}

function sub () {
    setCurrentOperation('-')
    if (!firstNumber) {
      setFirstNumber(screen.value)
      clear()
    } else {
        const subtraction = Number(firstNumber) - Number(screen.value)
        showResult(subtraction.toString())
    }
}

function div () {
    setCurrentOperation('/')
    if (!firstNumber) {
        setFirstNumber(screen.value)
        clear()
    } else {
        if (screen.value === "0") {
            showError("ERR: DIV / 0")
        } else {
            const division = Number(firstNumber) / Number(screen.value)
            showResult(division.toString())
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
        showResult(multiplication.toString())
    }
}

function insertKey(key) {
    if (screen.value !== "0" || (screen.value === "0" && key === ".")) {
        const newCurrentNumber = screen.value + key
        setCurrentNumber(newCurrentNumber)
    } else {
        setCurrentNumber(key)
    }
}

function clear() {
    setCurrentNumber("0")
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