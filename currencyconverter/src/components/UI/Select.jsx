import React from 'react';

const Select = (props) => {

    return(
        <select value={props.value} onChange={props.onChange}>
            <option value="UAH">UAH</option>
            {props.array.map((item, index) => (
                <option key = {index} value={item.CurrencyCodeL}>{item.CurrencyCodeL}</option>
            ))}
        </select>
    );
};

export default Select;