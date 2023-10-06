import React, {useEffect, useState} from 'react';
import  {getExchangeRates, getEurRate, getUSDRate} from '../../http/requests';
import  './Header.css'; 


const Header = () => {
    const [usdRate, setUsdRate] = useState(null);
    const [eurRate, setEurRate] = useState(null);
    useEffect(()=>{
        const fetch = async()=>{
            const responseEUR = await getEurRate();
            setEurRate(responseEUR.rate);
            const responseUSD = await getUSDRate();
            setUsdRate(responseUSD.rate);
        }
        fetch();
    },[]);

    return(
        <header className="header-container">
            <h1 className="header-title">Exchange Rates</h1>
                <div className="exchange-rates">
                    <p>USD: {usdRate} UAH</p>
                    <p>EUR: {eurRate} UAH</p>
                </div>
        </header>
    );
};

export default Header;