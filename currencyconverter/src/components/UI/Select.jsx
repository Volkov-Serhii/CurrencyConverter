import React from 'react';

const Select = (props) => {

    return(
        <select value={props.value} onChange={props.onChange}>
            <option title = "Українська гривня" value="UAH">UAH</option>
            {props.array.map((item, index) => (
                <option key = {index} title = {item.txt} value={item.cc}>{item.cc}</option>
            ))}
        </select>
    );
};

export default Select;