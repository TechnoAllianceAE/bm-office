
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { RefreshCw, ArrowDownUp } from 'lucide-react';

// Mock exchange rates for demo (using Euro as base)
const mockExchangeRates = {
  USD: 1.09,   // 1 EUR = 1.09 USD
  EUR: 1.00,   // 1 EUR = 1.00 EUR
  GBP: 0.85,   // 1 EUR = 0.85 GBP
  JPY: 158.2,  // 1 EUR = 158.2 JPY
  CAD: 1.46,   // 1 EUR = 1.46 CAD
  AUD: 1.64,   // 1 EUR = 1.64 AUD
  CHF: 0.96,   // 1 EUR = 0.96 CHF
  CNY: 7.76,   // 1 EUR = 7.76 CNY
  INR: 90.4,   // 1 EUR = 90.4 INR
  BRL: 5.36,   // 1 EUR = 5.36 BRL
  ZAR: 19.7,   // 1 EUR = 19.7 ZAR
  SGD: 1.46,   // 1 EUR = 1.46 SGD
  HKD: 8.49,   // 1 EUR = 8.49 HKD
  SEK: 11.16,  // 1 EUR = 11.16 SEK
  NOK: 11.44,  // 1 EUR = 11.44 NOK
  DKK: 7.45,   // 1 EUR = 7.45 DKK
  PLN: 4.31,   // 1 EUR = 4.31 PLN
  MXN: 18.3,   // 1 EUR = 18.3 MXN
  KRW: 1456,   // 1 EUR = 1456 KRW
};

// Currency information
const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr' },
  { code: 'PLN', name: 'Polish Złoty', symbol: 'zł' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
];

export const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<string>('1');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [result, setResult] = useState<string>('');
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  
  const convertCurrency = () => {
    try {
      // Get rates for both currencies relative to EUR (our base)
      const fromRate = mockExchangeRates[fromCurrency as keyof typeof mockExchangeRates];
      const toRate = mockExchangeRates[toCurrency as keyof typeof mockExchangeRates];
      
      // Calculate the direct exchange rate between the two currencies
      const rate = toRate / fromRate;
      setExchangeRate(rate);
      
      // Calculate the result
      const calculatedResult = parseFloat(amount) * rate;
      
      // Format the result
      setResult(calculatedResult.toFixed(4));
      
      // Set last updated time
      const now = new Date();
      setLastUpdated(now.toLocaleTimeString());
    } catch (error) {
      setResult('Error');
    }
  };
  
  // Swap currencies
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };
  
  // Convert automatically when currencies or amount changes
  useEffect(() => {
    if (amount && fromCurrency && toCurrency) {
      convertCurrency();
    }
  }, [amount, fromCurrency, toCurrency]);
  
  const fromCurrencyInfo = currencies.find(c => c.code === fromCurrency);
  const toCurrencyInfo = currencies.find(c => c.code === toCurrency);
  
  return (
    <div className="max-w-md mx-auto">
      <Card className="glassmorphic-card">
        <div className="p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Amount</h3>
              <span className="text-sm text-muted-foreground">
                1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
              </span>
            </div>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="glassmorphic-input text-lg"
              min="0"
            />
          </div>
          
          <div className="grid grid-cols-5 gap-4 mb-6">
            <div className="col-span-2">
              <h3 className="text-sm font-medium mb-2">From</h3>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="glassmorphic-input">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center">
                        <span className="mr-2">{currency.symbol}</span>
                        {currency.code} - {currency.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={swapCurrencies}
                className="h-8 w-8 rounded-full bg-white/30 hover:bg-white/40"
              >
                <ArrowDownUp className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="col-span-2">
              <h3 className="text-sm font-medium mb-2">To</h3>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="glassmorphic-input">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center">
                        <span className="mr-2">{currency.symbol}</span>
                        {currency.code} - {currency.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-muted-foreground">Converted Amount</span>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={convertCurrency}
                className="h-7 w-7"
              >
                <RefreshCw className="h-3 w-3" />
              </Button>
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold mb-1">
                {toCurrencyInfo?.symbol} {result}
              </div>
              <div className="text-sm text-muted-foreground">
                {amount} {fromCurrency} = {result} {toCurrency}
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>Last updated: {lastUpdated || 'Just now'}</span>
            <span>Mid-market exchange rate</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
