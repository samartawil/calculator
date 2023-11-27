import React, { useState } from 'react';
import './Calculator.css';
import NumberComponent from './NumberComponent';
import ActionComponent from './ActionComponent';
import KeyComponent from './KeyComponent';

function Calculator() {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const Key1 = ['CE','DEL','(',')']
  const Key2 = ['%','+/-','x²','√']
  const Numbers0 = [0];
  const Numbers1 = [1,2,3];
  const Numbers4 = [4,5,6];
  const Numbers7 = [7,8,9];
  const Action1 = ['/'];
  const Action2 = ['*'];
  const Action3 = ['-'];
  const Action4 = ['+'];

  return (
    <div className="calculator border-black"> 
      <div className="disp border-black border-radius-8 font-family">
        <span style={{ color: 'grey' }}>{displayValue}</span>
      </div>

      <div className="key1">
        {Key1.map((string, index) => (
          <KeyComponent key={index} act={string} />
        ))}
      </div>

      <div className="key2">
        {Key2.map((string, index) => (
          <KeyComponent key={index} act={string} />
        ))}
      </div>

      <div className="keypad">
        <div className="keypad-row">
          {Numbers7.map((number, index) => (
            <NumberComponent key={index} number={number} />
          ))}
          {Action4.map((string, index) => (
            <ActionComponent key={index} act={string} />
          ))}
        </div>

        <div className="keypad-row">
          {Numbers4.map((number, index) => (
            <NumberComponent key={index} number={number} />
          ))}
          
          {Action3.map((string, index) => (
            <ActionComponent key={index} act={string} />
          ))}
        </div>

        <div className="keypad-row">
          {Numbers1.map((number, index) => (
            <NumberComponent key={index} number={number} />
          ))}

          {Action2.map((string, index) => (
            <ActionComponent key={index} act={string} />
          ))}
        </div>

        <div className="keypad-row">
          {Numbers0.map((number, index) => (
            <NumberComponent key={index} number={number} />
          ))}

          <button className="eq border-black border-radius-8 color-white font-size font-family">=</button>

          {Action1.map((string, index) => (
            <ActionComponent key={index} act={string}/>
          ))}

        </div>
      </div>

    </div>
  );
}

export default Calculator;

