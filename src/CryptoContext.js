import React from 'react'
import { useContext ,useState,useEffect} from 'react'
import { createContext } from 'react'
const Crypto=createContext()

const CryptoContext = (props) => {
    const [currency, setCurrency] = useState("INR")
    const [symbol, setSymbol] = useState("Rs")
    useEffect(()=>{
        if(currency==="INR")setSymbol("₹")
        else if(currency==="USD")setSymbol("$")
    },[currency])
    const {children}=props
  return (
    <Crypto.Provider value={{currency,symbol,setCurrency}}>
    {children}
    </Crypto.Provider>
  )
}

export default CryptoContext;
export const CryptoState=()=>{
    return useContext(Crypto)
}

// import React, { useState, useEffect, useContext, createContext } from 'react';

// const currencies = [
//   { code: 'INR', symbol: '₹' },
//   { code: 'USD', symbol: '$' },
//   { code: 'EUR', symbol: '€' },
//   { code: 'GBP', symbol: '£' },
//   { code: 'CAD', symbol: 'CA$' },
//   { code: 'AUD', symbol: 'A$' },
//   { code: 'JPY', symbol: '¥' },
//   { code: 'CNY', symbol: '¥' },
//   { code: 'RUB', symbol: '₽' },
//   { code: 'BRL', symbol: 'R$' },
//   // Add more currencies here
//   { code: 'KRW', symbol: '₩' },
//   { code: 'CHF', symbol: 'CHF' },
//   { code: 'SEK', symbol: 'kr' },
//   { code: 'NOK', symbol: 'kr' },
//   { code: 'SGD', symbol: 'S$' },
// ];

// const Crypto = createContext();

// const CryptoContext = (props) => {
//   const [currency, setCurrency] = useState('INR');
//   const [symbol, setSymbol] = useState('₹');

//   useEffect(() => {
//     const selectedCurrency = currencies.find((c) => c.code === currency);
//     if (selectedCurrency) {
//       setSymbol(selectedCurrency.symbol);
//     }
//   }, [currency]);

//   const { children } = props;

//   const handleCurrencyChange = (newCurrency) => {
//     setCurrency(newCurrency);
//   };

//   return (
//     <Crypto.Provider value={{ currency, symbol, setCurrency, handleCurrencyChange }}>
//       {children}
//     </Crypto.Provider>
//   );
// };

// export default CryptoContext;

// export const CryptoState = () => {
//   return useContext(Crypto);
// };
