import React from 'react';
import RollList from './RollList';
import RollForm from './RollForm';
import {startAddRoll, startEditRoll, startRemoveRoll} from "../../actions/rolls";
import {connect} from "react-redux";

export class RollManagementPage extends React.Component {

    onSubmitAddRoll = (roll) => {
        this.props.startAddRoll(roll);
        this.props.history.push('/rolls');
    };

    onSubmitEditRoll = (roll) => {
        this.props.startEditRoll(this.props.roll.id, roll);
        this.props.history.push('/rolls');
    };
    onRemoveRoll = () => {
        this.props.startRemoveRoll({id: this.props.roll.id});
        this.props.history.push("/rolls");
    };
    componentWillMount() {
        if (this.props.match.path.startsWith('/rolls/delete')) {
            this.onRemoveRoll();
        }
    };

    render() {
        // console.log("render with props = " + JSON.stringify(this.props, null, 2));
        if (this.props.location.pathname.startsWith('/rolls/create')) {
            return (
                <div>
                    <div className="page-header">
                        <div className="content-container">
                            <h1 className="page-header__title">Add Game Roll</h1>
                        </div>
                    </div>
                    <div className="content-container">
                        <RollForm onSubmit={this.onSubmitAddRoll} />
                    </div>
                </div>
            );
        }
        else if (this.props.match.path.startsWith('/rolls/edit')) {
            // console.log("props = " + JSON.stringify(this.props, null,2));
            return (
                <div>
                    <div className="page-header">
                        <div className="content-container">
                            <h1 className="page-header__title">Editing roll {this.props.match.params.id}</h1>
                        </div>
                    </div>
                    <div className="roll-content-container">
                        <RollForm roll={this.props.roll} onSubmit={this.onSubmitEditRoll} />
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <RollList />
                </div>
            );
        }
    }
};

const mapStateToProps = (state, props) => {
     console.log("state.rolls = " + JSON.stringify(state.rolls, null, 2));
    return {
        roll: state.rolls ? state.rolls.find((roll) => roll.id === props.match.params.id) : []
    };
};

const mapDispatchToProps = (dispatch) => ({
    startAddRoll: (roll) => dispatch(startAddRoll(roll)),
    startEditRoll: (id, roll) => dispatch(startEditRoll(id, roll)),
    startRemoveRoll: (id) => dispatch(startRemoveRoll(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(RollManagementPage);
