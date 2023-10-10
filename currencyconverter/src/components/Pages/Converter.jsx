import React, { useState, useEffect } from 'react';
import  {getExchangeRates, getRate} from '../../http/requests';
import './Converter.css';
import Select from '../UI/Select';

const Converter = () => {
  const [firstAmount, setFirstAmount] = useState(1);
  const [secondAmount, setSecondAmount] = useState(0);
  const [firstCurrency, setFirstCurrency] = useState('UAH');
  const [secondCurrency, setSecondCurrency] = useState('USD');
  const [currencyArray, setCurrencyArray] = useState([]);
  const [firstRate, setFirstRate] = useState(1);
  const [secondRate, setSecondRate] = useState(0);
  const [Rate, setRate] = useState(0);
  
  useEffect(() => {
    const fetch = async() =>{
      const responsesecondcurrency = await getRate(secondCurrency);
      console.log(responsesecondcurrency.rate);
      setSecondRate(responsesecondcurrency.rate);
      await changeAmount(firstAmount,firstCurrency,1);
    }
    if(Rate === Infinity || Rate === 0){
      fetch();
    }
  }, [Rate]);

  useEffect(() => {
    const fetch = async () => {
      const response = await getExchangeRates();
      setCurrencyArray(response);
      await changeAmount(firstAmount,firstCurrency,1);
    };
    fetch();
  }, []);

  const changeAmount = async (value, currency, target) => {
    let newFirstAmount = firstAmount;
    let newSecondAmount = secondAmount;
    let newFirstCurrency = firstCurrency;
    let newSecondCurrency = secondCurrency;
    let Amount = 0;

    if(target === 1){
      newFirstAmount = value;
      newFirstCurrency = currency;
    }else if(target === 2){
      newSecondAmount = value;
      newSecondCurrency = currency;
    }

    Amount = await AmountChenges(newFirstCurrency,newSecondCurrency,value,target);
    
    if(target === 1){
      newSecondAmount = Amount.toFixed(2);
    }else if(target === 2){
      newFirstAmount = Amount.toFixed(2);
    }

    setFirstAmount(newFirstAmount);
    setSecondAmount(newSecondAmount);
  }

  const AmountChenges = async(currencyfirst,currencysecond,value,target) => {
    let responsefirst, responsesecond;
    if(currencyfirst !== firstCurrency ){
      responsefirst = await GetRate(currencyfirst);
      setFirstRate(responsefirst);
    }else {
      responsefirst = firstRate;
    }
    if(currencysecond !== secondCurrency ){
      responsesecond = await GetRate(currencysecond);
      setSecondRate(responsesecond)
    }else {
      responsesecond = secondRate;
    }
      return value * chengeRate(responsefirst,responsesecond,target);
  }

  const chengeRate = (ratefirst,ratesecond,target) =>{
    setRate(ratefirst/ratesecond);
    if(target === 1){
      return ratefirst/ratesecond;
    }
    return ratesecond/ratefirst;
  }

  const GetRate = async(currency) =>{
    if(currency !== "UAH"){
      const response = await getRate(currency);
      return response.rate;
    }
    return 1;
  }

  const CurrencyHandler = async(e,target) => {
    const value = e.target.value;
    if (target === 1) {
      setFirstCurrency(value);
      await changeAmount(firstAmount,value,target);
    } else if (target === 2) {
      setSecondCurrency(value);
      await changeAmount(secondAmount,value,target);
    }
  }

  const AmountHandler = async(e,target) => {
    const value = e.target.value;
    if (target === 1) {
      setFirstAmount(value);
      await changeAmount(value,firstCurrency,target);
    } else if (target === 2) {
      setSecondAmount(value);
      await changeAmount(value,secondCurrency,target);
    }
  }

  return (
    <div>
    <div className="exchange-rates">
        <p>{firstCurrency}: {Rate.toFixed(2)} {secondCurrency}</p>
    </div>
    <div className="converter-container">
      <div className="input-container">
        <input
          type="number"
          value={firstAmount}
          onChange={e => AmountHandler(e,1)}
          className="amount-input"
        />
        <Select array = {currencyArray} value = {firstCurrency} onChange = {e => CurrencyHandler(e,1)}></Select>
      </div>
      <div className="equals-sign">=</div>
      <div className="output-container">
      <input
          type="number"
          value={secondAmount}
          onChange={e => AmountHandler(e,2)}
          className="amount-input"
        />        
        <Select array = {currencyArray} value = {secondCurrency} onChange = {e => CurrencyHandler(e,2)}></Select>
      </div>
    </div>
    </div>
  );
};

export default Converter;
