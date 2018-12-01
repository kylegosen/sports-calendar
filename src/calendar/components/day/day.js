import React from 'react';

import { day, emptyDay } from './day.module.scss';

const Day = (props) => {
    let className = props.day ? day : emptyDay;

    return (
        <div className={className}>
            {props.day && props.day.format("D")}
        </div>
    )
};

export default Day;