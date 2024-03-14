export const calculation = (num1: string, num2: string, operation: string) => {
  let result: number;
  const number1 = parseInt(num1);
  const number2 = parseInt(num2);

  switch (operation) {
    case '+':
      result = number1 + number2;
      break;
    case '-':
      result = number1 - number2;
      break;
    case '*':
      result = number1 * number2;
      break;
    case '/':
      if (number2 === 0) {
        throw new Error("Division by zero is not allowed");
      }
      result = number1 / number2;
      break;
    default:
      console.log(num1, num2, operation);
      throw new Error("Invalid operation");
  }

  return result;
}