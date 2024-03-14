import './style.css';

import { resetFunction } from './features/resetFunction.ts';
import { calculation } from './features/calculation.ts';

document.addEventListener('DOMContentLoaded', () => {
  const result: HTMLElement | null = document.querySelector('.calculator-display__result');
  const previousResult: HTMLElement | null = document.querySelector('.calculator-display__previous-result');
  const resetBtn: HTMLElement | null = document.querySelector('.calculator-btns__resume-reset');
  const resultBtn: HTMLElement | null = document.querySelector('.calculator-btns__resume-result');
  const numbers: NodeListOf<HTMLElement> = document.querySelectorAll('.calculator-btns__btn-number');
  const operators: NodeListOf<HTMLElement> = document.querySelectorAll('.calculator-btns__btn-operator');

  let previousOperations: string | null = null;
  let previousNumber: string | null = null;
  let currentNumber: string | null = null;
  let currentOperator: string | null = null;
  let calculationResult: number | null = 0;

  const resetOperations = () => {
    currentNumber = null;
    currentOperator = null;
    previousNumber = null;
    calculationResult = null;
    previousOperations = null;
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      resetFunction(result, previousResult);
      resetOperations();
    })
  } else {
    console.log('element was not found');
  }


  if (resultBtn) {
    resultBtn.addEventListener('click', () => {
      if (currentNumber && previousNumber && currentOperator) {
        calculationResult = calculation(currentNumber, previousNumber, currentOperator);

        if (result) result.textContent = calculationResult.toString();
        if (previousResult) previousResult.textContent = '0';

        resetOperations();
      }
    })
  }

  if (numbers) {
    numbers.forEach(number => {
      number.addEventListener('click', (element) => {
        const calcNumber = (element.target as HTMLButtonElement).value;

        if (calculationResult) {
          resetFunction(result, previousResult);
          resetOperations();
        }

        if (currentNumber !== null) {
          currentNumber = currentNumber += calcNumber;
        } else {
          currentNumber = calcNumber
        }

        if (result) {
          result.textContent = currentNumber;
        }
      })
    })
  } else {
    console.log('element was not found');
  }

  if (operators) {
    operators.forEach(operator => {
      operator.addEventListener('click', (element) => {
        const enteredOperator = (element.target as HTMLButtonElement).value;

        if (calculationResult) {
          resetFunction(result, previousResult);
          resetOperations();
        }

        if (!previousOperations && !previousNumber) {
          currentOperator = enteredOperator;
          previousNumber = currentNumber;
          previousOperations = `${previousNumber} ${currentOperator}`;

          if (previousResult) previousResult.textContent = previousOperations;

        } else if (previousOperations && previousNumber && currentNumber && currentOperator) {
          previousNumber = calculation(previousNumber, currentNumber, currentOperator).toString();
          currentOperator = enteredOperator;
          previousOperations = `${previousNumber} ${currentOperator}`;

          if (previousResult) previousResult.textContent = previousOperations;
        }

        if (result) result.textContent = '0';
        currentNumber = null;
      })
    })
  }

  if (currentNumber !== null && result) {
    result.textContent = currentNumber;
  }

  if (previousResult) {
    previousOperations ? previousResult.textContent = previousOperations : '0';
  }
})