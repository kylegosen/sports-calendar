import React, { Component, Fragment } from 'react';
import windowSize from 'react-window-size';
import moment from 'moment';
import classNames from 'classnames';

import ImageMap from '../../images/image-map';

import s from './Calendar.module.scss';
import CalendarUtils from '../../helpers/utils';
import AddTeam from '../AddTeam';
import DesktopCalendar from '../DesktopCalendar';
import MobileCalendar from '../MobileCalendar';

class Calendar extends Component {
    constructor(props){
        super(props);

        this.state = {
            selectedMonth: moment(),
            calendarMonth: null,
            isLoading: true,
            isSideBarOpen: false,
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

    onToggleSideBar = (val) => {
        this.setState({isSideBarOpen: val});
    };

    render() {
        const { isLoading, isSideBarOpen } = this.state;
        const isMobile = this.props.windowWidth < 768;

        if(isLoading){
            return <div>LOADING...</div>
        }

        return (
            <div className={s.calendarWrapper}>
                <SideBar isSideBarOpen={isSideBarOpen} onClose={() => this.onToggleSideBar(false)}/>
                {
                    isMobile
                        ? <MobileCalendar
                            calendarMonth={this.state.calendarMonth}
                            selectedMonth={this.state.selectedMonth}
                            onOpenSideBar={() => this.onToggleSideBar(true)}
                        />
                        : <DesktopCalendar
                            calendarMonth={this.state.calendarMonth}
                            selectedMonth={this.state.selectedMonth}
                        />
                }
            </div>
        );
    }
}

const SideBar = ({isSideBarOpen, onClose}) => {
  return (
      <Fragment>
          <div className={
              classNames({
                  [s.sideBar]: true,
                  [s.sideBarOpen]: isSideBarOpen
              })
          }>
              <img src={ImageMap["nfl_ari"]} className={s.favoriteTeam} alt=""/>
          </div>

        {
            isSideBarOpen &&
            <div className={s.sideBarOverlay} onClick={() => onClose() }/>
        }
    </Fragment>
  );
};

export default windowSize(Calendar);