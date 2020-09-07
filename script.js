const screen = document.querySelector('h1')
const inputBtns = document.querySelectorAll('button')

const calculate = {
  '/': (a, b) => a / b,
  '*': (a, b) => a * b,
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '=': (a, b) => b
}

let firstValue = 0
let operatorValue = ''
let awaitingNextValue = false

const display = number => {
  // replace current display value if first value is entered
  if (awaitingNextValue) {
    screen.textContent = number
    awaitingNextValue = false
  } else {
    screen.textContent =
      screen.textContent === '0' ? number : screen.textContent + number
  }
}

const addDecimal = () => {
  if (awaitingNextValue) return
  if (!screen.textContent.includes('.')) {
    screen.textContent = `${screen.textContent}.`
  }
}

const useOperator = operator => {
  const currentValue = +screen.textContent

  if (operator && awaitingNextValue) {
    operatorValue = operator
    return
  }

  if (!firstValue) {
    firstValue = currentValue
  } else {
    const result = calculate[operatorValue](+firstValue, +currentValue)
    firstValue = result
    screen.textContent = result
  }

  awaitingNextValue = true

  operatorValue = operator
}

const reset = () => {
  firstValue = 0
  operatorValue = ''
  awaitingNextValue = false
  screen.textContent = '0'
}

inputBtns.forEach(inputBtn => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener('click', () => display(inputBtn.value))
  } else if (inputBtn.classList.contains('operator')) {
    inputBtn.addEventListener('click', () => useOperator(inputBtn.value))
  } else if (inputBtn.classList.contains('decimal')) {
    inputBtn.addEventListener('click', addDecimal)
  } else if (inputBtn.classList.contains('clear')) {
    inputBtn.addEventListener('click', reset)
  }
})
