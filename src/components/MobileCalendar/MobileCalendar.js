import React from 'react';

import CalendarHeader from '../CalendarHeader';

import s from './MobileCalendar.module.scss';

const MobileCalendar = ({calendarMonth, onOpenSideBar, selectedMonth}) => {
    const days = calendarMonth.flat(2).filter(day => day);

    return (
        <div className={s.month}>
            <CalendarHeader
                selectedMonth={selectedMonth}
                showMenu={true}
                onClickMenu={() => onOpenSideBar()}/>

            <div className={s.days}>{
                days.map((date, i) => {
                    return <Day key={"day" + i} day={date}/>
                })
            }</div>
        </div>
    );
};

const Day = ({day}) => {
    return (
        <div className={s.day}>
            <div className={s.dayHeader}>
                <div>{ day.format("ddd") }</div>
                <div>{ day.format("MMM D") }</div>
            </div>
            <div>
                <span>No games.</span>
            </div>
        </div>
    )
};

export default MobileCalendar;