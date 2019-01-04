import moment from "moment";

export function getCalendarMonth(monthParam = moment().format("MM"), yearParam = moment().format("YYYY")) {
  let startDate = `${monthParam}-01-${yearParam}`;
  let firstDay = moment(startDate).startOf('month');
  let endDay = moment(startDate).endOf('month');

  let month = [];
  let week = [];
  let currentWeek = 0;
  let daysHaveBeenPadded = false;
  for (let i = firstDay; i.isBefore(endDay); i.add(1, 'days')) {
    let weekOfMonth = getWeekOfMonth(i) - 1;

    if (currentWeek !== weekOfMonth) {
      month[currentWeek] = week;
      week = [];
      currentWeek = weekOfMonth;
    }

    // Pad days of first week until start date
    if (!daysHaveBeenPadded) {
      for (let j = 0; j < i.day(); j++) {
        week[j] = null;
      }
      daysHaveBeenPadded = true;
    }

    week[i.day()] = moment(i);
  }

  // Fill out the last week
  for (let i = week.length; i < 7; i++) {
    week[i] = null;
  }

  month[currentWeek] = week;

  console.log(month);

  return month;
}

function getWeekOfMonth (input) {
  const firstDayOfMonth = input.clone().startOf('month');
  const firstDayOfWeek = firstDayOfMonth.clone().startOf('week');

  const offset = firstDayOfMonth.diff(firstDayOfWeek, 'days');

  return Math.ceil((input.date() + offset) / 7);
}