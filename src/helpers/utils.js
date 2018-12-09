import moment from "moment";

function getCalendarMonth(monthParam = moment().format("MM"), yearParam = moment().format("YYYY")) {
    let startDate = `${monthParam}-01-${yearParam}`;
    let firstWeekOfMonth = moment(startDate).startOf('month').week();
    let firstDay = moment(startDate).startOf('month');
    let endDay = moment(startDate).endOf('month');

    let month = [];
    let week = [];
    let currentWeek = 0;
    let daysHaveBeenPadded = false;
    for (let i = firstDay; i.isBefore(endDay); i.add(1, 'days')) {
        let weekOfMonth = i.week() - firstWeekOfMonth;
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

export default { getCalendarMonth };