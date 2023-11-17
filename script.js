class Calculator {
    constructor(previousoperantTextelement,currentoperantTextelement){
        this.previousoperantTextelement = previousoperantTextelement     // store value
        this.currentoperantTextelement =currentoperantTextelement
        this.clear()

    }
    clear(){
        this.currentOperand='';
        this.previousOperand='';     //open calculator is default
        this.operation=undefined;

    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
s

    }
    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand=this.currentOperand.toString() +number.toString()

    }
    chooseOperation(operation){
        if(this.currentOperand === '')return
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand =''

    }
    compute(){       
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+':
              computation = prev + current
              break
               case '- ':
                computation = prev - current
                break
                case '*':
                    computation = prev * current
                    break
                    case '÷':
                        computation = prev / current
                        break
                         
                        default:
                            return
        }
        this.currentOperand =computation
        this.operation = undefined
        this.previousOperand = ''


    }

    getDisplayNumber(number){
        const floatNumber = parseFloat(number)
        if(isNaN(floatNumber)) return ''
        return  floatNumber.toLocaleString('en')
    }
    updateDisplay() {
      this.currentoperantTextelement.innerText = this.getDisplayNumber(this.currentOperand)
      if(this.operation != null){
        this.previousoperantTextelement.innerText = `${ this.getDisplayNumber(this.previousOperand)} ${this.operation}`

      }
      else
      this.previousoperantTextelement.innerText = ''

    }

}



const numberButtons =document.querySelectorAll('[data-number]');
const operationButtons =document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const allclearButton = document.querySelector('[data-allclear]');
const previousoperantTextelement = document.querySelector('[data-previous-operand]');
const currentoperantTextelement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousoperantTextelement,currentoperantTextelement)

numberButtons.forEach(button => {
    button.addEventListener("click",() => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})


operationButtons.forEach(button => {
    button.addEventListener("click",() => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', button =>{
    calculator.compute()
    calculator.updateDisplay()
})
allclearButton.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()
})