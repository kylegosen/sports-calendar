import {connect} from "react-redux";

import * as actions from '../../actions';
import Calendar from './Calendar';

const mapStateToProps = state => {
    const { teams, fetching, error } = state;
    return {
        teams,
        fetching,
        error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetTeams: () => dispatch(actions.getTeams())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);