import React from 'react';

import Day from '../Day';
import CalendarHeader from '../CalendarHeader';

import s from './MobileCalendar.module.scss';

const MobileCalendar = ({calendarMonth, onOpenSideBar, selectedMonth}) => {
    return (
        <div className={s.month}>
            <CalendarHeader
                selectedMonth={selectedMonth}
                showMenu={true}
                onClickMenu={() => onOpenSideBar()}/>

            <div className={s.weeksWrapper}>{
                calendarMonth.map((weeks, i) => {
                    return <div key={"week" + i} className={s.week}>{
                        weeks.map((date, j) => {
                            return <Day key={"day" + j} day={date} isMobile={true} />
                        })
                    }</div>
                })
            }</div>
        </div>
    );
};

export default MobileCalendar;