import React from 'react';
import RollList from './RollList';
import RollForm from './RollForm';
import {startAddRoll, startEditRoll, startRemoveRoll} from "../../actions/rolls";
import {connect} from "react-redux";

export class RollManagementPage extends React.Component {
    render() {
        return (
            <div>
                <RollList />
            </div>
        );
    };
};

const mapStateToProps = (state, props) => {
    return {
        roll: state.rolls ? state.rolls.find((roll) => roll.id === props.match.params.id) : []
    };
};

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(RollManagementPage);
