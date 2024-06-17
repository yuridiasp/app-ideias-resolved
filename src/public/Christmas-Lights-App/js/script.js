const colors = document.querySelectorAll("input[type=color]")
const colorBTN = document.querySelectorAll(".colorBTN")
const power = document.querySelector("#power")
const rowsNumbers = document.querySelector("#rowsNumbers")
const velocity = document.querySelector("#velocity")

let buttonIndex = null, onOFF = false

function powerLights () {
    const lights = document.querySelectorAll(".light")
    //duration | easing-function | delay | iteration-count | direction | fill-mode | play-state | name
    lights.forEach(light => {
        const { column } = light.dataset
        const duration = velocity.value
        const delay = duration / 2
        
        light.style.filter = `brightness(${power.checked ? "1" : "0.5"})`
        light.style.boxShadow = `0 0 ${power.checked ? "50px 10px" : "0 0" } ${colors[column].value}`
        light.style.animation = `${duration}s ease ${light.classList.contains("on-reverse") ? delay + "s" : ""} infinite onOff`
    })
}

function updateColors (event) {
    const lights = document.querySelectorAll(".light")
    lights.forEach(light => {
        if (light.dataset.column === event.target.dataset.index) {
            light.style.backgroundColor = event.target.value
            light.style.filter = `brightness(${power.checked ? "1" : "0.5"})`
            light.style.boxShadow = `0 0 ${power.checked ? "50px 10px" : "0 0" } ${event.target.value}`
            colorBTN[buttonIndex].style.backgroundColor = event.target.value
        }
    })
}

function updateRowsNumbers (event = null, cont= null) {
    const rows = event ? event.target.value : cont
    const content = document.querySelector(".content")
    const classesAnimation = ["on", "on-reverse"]

    content.innerHTML = ""

    const spansAttributes = Array.from(colors).map((color, index) => {
            
        return { column: index, color: color.value }
    })

    for (let c = 0; c < rows; c++) {
        
        const spans = spansAttributes.map(({ color, column}) => {
            const classe = classesAnimation[0]
            classesAnimation.reverse()
            return `<span data-column="${column}" class="light ${classe}" style="background-color: ${color}" ></span>`
        })

        const html = `
            <div class="row">
                ${spans.join("")}
            </div
        `

        content.innerHTML += html
        powerLights()
    } 
}

colors.forEach(color => color.addEventListener("change", updateColors))

colorBTN.forEach((btn, index) => btn.addEventListener('click', () => {
    colors[index].click()
    buttonIndex = index
}))

power.addEventListener("change", powerLights)

velocity.addEventListener("change", powerLights)

rowsNumbers.addEventListener("input", updateRowsNumbers)

;(() => {
    const initRows = 1
    updateRowsNumbers(null, initRows)
})()