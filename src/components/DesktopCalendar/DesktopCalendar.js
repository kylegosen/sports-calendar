import React from 'react';
import classNames from "classnames";
import { concat } from 'ramda';

import CalendarHeader from '../CalendarHeader';
import WeekHeader from '../WeekHeader';

import s from './DesktopCalendar.module.scss';

const DesktopCalendar = ({ calendarMonth, selectedMonth, favorites }) => {
  const favoriteGames = favorites.reduce((accumulator, currentValue) => {
    return concat(accumulator, currentValue.games);
  }, []);

  return (
    <div className={s.month}>
      <CalendarHeader selectedMonth={selectedMonth}/>

      <WeekHeader/>

      <div className={s.weeksWrapper}>{
        calendarMonth.map((weeks, i) => {
          return <div key={"week" + i} className={s.week}>{
            weeks.map((date, j) => {
              return <Day key={"day" + j} day={date}/>
            })
          }</div>
        })
      }</div>
    </div>
  );
};

const Day = ({day}) => {
  return (
    <div className={classNames({
      [s.day]: day,
      [s.emptyDay]: !day
    })}>
      <div>{day && day.format("D")}</div>
    </div>
  )
};

export default DesktopCalendar;