const colors = document.querySelectorAll("input[type=color]")
const colorBTN = document.querySelectorAll(".colorBTN")
const power = document.querySelector("#power")
const rowsNumbers = document.querySelector("#rowsNumbers")
const style = document.head.querySelector('style')
const sheet = style.sheet

let buttonIndex = null

function powerLights (event) {

    const { target: powerButton } = event

    if (powerButton.checked) {
        
    } else {

    }
}

function updateAnimation (light, index) {
    const duration = 1
    const delay = duration / 2
    const isReverse = index % 2 === 0 ? "on" : "on-reverse"
    const on = `
        @keyframes on {
            0% {
                filter: brightness(0.5);
                box-shadow: 0 0 0 0 ${light.style.backgroundColor};
            }
            50% {
                filter: brightness(1);
                box-shadow: 0 0 50px 50px ${light.style.backgroundColor};
            }
            100% {
                filter: brightness(0.5);
                box-shadow: 0 0 0 0 ${light.style.backgroundColor};
            }
        }`
    const animation = `
        .lightAnimate {
            animation: all ${duration}s ease infinite ${delay} ${isReverse};
        }
    `

    sheet.insertRule(animation)
    sheet.insertRule(on)
}

function updateColors (event) {
    const lights = document.querySelectorAll(".light")

    const { target: input } = event
    const { index } = input.dataset

    lights.forEach(light => {
        if (light.dataset.column === index) {
            light.style.backgroundColor = input.value
            colorBTN[buttonIndex].style.backgroundColor = input.value
            updateAnimation(light, index)
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
    } 
}

colors.forEach(color => color.addEventListener("change", updateColors))

colorBTN.forEach((btn, index) => btn.addEventListener('click', () => {
    colors[index].click()
    buttonIndex = index
}))

power.addEventListener("change", powerLights)

rowsNumbers.addEventListener("input", updateRowsNumbers)

;(() => {
    const initRows = 1
    updateRowsNumbers(null, initRows)
})()