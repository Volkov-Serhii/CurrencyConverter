import axios from "axios";

export const getExchangeRates = async () => {
    var ret;
    try {
        ///NBU_Exchange/exchange?json
        ///NBUStatService/v1/statdirectory/exchangenew?json
        const response = await axios.get('NBUStatService/v1/statdirectory/exchangenew?json')
        ret = response.data;
    } catch (err) {
        console.log(err);
    }
    return ret;
}

export const getRate = async (currency) => {
    var ret;
    try{
        const response = await axios.get(`/NBUStatService/v1/statdirectory/exchange?valcode=${currency}&json`)
        ret = response.data[0];
    }catch (err) {
        console.log(err);
    }
    return ret;
}