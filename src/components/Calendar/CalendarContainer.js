import {connect} from "react-redux";

import * as actions from '../../actions';
import Calendar from './Calendar';

const mapStateToProps = state => {
  const {teams, favorites, fetching, error} = state;
  return {
    teams,
    favorites,
    fetching,
    error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetTeams: () => dispatch(actions.getTeams()),
    onGetFavorites: () => dispatch(actions.getFavorites()),
    onAddFavorite: teamId => dispatch(actions.addFavorite(teamId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);