import React from 'react';

import {weekDays} from "./WeekHeader.module.scss";

const WeekHeader = () => {
  return (
    <div className={weekDays}>
      <div>Mon</div>
      <div>Tues</div>
      <div>Wed</div>
      <div>Thurs</div>
      <div>Fri</div>
      <div>Sat</div>
      <div>Sun</div>
    </div>
  )
};

export default WeekHeader;