export const handleEq = (expression: string): string => {
  const operationOrder: string[] = ['²', '√', '()'];
  while (expression.match(/[+\-*/]/)) {
    operationOrder.forEach((operation) => {
      expression = executeOperation(expression, operation);
    });
    expression = handleOperations(expression, ['*', '/']);
    expression = handleOperations(expression, ['+', '-']);
  }
  return expression;
};

const executeOperation = (expression: string, operation: string): string => {
  const operationHandlers: Record<string, (expression: string) => string> = {
    '²': handleSq,
    '√': handleSqr,
    '()': handleParentheses,
  };
  return operationHandlers[operation](expression);
};

export const handleSq = (expression: string): string => {
expression = String(expression);
const squareRegex = /(-?\d+(\.\d+)?)\s*²/;
while (expression.match(squareRegex)) {
  expression = expression.replace(squareRegex, (match, value) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) return (numValue * numValue).toString();
    return match;
  });
}
return expression;
};

export const handleSqr = (expression: string): string => {
  expression = String(expression);
  const sqrtRegex = /√(-?\d+(\.\d+)?)/;
  while (expression.match(sqrtRegex)) {
    expression = expression.replace(sqrtRegex, (match, value) => {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        if (numValue < 0) return 'Error';
        return Math.sqrt(numValue).toString();
      }
      return match;
    });
  }
  return expression;
};

export const handleParentheses = (expression: string): string => {
  expression = String(expression);
  while (expression.includes('(')) {
    const startIndex = expression.lastIndexOf('(');
    const endIndex = expression.indexOf(')', startIndex);
    if (endIndex === -1) return 'Error';
    const subExpression = expression.slice(startIndex + 1, endIndex);
    const subResult = handleEq(subExpression);
    expression = expression.slice(0, startIndex) + subResult + expression.slice(endIndex + 1);
  }
  return expression;
};

export const handleOperations = (expression: string, operators: string[]): string => {
  operators.forEach((operator) => {
    const operatorRegExp = new RegExp(`(-?\\d*\\.?\\d+)\\s*\\${operator}(-?\\d*\\.?\\d+)`, 'g');
    expression = expression.replace(operatorRegExp, (match, left, right) => {
      const result = calculate(left, right, operator);
      return result;
    });
  });
  return expression;
};

export const calculate = (left: string, right: string, operator: string): string => {
  const leftValue = parseFloat(left);
  const rightValue = parseFloat(right);
  if (isNaN(leftValue) || isNaN(rightValue)) {
    return 'Error';
  }
  switch (operator) {
    case '+': return String(leftValue + rightValue);
      break;
    case '-': return String(leftValue - rightValue);
      break;
    case '*': return String(leftValue * rightValue);
      break;
    case '/': return (rightValue === 0) ? 'Error' : (leftValue === 0) ? 'Infinity' : String(leftValue / rightValue);
      break;
    default: return 'Error';
  }
};
