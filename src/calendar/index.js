import React, { Component } from 'react';
import moment from 'moment';

import Day from './day';
import { month, week, header, weekDays, weeksWrapper } from './calendar.module.scss';

class Calendar extends Component {
    constructor(props){
        super(props);

        this.state = {
            selectedMonth: moment(),
            calendarMonth: null,
            isLoading: true
        };
    }

    componentWillMount(){
        this.setState({
            calendarMonth: getCalendarMonth(11),
            isLoading: false
        });
    }

    render() {
        if(this.state.isLoading){
            return <div>LOADING...</div>
        }

        return (
            <div className={month}>
                <div className={header}>
                    <div>{this.state.selectedMonth.format("MMMM")}</div>
                    <div>{this.state.selectedMonth.format("YYYY")}</div>
                </div>

                <div className={weekDays}>
                    <div>Monday</div>
                    <div>Tuesday</div>
                    <div>Wednesday</div>
                    <div>Thursday</div>
                    <div>Friday</div>
                    <div>Saturday</div>
                    <div>Sunday</div>
                </div>

                <div className={weeksWrapper}>
                {
                    this.state.calendarMonth.map((weeks, i) => {
                        return <div key={"week" + i} className={week}>
                            {
                                weeks.map((date, j) => {
                                    return <Day key={"day" + j} day={date}/>
                                })
                            }
                        </div>
                    })
                }
                </div>
            </div>
        );
    }
}

const getCalendarMonth = (monthParam = moment().format("MM"), yearParam = moment().format("YYYY")) => {
    let startDate = `${monthParam}-01-${yearParam}`;
    let firstWeekOfMonth = moment(startDate).startOf('month').week();
    let firstDay = moment(startDate).startOf('month');
    let endDay = moment(startDate).endOf('month');

    let month = [];
    let week = [];
    let currentWeek = 0;
    let daysHaveBeenPadded = false;
    for(let i=firstDay; i.isBefore(endDay); i.add(1, 'days')){
        let weekOfMonth = i.week() - firstWeekOfMonth;
        if(currentWeek !== weekOfMonth){
            month[currentWeek] = week;
            week = [];
            currentWeek = weekOfMonth;
        }

        // Pad days of first week until start date
        if(!daysHaveBeenPadded){
            for(let j=0; j<i.day(); j++){
                week[j] = null;
            }
            daysHaveBeenPadded = true;
        }

        week[i.day()] = moment(i);
    }

    // Fill out the last week
    for(let i=week.length; i<7; i++){
        week[i] = null;
    }

    month[currentWeek] = week;

    console.log(month);

    return month;
};

export default Calendar;
