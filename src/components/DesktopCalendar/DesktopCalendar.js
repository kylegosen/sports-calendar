import React from 'react';
import classNames from "classnames";
import { concat, find, propEq } from 'ramda';

import CalendarHeader from '../CalendarHeader';
import WeekHeader from '../WeekHeader';

import s from './DesktopCalendar.module.scss';
import ImageMap from "../../images/image-map";

const DesktopCalendar = ({ calendarMonth, selectedMonth, teams, favorites }) => {
  const favoriteGames = favorites.reduce((accumulator, currentValue) => {
    return concat(accumulator, currentValue.games);
  }, []);

  console.log(favoriteGames);

  return (
    <div className={s.month}>
      <CalendarHeader selectedMonth={selectedMonth}/>

      <WeekHeader/>

      <div className={s.weeksWrapper}>{
        calendarMonth.map((weeks, i) => {
          return <div key={"week" + i} className={s.week}>{
            weeks.map((date, j) => {
              const dayGames = date ? favoriteGames.filter(game => date.isSame(game.momentTime, 'day')) : [];
              return <Day key={"day" + j} day={date} teams={teams} games={dayGames}/>
            })
          }</div>
        })
      }</div>
    </div>
  );
};

const Day = ({ day, teams, games }) => {
  return (
    <div className={classNames({
      [s.day]: day,
      [s.emptyDay]: !day
    })}>
      <div>{day && day.format("D")}</div>
      {
        games.map((game, index) => {
          const homeTeam = find(propEq("id", game.homeTeamId))(teams);
          const awayTeam = find(propEq("id", game.awayTeamId))(teams);

          return (
            <div className={s.game} key={index}>
              <div><img src={ImageMap[homeTeam.image]} width={25} height={25}/></div>
              <div>vs</div>
              <div><img src={ImageMap[awayTeam.image]} width={25} height={25}/></div>
            </div>
          )
        })
      }
    </div>
  )
};

export default DesktopCalendar;