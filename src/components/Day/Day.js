import React from 'react';
import classNames from 'classnames';

import s from './Day.module.scss';

const Day = ({day, isMobile}) => {
    return (
        <div className={classNames({
            [s.day]: day,
            [s.emptyDay]: !day
        })}>
            <div>{day && day.format("D")}</div>
            {day && isMobile && <div>{day.format("ddd")}</div>}
        </div>
    )
};

export default Day;