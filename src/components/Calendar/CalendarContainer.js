import {connect} from "react-redux";

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
        onRequestTeams: () => dispatch({ type: "API_CALL_REQUEST" })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);