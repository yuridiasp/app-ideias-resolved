const binary = document.querySelector("#binary")
const decimal = document.querySelector("#decimal")
const changeBtn = document.querySelector("#changeBtn")
const title = document.querySelector("#title")
const inputsDiv = document.querySelector("#inputs")

const inputs = [[binary, "column"], [decimal, "column-reverse"]]
const titles = ["Binary To Decimal", "Decimal To Binary"]
const limit = 8
const deleteCount = 1

function changeConvertion() {

    inputs.forEach(input => {
        input[0].value = ""
    })

    titles.reverse()
    title.innerHTML = titles[0]

    inputs.reverse()
    inputsDiv.style.flexDirection = inputs[0][1]
    inputs[0][0].disabled = false
    inputs[1][0].disabled = true
}

function binaryToDecimal (bin) {
    const algarisms = bin.split("")
    const base = 2

    algarisms.reverse()

    const result = algarisms.reduce((prev, cur, index) => prev + (cur * Math.pow(base, index)), 0)

    return result
}

function decimalToBinary (dec) {

    const arrayResultado = []
    const base = 2
    let result = dec

    while (result > 0) {
        const rest = result % base
        arrayResultado.push(rest)
        result = Math.floor(result / base)
    }
    
    arrayResultado.reverse()

    return arrayResultado.join("")
}

binary.addEventListener("input", () => {

    const regex = /[2-9A-Za-z\/\*\-\+\.\[\]´`~{}\|;,?/°ºª!@#$%¨&\(\)='"\\çÇ]/g

    if (binary.value.match(regex))
        alert("For conversion from binary to decimals, only 0 or 1 can be entered")

    binary.value = binary.value.replaceAll(regex, "")

    if (binary.value.length >= limit) {
        binary.value = binary.value.slice(0, 8)
        alert("Limited to 8 bits")
    }

    if (binary.value.length) {
        decimal.value = binaryToDecimal(binary.value)
    } else {
        decimal.value = ""
    }

})

decimal.addEventListener("input", () => {

    if (decimal.value.length > limit) {
        decimal.value = decimal.value.slice(0, 8)
        alert("Limited to 8 charaters")
    }

    if (decimal.value.length) {
        binary.value = decimalToBinary(decimal.value)
    } else {
        binary.value = ""
    }
})

changeBtn.addEventListener("click", () => {
    changeBtn.classList.contains("red")

    const isRed = changeBtn.classList.contains("red")

    if (isRed) {
        changeBtn.classList.remove("red")
        changeBtn.classList.add("teal", "lighten-2")
    } else {
        changeBtn.classList.remove("teal", "lighten-2")
        changeBtn.classList.add("red")
    }

    const icon = changeBtn.querySelector("span")

    if(icon.classList.contains("rotate")) {
        icon.classList.remove("rotate")
        void icon.offsetWidth;
    }

    icon.classList.toggle("rotate")

    changeConvertion()
})