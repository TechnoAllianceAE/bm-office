
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/common/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const CalculatorTool: React.FC = () => {
  const [input, setInput] = useState<string>('0');
  const [result, setResult] = useState<string>('');
  const [memory, setMemory] = useState<number>(0);
  const [formula, setFormula] = useState<string>('');
  const [calculationType, setCalculationType] = useState<string>('standard');
  
  const clearInput = () => {
    setInput('0');
    setFormula('');
  };
  
  const handleNumberClick = (num: string) => {
    if (input === '0' || input === 'Error') {
      setInput(num);
    } else {
      setInput(input + num);
    }
  };
  
  const handleDecimalClick = () => {
    if (!input.includes('.')) {
      setInput(input + '.');
    }
  };
  
  const handleOperatorClick = (operator: string) => {
    try {
      if (input === 'Error') return;
      
      // If we already have a result, use it as the first operand
      if (result && !formula) {
        setFormula(`${result} ${operator} `);
        setInput('0');
        return;
      }
      
      const lastChar = formula[formula.length - 1];
      
      // If the last character is an operator, replace it
      if (['+', '-', '×', '÷'].includes(lastChar)) {
        setFormula(formula.slice(0, -2) + `${operator} `);
        return;
      }
      
      // Otherwise, append the current input and the operator
      setFormula(formula + input + ` ${operator} `);
      setInput('0');
    } catch (error) {
      setInput('Error');
    }
  };
  
  const calculateResult = () => {
    try {
      if (input === 'Error') return;
      
      const expression = formula + input;
      
      // Replace operators with JavaScript operators
      const calculableExpression = expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/');
      
      // Evaluate the expression
      // eslint-disable-next-line no-eval
      const calculatedResult = eval(calculableExpression);
      
      // Format the result
      const formattedResult = Number.isInteger(calculatedResult)
        ? calculatedResult.toString()
        : calculatedResult.toFixed(8).replace(/\.?0+$/, '');
      
      setResult(formattedResult);
      setInput(formattedResult);
      setFormula('');
    } catch (error) {
      setInput('Error');
    }
  };
  
  const handleMemoryAdd = () => {
    try {
      setMemory(memory + parseFloat(input));
    } catch (error) {
      // Handle error
    }
  };
  
  const handleMemorySubtract = () => {
    try {
      setMemory(memory - parseFloat(input));
    } catch (error) {
      // Handle error
    }
  };
  
  const handleMemoryRecall = () => {
    setInput(memory.toString());
  };
  
  const handleMemoryClear = () => {
    setMemory(0);
  };
  
  const handlePercentage = () => {
    try {
      const value = parseFloat(input) / 100;
      setInput(value.toString());
    } catch (error) {
      setInput('Error');
    }
  };
  
  const handleSquareRoot = () => {
    try {
      const value = Math.sqrt(parseFloat(input));
      setInput(value.toString());
    } catch (error) {
      setInput('Error');
    }
  };
  
  const handleSquare = () => {
    try {
      const value = Math.pow(parseFloat(input), 2);
      setInput(value.toString());
    } catch (error) {
      setInput('Error');
    }
  };
  
  const handleSin = () => {
    try {
      const value = Math.sin(parseFloat(input) * (Math.PI / 180)); // Convert to radians
      setInput(value.toFixed(8).replace(/\.?0+$/, ''));
    } catch (error) {
      setInput('Error');
    }
  };
  
  const handleCos = () => {
    try {
      const value = Math.cos(parseFloat(input) * (Math.PI / 180)); // Convert to radians
      setInput(value.toFixed(8).replace(/\.?0+$/, ''));
    } catch (error) {
      setInput('Error');
    }
  };
  
  const handleTan = () => {
    try {
      const value = Math.tan(parseFloat(input) * (Math.PI / 180)); // Convert to radians
      setInput(value.toFixed(8).replace(/\.?0+$/, ''));
    } catch (error) {
      setInput('Error');
    }
  };
  
  const handleLog = () => {
    try {
      const value = Math.log10(parseFloat(input));
      setInput(value.toFixed(8).replace(/\.?0+$/, ''));
    } catch (error) {
      setInput('Error');
    }
  };
  
  const handleLn = () => {
    try {
      const value = Math.log(parseFloat(input));
      setInput(value.toFixed(8).replace(/\.?0+$/, ''));
    } catch (error) {
      setInput('Error');
    }
  };
  
  const handlePi = () => {
    setInput(Math.PI.toString());
  };
  
  const handleE = () => {
    setInput(Math.E.toString());
  };
  
  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handleNumberClick(e.key);
      } else if (e.key === '.') {
        handleDecimalClick();
      } else if (e.key === '+') {
        handleOperatorClick('+');
      } else if (e.key === '-') {
        handleOperatorClick('-');
      } else if (e.key === '*') {
        handleOperatorClick('×');
      } else if (e.key === '/') {
        handleOperatorClick('÷');
      } else if (e.key === 'Enter' || e.key === '=') {
        calculateResult();
      } else if (e.key === 'Escape') {
        clearInput();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input, formula]);
  
  return (
    <div className="max-w-md mx-auto">
      <Tabs 
        defaultValue="standard" 
        onValueChange={setCalculationType}
        className="w-full"
      >
        <TabsList className="w-full mb-4">
          <TabsTrigger value="standard">Standard</TabsTrigger>
          <TabsTrigger value="scientific">Scientific</TabsTrigger>
        </TabsList>
        
        <Card className="glassmorphic-card overflow-hidden">
          <div className="p-4 border-b border-white/20 bg-white/10">
            <div className="text-right">
              <div className="text-sm text-muted-foreground h-6 overflow-hidden">
                {formula}
              </div>
              <div className="text-3xl font-medium h-10 overflow-hidden">
                {input}
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <TabsContent value="standard" className="mt-0">
              <div className="grid grid-cols-4 gap-2">
                {/* Memory functions */}
                <Button variant="outline" size="sm" onClick={handleMemoryClear}>MC</Button>
                <Button variant="outline" size="sm" onClick={handleMemoryRecall}>MR</Button>
                <Button variant="outline" size="sm" onClick={handleMemoryAdd}>M+</Button>
                <Button variant="outline" size="sm" onClick={handleMemorySubtract}>M-</Button>
                
                {/* Special functions */}
                <Button variant="outline" size="sm" onClick={clearInput}>C</Button>
                <Button variant="outline" size="sm" onClick={() => setInput(input.slice(0, -1) || '0')}>⌫</Button>
                <Button variant="outline" size="sm" onClick={handlePercentage}>%</Button>
                <Button variant="outline" size="sm" onClick={() => handleOperatorClick('÷')}>÷</Button>
                
                {/* Numbers and operations */}
                <Button variant="secondary" size="sm" onClick={() => handleNumberClick('7')}>7</Button>
                <Button variant="secondary" size="sm" onClick={() => handleNumberClick('8')}>8</Button>
                <Button variant="secondary" size="sm" onClick={() => handleNumberClick('9')}>9</Button>
                <Button variant="outline" size="sm" onClick={() => handleOperatorClick('×')}>×</Button>
                
                <Button variant="secondary" size="sm" onClick={() => handleNumberClick('4')}>4</Button>
                <Button variant="secondary" size="sm" onClick={() => handleNumberClick('5')}>5</Button>
                <Button variant="secondary" size="sm" onClick={() => handleNumberClick('6')}>6</Button>
                <Button variant="outline" size="sm" onClick={() => handleOperatorClick('-')}>-</Button>
                
                <Button variant="secondary" size="sm" onClick={() => handleNumberClick('1')}>1</Button>
                <Button variant="secondary" size="sm" onClick={() => handleNumberClick('2')}>2</Button>
                <Button variant="secondary" size="sm" onClick={() => handleNumberClick('3')}>3</Button>
                <Button variant="outline" size="sm" onClick={() => handleOperatorClick('+')}>+</Button>
                
                <Button variant="secondary" size="sm" onClick={() => handleNumberClick('0')} className="col-span-2">0</Button>
                <Button variant="secondary" size="sm" onClick={handleDecimalClick}>.</Button>
                <Button variant="default" size="sm" onClick={calculateResult}>=</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="scientific" className="mt-0">
              <div className="grid grid-cols-5 gap-2">
                {/* Scientific functions */}
                <Button variant="outline" size="sm" onClick={handlePi}>π</Button>
                <Button variant="outline" size="sm" onClick={handleE}>e</Button>
                <Button variant="outline" size="sm" onClick={handleSquareRoot}>√</Button>
                <Button variant="outline" size="sm" onClick={handleSquare}>x²</Button>
                <Button variant="outline" size="sm" onClick={clearInput}>C</Button>
                
                <Button variant="outline" size="sm" onClick={handleSin}>sin</Button>
                <Button variant="outline" size="sm" onClick={handleCos}>cos</Button>
                <Button variant="outline" size="sm" onClick={handleTan}>tan</Button>
                <Button variant="outline" size="sm" onClick={handleLog}>log</Button>
                <Button variant="outline" size="sm" onClick={() => setInput(input.slice(0, -1) || '0')}>⌫</Button>
                
                <Button variant="outline" size="sm" onClick={handleLn}>ln</Button>
                <Button variant="outline" size="sm" onClick={handlePercentage}>%</Button>
                <Button variant="outline" size="sm" onClick={handleMemoryAdd}>M+</Button>
                <Button variant="outline" size="sm" onClick={handleMemorySubtract}>M-</Button>
                <Button variant="outline" size="sm" onClick={() => handleOperatorClick('÷')}>÷</Button>
                
                {/* Numbers and operations */}
                <Button variant="secondary" size="sm" onClick={() => handleNumberClick('7')}>7</Button>
                <Button variant="secondary" size="sm" onClick={() => handleNumberClick('8')}>8</Button>
                <Button variant="secondary" size="sm" onClick={() => handleNumberClick('9')}>9</Button>
                <Button variant="outline" size="sm" onClick={handleMemoryRecall}>MR</Button>
                <Button variant="outline" size="sm" onClick={() => handleOperatorClick('×')}>×</Button>
                
                <Button variant="secondary" size="sm" onClick={() => handleNumberClick('4')}>4</Button>
                <Button variant="secondary" size="sm" onClick={() => handleNumberClick('5')}>5</Button>
                <Button variant="secondary" size="sm" onClick={() => handleNumberClick('6')}>6</Button>
                <Button variant="outline" size="sm" onClick={handleMemoryClear}>MC</Button>
                <Button variant="outline" size="sm" onClick={() => handleOperatorClick('-')}>-</Button>
                
                <Button variant="secondary" size="sm" onClick={() => handleNumberClick('1')}>1</Button>
                <Button variant="secondary" size="sm" onClick={() => handleNumberClick('2')}>2</Button>
                <Button variant="secondary" size="sm" onClick={() => handleNumberClick('3')}>3</Button>
                <Button variant="outline" size="sm" onClick={() => handleNumberClick('0')} className="row-span-2">0</Button>
                <Button variant="outline" size="sm" onClick={() => handleOperatorClick('+')}>+</Button>
                
                <Button variant="secondary" size="sm" onClick={() => handleNumberClick('0')}>0</Button>
                <Button variant="secondary" size="sm" onClick={() => handleNumberClick('00')}>00</Button>
                <Button variant="secondary" size="sm" onClick={handleDecimalClick}>.</Button>
                <Button variant="default" size="sm" onClick={calculateResult}>=</Button>
              </div>
            </TabsContent>
          </div>
        </Card>
      </Tabs>
    </div>
  );
};
