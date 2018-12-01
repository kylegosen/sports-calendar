import React from 'react';

import {weekDays} from "./week-header.module.scss";

const WeekHeader = () => {
    return (
        <div className={weekDays}>
            <div>Monday</div>
            <div>Tuesday</div>
            <div>Wednesday</div>
            <div>Thursday</div>
            <div>Friday</div>
            <div>Saturday</div>
            <div>Sunday</div>
        </div>
    )
};

export default WeekHeader;