import React, {Component, Fragment} from 'react';
import windowSize from 'react-window-size';
import moment from 'moment';
import classNames from 'classnames';
import {equals} from 'ramda';

import {PlusCircle, X} from 'react-feather';

import ImageMap from '../../images/image-map';

import s from './Calendar.module.scss';

import CalendarUtils from '../../helpers/utils';
import DesktopCalendar from '../DesktopCalendar';
import MobileCalendar from '../MobileCalendar';


class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favorites: [],
      selectedMonth: moment(),
      calendarMonth: null,
      isSideBarOpen: false,
      isAddTeamOpen: false
    };
  }

  componentWillMount() {
    this.setState({
      calendarMonth: CalendarUtils.getCalendarMonth(11)
    });
  }

  componentDidMount() {
    this.props.onGetFavorites();
    this.props.onGetTeams();
  }

  componentDidUpdate(prevProps) {
    const {favorites, teams} = this.props;

    if (teams && favorites.length !== this.state.favorites.length /*!equals(this.state.favorites, favorites)*/) {
      const favoriteTeams = favorites.map(teamId => {
        return teams.find(({id}) => id + "" === teamId);
      });

      console.log("MATCHED TEAMS: ", favoriteTeams);

      this.setState({favorites: favoriteTeams});
    }
  }

  onToggleSideBar = val => {
    this.setState({isSideBarOpen: val});
  };

  onAddTeam = team => {
    this.props.onAddFavorite(team.id + "");
  };

  onCloseModal = () => {
    this.setState({isAddTeamOpen: false});
  };

  render() {
    const {fetching, teams/*, error*/} = this.props;
    const {isSideBarOpen, isAddTeamOpen, favorites} = this.state;
    const isMobile = this.props.windowWidth < 768;

    if (fetching) {
      return <div>LOADING...</div>
    }

    return (
      <div className={s.calendarWrapper}>
        <SideBar
          isSideBarOpen={isSideBarOpen}
          favorites={favorites}
          onAddTeam={() => this.setState({isAddTeamOpen: true})}
          onClose={() => this.onToggleSideBar(false)}
        />

        {isMobile
          ? <MobileCalendar
            favorites={favorites}
            calendarMonth={this.state.calendarMonth}
            selectedMonth={this.state.selectedMonth}
            onOpenSideBar={() => this.onToggleSideBar(true)}
          />
          : <DesktopCalendar
            favorites={favorites}
            calendarMonth={this.state.calendarMonth}
            selectedMonth={this.state.selectedMonth}
          />
        }

        {isAddTeamOpen &&
        <AddTeamModal
          teams={teams}
          onAddTeam={this.onAddTeam}
          onClose={this.onCloseModal}
        />
        }
      </div>
    );
  }
}

const SideBar = ({isSideBarOpen, favorites, onAddTeam, onClose}) => (
  <Fragment>
    <div className={
      classNames({
        [s.sideBar]: true,
        [s.sideBarOpen]: isSideBarOpen
      })
    }>

      {favorites.map(team => {
        return <Team key={team.id} team={team} showTeamName={false}/>
      })}

      <PlusCircle size={64} onClick={() => onAddTeam()}/>
    </div>

    {isSideBarOpen && <div className={s.sideBarOverlay} onClick={() => onClose()}/>}
  </Fragment>
);

const AddTeamModal = ({teams, onClose, onAddTeam}) => (
  <div className={s.addTeamModalOverlay}>
    <div className={s.addTeamModal}>
      <div className={s.modalHeader}>
        <div></div>
        <div><h1>Add Team</h1></div>
        <div><X onClick={() => onClose()}/></div>
      </div>

      <div className={s.teams}>
        {Object.entries(teams).map(([key, team]) => <Team key={team.id} team={team}
                                                          onClick={(team) => onAddTeam(team)}/>)}
      </div>
    </div>
  </div>
);

const Team = ({team, onClick, showTeamName = true}) => (
  <div className={s.team} onClick={() => onClick && onClick(team)}>
    <img src={ImageMap[team.image]} width={60} height={60}/>
    {showTeamName && <div>{team.city}</div>}
    {showTeamName && <div>{team.name}</div>}
  </div>
);

export default windowSize(Calendar);