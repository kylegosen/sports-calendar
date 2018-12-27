import React from 'react';

import {Menu} from 'react-feather';

import s from './CalendarHeader.module.scss';

const CalendarHeader = ({selectedMonth, showMenu, onClickMenu}) => {
  return (
    <div className={s.header}>
      <div className={s.headerLeft}>
        {showMenu &&
        <div onClick={() => onClickMenu && onClickMenu()}>
          <Menu size={24}/>
        </div>
        }
        <div className={s.month}>{selectedMonth.format("MMMM")}</div>
      </div>
      <div>{selectedMonth.format("YYYY")}</div>
    </div>
  );
};

export default CalendarHeader;