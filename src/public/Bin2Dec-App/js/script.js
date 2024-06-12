const binary = document.querySelector("#binary")
const decimal = document.querySelector("#decimal")
const changeBtn = document.querySelector("#changeBtn")
const title = document.querySelector("#title")
const inputsDiv = document.querySelector("#inputs")

const inputs = [[binary, "column"], [decimal, "column-reverse"]]
const titles = ["Binary To Decimal", "Decimal To Binary"]

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
    const algarisms = String(bin).split("")
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

binary.addEventListener("input", event => {
    const { target } = event

    target.value = target.value.replaceAll(/[2-9\+\-\.]/g, "")

    if (binary.value.length) {
        decimal.value = binaryToDecimal(target.value)
    } else {
        decimal.value = ""
    }

})

decimal.addEventListener("input", event => {
    const { target } = event

    if (decimal.value.length) {
        binary.value = decimalToBinary(target.value)
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