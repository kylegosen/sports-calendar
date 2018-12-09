import React from 'react';

import CalendarHeader from '../CalendarHeader';
import Day from '../Day';
import WeekHeader from '../WeekHeader';

import s from './DesktopCalendar.module.scss';

const DesktopCalendar = ({calendarMonth, selectedMonth}) => {
    return (
        <div className={s.month}>
            <CalendarHeader selectedMonth={selectedMonth}/>
            <WeekHeader />

            <div className={s.weeksWrapper}>{
                calendarMonth.map((weeks, i) => {
                    return <div key={"week" + i} className={s.week}>{
                        weeks.map((date, j) => {
                            return <Day key={"day" + j} day={date} isMobile={false} />
                        })
                    }</div>
                })
            }</div>
        </div>
    );
};

export default DesktopCalendar;