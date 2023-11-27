import React, { useState } from 'react';
import './Calculator.css';
import Button from './Button';

function Calculator() {
  const [displayValue] = useState<string>('0');
  const buttons = [
    [{ content:'CE', type: 'operation' }, { content:'DEL', type: 'operation' }, { content:'(', type: 'operation'  }, { content:')', type: 'operation' }],
    [{ content:'%', type: 'operation'  }, { content:'+/-', type: 'operation' }, { content:'x²', type: 'operation' }, { content:'√', type: 'operation' }],
    [{ content:7, type: 'number' }, { content:8, type: 'number' }, { content:9, type: 'number' }, { content:'+', type: 'action' }],
    [{ content:4, type: 'number' }, { content:5, type: 'number' }, { content:6, type: 'number' }, { content:'-', type: 'action' }],
    [{ content:1, type: 'number' }, { content:2, type: 'number' }, { content:3, type: 'number' }, { content:'*', type: 'action' }],
    [{ content:0, type: 'number' }, { content:'=', type: 'equal'}, { content:'/', type: 'action'}]
  ];

  return (
    <div className="calculator border-black">
      <div className="disp border-black border-radius-8 font-family">
        <span style={{ color: 'grey' }}>{displayValue}</span>
      </div>

      <div className='keypad'>
        {buttons.map((row, rowIndex) => (
          <div key={rowIndex} className='keypad-row'>
            {row.map((btn, btnIndex) => (
              <Button key={btnIndex} content={btn.content.toString()} type={btn.type} />
            ))}
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default Calculator;
