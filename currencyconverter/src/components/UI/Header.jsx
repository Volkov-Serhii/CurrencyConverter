import React, {useEffect, useState} from 'react';
import  {getExchangeRates, getRate} from '../../http/requests';
import  './Header.css'; 


const Header = () => {
    const [usdRate, setUsdRate] = useState(0);
    const [eurRate, setEurRate] = useState(0);
    
    useEffect(()=>{
        const fetch = async()=>{
            const responseEUR = await getRate("EUR");
            const responseUSD = await getRate("USD");
            setUsdRate(responseUSD.rate);
            setEurRate(responseEUR.rate);
        }
        fetch();
    },[]);

    return(
        <header className="header-container">
            <h1 className="header-title">Exchange Rates</h1>
                <div className="exchange-rates">
                    <p>USD: {usdRate.toFixed(2)} UAH</p>
                    <p>EUR: {eurRate.toFixed(2)} UAH</p>
                </div>
        </header>
    );
};

export default Header;