const colors = document.querySelectorAll("input[type=color]")

function atualizarColors (event) {
    const lights = document.querySelectorAll(".light")

    const { target: input } = event
    const { index } = input.dataset

    lights.forEach(light => {
        if (light.dataset.column === index)
            light.style.background = input.value
    })
}

colors.forEach(color => color.addEventListener("change", atualizarColors))