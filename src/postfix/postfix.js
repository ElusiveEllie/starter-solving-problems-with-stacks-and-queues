const Stack = require("../lib/stack");

const postfix = (expression) => {
  const stack = new Stack();
  const result = [];
  const operators = ["+", "-", "*", "/"];
  const highPrecedence = ["*", "/"];
  const lowPrecedence = ["+", "-"];
  let spacelessExpression = expression.replaceAll(" ", "");
  for (let char of spacelessExpression) {
    if (char === "(") {
      stack.push(char);
    } else if (char === ")") {
      while (stack.top && stack.top.value != "(") {
        result.push(stack.pop());
      }
      if (stack.top) {
        stack.pop();
      }
    } else if (operators.includes(char)) {
      if (!stack.top || stack.top.value === "(" || (highPrecedence.includes(char) && lowPrecedence.includes(stack.top.value))) {
        stack.push(char);
      } else {
        while (stack.top && stack.top.value !== "(" && (highPrecedence.includes(stack.top.value) || lowPrecedence.includes(char))) {
          result.push(stack.pop());
        }
        stack.push(char);
      }
    } else {
      result.push(char);
    }
  }
  while (stack.top) {
    if (stack.top.value === "(") stack.pop();
    result.push(stack.pop());
  }
  return result.join(" ");
};

module.exports = postfix;
