const rangeLeft = document.querySelector("#r1")
const rangeTop = document.querySelector("#r2")
const rangeBottom = document.querySelector("#r3")
const rangeRight = document.querySelector("#r4")
const content = document.querySelector("#content")
const result = document.querySelector("#result")
const copyBTN = document.querySelector("#copyBTN")

const state = {
    left: {
        x: 50,
        y: 50
    },
    right: {
        x: 50,
        y: 50
    },
    top: {
        x: 50,
        y: 50
    },
    bottom: {
        x: 50,
        y: 50
    },
}

function copyText() {
  
    // Select the text field
    result.select();
    result.setSelectionRange(0, 99999); // For mobile devices
  
     // Copy the text inside the text field
    navigator.clipboard.writeText(result.value);
  
    // Alert the copied text
    alert("Copied the text: " + result.value);
}

function getTuple(value) {
    const valueMax = 100
    const abs = Math.abs(value-valueMax)
    return [value, abs]
}

function setState() {
    const expression = `${state.top.x}% ${state.top.y}% ${state.bottom.y}% ${state.bottom.x}% / ${state.left.y}% ${state.right.y}% ${state.right.x}% ${state.left.x}%`

    content.style.borderRadius = expression
    result.value = expression
}

rangeLeft.addEventListener("input", () => {
    //Sobe => Aumenta
    const [x, y] = getTuple(rangeLeft.value)

    state.left.x = x
    state.left.y = y
    setState()
})

rangeTop.addEventListener("input", () => {
    //Direita => Aumenta
    const [x, y] = getTuple(rangeTop.value)

    state.top.x = x
    state.top.y = y
    setState()
})

rangeBottom.addEventListener("input", () => {
    //Direita => Aumenta
    const [x, y] = getTuple(rangeBottom.value)

    state.bottom.x = x
    state.bottom.y = y
    setState()
})

rangeRight.addEventListener("input", () => {
    //Sobe => Aumenta
    const [x, y] = getTuple(rangeRight.value)

    state.right.x = x
    state.right.y = y
    setState()
})

copyBTN.addEventListener("click", copyText);

(() => setState())();