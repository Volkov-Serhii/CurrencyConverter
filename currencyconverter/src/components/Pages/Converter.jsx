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
  const [Rate, setRate] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const response = await getExchangeRates();
      setCurrencyArray(response);
      changeFirstRate(firstAmount,firstCurrency)
    };
    fetch();
  }, []);

  const changeFirstRate = async (value,currency) => {
    if(currency === secondCurrency){
      setSecondAmount((value * 1).toFixed(2));
      setRate(1);
    }else if(currency === "UAH"){
      const response = await getRate(secondCurrency);
      setSecondAmount((value * 1/response.rate).toFixed(2));
      setRate(1/response.rate);
    }else if(secondCurrency === "UAH"){
      const response = await getRate(currency);
      setSecondAmount((value * response.rate).toFixed(2));
      setRate(response.rate);
    }else{
      const responsefirst = await getRate(currency);
      const responsesecond = await getRate(secondCurrency);
      setSecondAmount((value * responsefirst.rate/responsesecond.rate).toFixed(2));
      setRate(responsefirst.rate/responsesecond.rate);
    }
  }

  const changeSecondRate = async (value,currency) => {
    if(firstCurrency === currency){
      setFirstAmount((value * 1).toFixed(2));
      setRate(1);
    }else if(currency === "UAH"){
      const response = await getRate(firstCurrency);
      setFirstAmount((value * 1/response.rate).toFixed(2));
      setRate(response.rate);
    }else if(firstCurrency === "UAH"){
      const response = await getRate(currency);
      setFirstAmount((value * response.rate).toFixed(2));
      setRate(1/response.rate);
    }else{
      const responsefirst = await getRate(firstCurrency);
      const responsesecond = await getRate(currency);
      setFirstAmount((value * responsesecond.rate/responsefirst.rate).toFixed(2));
      setRate(responsefirst.rate/responsesecond.rate);
    }
  }

  const firstCurrencyHandler = (e) => {
    const value = e.target.value;
    setFirstCurrency(value);
    changeFirstRate(firstAmount,value);
  };

  const secondCurrencyHandler = (e) => {
    const value = e.target.value;
    setSecondCurrency(value);
    changeSecondRate(secondAmount,value);
  };

  const firstAmountHandler = async(e) => {
    const value = e.target.value;
    setFirstAmount(value);
    await changeFirstRate(value,firstCurrency);
  };

  const secondAmountHandler = async(e) => {
    const value = e.target.value;
    setSecondAmount(value);
    await changeSecondRate(value,secondCurrency);
  };

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
          onChange={firstAmountHandler}
          className="amount-input"
        />
        <Select array = {currencyArray} value = {firstCurrency} onChange = {firstCurrencyHandler}></Select>
      </div>
      <div className="equals-sign">=</div>
      <div className="output-container">
      <input
          type="number"
          value={secondAmount}
          onChange={secondAmountHandler}
          className="amount-input"
        />        
        <Select array = {currencyArray} value = {secondCurrency} onChange = {secondCurrencyHandler}></Select>
      </div>
    </div>
    </div>
  );
};

export default Converter;
