import React from 'react';
import moment from 'moment';

import { day, emptyDay, lastDayOfMonth } from './calendar.module.scss';

const Day = (props) => {
    let dayClass = !!props.day ? day : emptyDay;
    let lastDayOfMonthClass = props.day && props.day.format("D") === moment(props.day).endOf('month').format("D") ? lastDayOfMonth : "";

    return (
        <div className={`${dayClass} ${lastDayOfMonthClass}`}>
            {props.day && props.day.format("D")}
        </div>
    )
};

export default Day;