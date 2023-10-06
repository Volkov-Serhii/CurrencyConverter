import axios from "axios";

export const getExchangeRates = async () => {
    try {
        const response = await axios.get('/NBU_Exchange/exchange?json')
        console.log(response);
    } catch (err) {
        console.log(err);
    }
}

export const getEurRate = async () => {
    var ret;
    try {
        const response = await axios.get('/NBUStatService/v1/statdirectory/exchange?valcode=EUR&json')
        ret = response.data[0];
    } catch (err) {
        console.log(err);
    }
    return ret;
}

export const getUSDRate = async () => {
    var ret;
    try {
        const response = await axios.get('/NBUStatService/v1/statdirectory/exchange?valcode=USD&json')
        return response.data[0];
    } catch (err) {
        console.log(err);
    }
    return ret;
}