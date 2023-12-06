import React, { useState, useEffect } from 'react';
import '../assets/style/Calculator.css';
import Button from './Button';
import { handleEq } from '../utils/calculationsHelper';

const Calculator: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [clipboardMessage, setClipboardMessage] = useState<string | null>(null);

  useEffect(() => updateDisplay(result !== '' ? result : input || '0'), [input, result]);

  const updateDisplay = (currentValue: string): void => {
    if (currentValue === 'Error') {
      setDisplayValue('<span style="color: red;">Error</span>');
    } else {
      setDisplayValue(currentValue);
    }
  };

  const handleCalculatorButtonClick = (value: string): void => {
    if(Object.keys(actions).includes(value)) actions[value]()
    else setInput((prevInput) => prevInput + value);
  };

  const handleSign = (): void => {
    if (input === '') {
      setInput('-');
    } else if (
      isOperator(input[input.length - 1]) ||
      input[input.length - 1] === '('
    ) {
      setInput((prevInput) => prevInput + '-');
    } else {
      let match = input.match(/(-?\d*\.?\d+)$/);
      if (match) {
        let number = match[1];
        if (number.charAt(0) === '-') {
          setInput((prevInput) =>
            prevInput.slice(0, -number.length) + number.slice(1)
          );
        } else {
          setInput(
            (prevInput) =>
              prevInput.slice(0, -number.length) + '-' + number
          );
        }
      }
    }
  };
  
  const isOperator = (char: string): boolean => {
    return char === '+' || char === '-' || char === '*' || char === '/';
  };  

  const handleDel = (): void => {
    if (input === 'Error' || input === 'NaN' || input === 'Infinity') {
      clear();
    } else if (input.endsWith('/100')) {
      setInput((prevInput) => prevInput.slice(0, -4));
    } else if (input !== '') {
      setInput((prevInput) => prevInput.slice(0, -1));
    }
  };
  
  const clear = (): void => {
    setInput('');
    setResult('');
  };

  const actions: {[action:string]:()=>void} = {
    '=': () => {
      if (input !== '') {
        const expression = handleEq(input);
        setResult(expression);
        setInput('');
      }
    },
    'CE': clear,
    'DEL': handleDel,
    '%': () => setInput((prevInput) => prevInput + '/100'),
    'x²': () => setInput((prevInput) => prevInput + '²'),
    '+/-': handleSign,
    
  };

  const buttons = [
    [{ content: 'CE', type: 'operation' }, { content: 'DEL', type: 'operation' }, { content: '(', type: 'operation' }, { content: ')', type: 'operation' }],
    [{ content: '%', type: 'operation' }, { content: '+/-', type: 'operation' }, { content: 'x²', type: 'operation' }, { content: '√', type: 'operation' }],
    [{ content:7, type: 'number' }, { content:8, type: 'number' }, { content:9, type: 'number' }, { content: '+', type: 'action' }],
    [{ content:4, type: 'number' }, { content:5, type: 'number' }, { content:6, type: 'number' }, { content: '-', type: 'action' }],
    [{ content:1, type: 'number' }, { content:2, type: 'number' }, { content:3, type: 'number' }, { content: '*', type: 'action' }],
    [{ content:0, type: 'number' }, { content: '=', type: 'equal' }, { content: '/', type: 'action' }]
  ];
  
  const handleDisplayClick = (): void => {
    navigator.clipboard.writeText(displayValue).then(() => {
      setClipboardMessage(`Value "${displayValue}" copied to clipboard!`);
      setTimeout(() => setClipboardMessage(null), 2000);
    });
  };

  return (
    <div className="calculator border-black">
      <div className="disp-container">
        <div
          className="disp border-black border-radius-8 font-family"
          style={{ cursor: 'pointer' }}
          onClick={handleDisplayClick}
        >
          <span style={{ color: 'grey' }} dangerouslySetInnerHTML={{ __html: displayValue }} />
        </div>
        {clipboardMessage && (
          <div className="clipboard-message">{clipboardMessage}</div>
        )}
      </div>

      <div className='keypad'>
        {buttons.map((row, rowIndex) => (
          <div key={rowIndex} className='keypad-row'>
            {row.map((btn, btnIndex) => (
              <Button key={btnIndex} content={btn.content.toString()} type={btn.type} onClick={() => handleCalculatorButtonClick(btn.content.toString())} />
            ))}
          </div>
        ))}
      </div>

    </div>
  );
}

export default Calculator;
