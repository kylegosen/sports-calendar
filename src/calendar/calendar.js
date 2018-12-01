import React, { Component } from 'react';
import moment from 'moment';
import { connect } from "react-redux";

import ImageMap from '../images/image-map';

import CalendarUtils from './utils';
import WeekHeader from './components/week-header/week-header';
import Day from './components/day/day';
import AddTeam from './components/add-team/add-team';
import { calendarWrapper, favorites, month, week,
    header, weeksWrapper, hook, rightHook, leftHook,
    favoriteTeam, addButton } from './calendar.module.scss';

class Calendar extends Component {
    constructor(props){
        super(props);

        this.state = {
            selectedMonth: moment(),
            calendarMonth: null,
            isLoading: true,
            isAddTeamOpen: false
        };
    }

    componentWillMount(){
        this.setState({
            calendarMonth: CalendarUtils.getCalendarMonth(11),
            isLoading: false
        });
    }

    componentDidMount(){
        this.props.onRequestTeams();
    }

    onAddTeam(){
        this.setState({isAddTeamOpen: true});
    }

    onCancelAddTeam(){
        this.setState({isAddTeamOpen: false});
    }

    onSaveAddTeam(){
        this.setState({isAddTeamOpen: false});
        console.log("ADD TEAM");
    }

    render() {
        if(this.state.isLoading){
            return <div>LOADING...</div>
        }

        return (
            <div className={calendarWrapper}>
                <div className={favorites}>
                    <img src={ImageMap["nfl_ari"]} className={favoriteTeam} alt=""/>
                </div>

                <div className={month}>
                    <div className={header}>
                        <div>{this.state.selectedMonth.format("MMMM")}</div>
                        <span className={`${hook} ${leftHook}`} />
                        <span className={`${hook} ${rightHook}`} />
                        <div>{this.state.selectedMonth.format("YYYY")}</div>
                    </div>

                    <WeekHeader />

                    <div className={weeksWrapper}>{
                        this.state.calendarMonth.map((weeks, i) => {
                            return <div key={"week" + i} className={week}>{
                                weeks.map((date, j) => {
                                    return <Day key={"day" + j} day={date}/>
                                })
                            }</div>
                        })
                    }</div>
                </div>

                <div className={addButton} onClick={() => this.onAddTeam()}>+</div>

                <AddTeam
                    isOpen={this.state.isAddTeamOpen}
                    onCancel={() => this.onCancelAddTeam()}
                    onAdd={() => this.onSaveAddTeam()}
                    />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        teams: state.teams,
        fetching: state.fetching,
        error: state.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRequestTeams: () => dispatch({ type: "API_CALL_REQUEST" })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
