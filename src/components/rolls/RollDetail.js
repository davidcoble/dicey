import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import RollEpilogueForm from './RollEpilogueForm';
import { startEditRoll, startDeleteRoll, startUndeleteRoll } from '../../actions/rolls';


export class RollDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
    };
    onSubmitEpilogue = (e) => {
        // console.log("RollDetails.onSubmitEpilogue e = " + JSON.stringify(e));
        e.updates = { epilogue: e.epilogue };
        this.props.startEditRoll(e);
    };

    deleteRoll = (e) => {
        e.preventDefault();
        console.log("deleteRoll e = " + e);
        console.log("deleteRoll id = " + this.state.id);
        this.props.startDeleteRoll(this.state.id);
    };

    undeleteRoll = (e) => {
        e.preventDefault();
        console.log("undeleteRoll e = " + e);
        console.log("undeleteRoll id = " + this.state.id);
        this.props.startUndeleteRoll(this.state.id);
    };

    render() {
        console.log("RollDetails this.state = " + JSON.stringify(this.state, null, 2));
        return (
            <div className='rowForm'>
                <div className={`colForm-time ${this.state.deleters !== undefined ? "line-grey" : ""}`}>{
                    moment(this.state.createdAt).format('YYYY/MM/DD HH:mm:ss')
                }</div>
                <div className={`colForm-name ${this.state.deleters !== undefined ? "line-grey" : ""}`}>{this.state.createdBy}</div>
                <div className={`colForm-turn ${this.state.deleters !== undefined ? "line-grey" : ""}`}>{this.state.turn}</div>
                <div className={`colForm-descr ${this.state.deleters !== undefined ? "line-grey" : ""}`}>{this.state.description}</div>
                <div className={`colForm-dice ${this.state.deleters !== undefined ? "line-grey" : ""}`}>{this.state.dice}</div>
                <div className={`colForm-sides ${this.state.deleters !== undefined ? "line-grey" : ""}`}>{this.state.sides}</div>
                <div className={`colForm-mods ${this.state.deleters !== undefined ? "line-grey" : ""}`}>{this.state.mods}</div>
                <div className={`colForm-result ${this.state.deleters !== undefined ? "line-grey" : ""}`}>{this.state.result}</div>
                <div className={`colForm-epilogue ${this.state.deleters !== undefined ? "line-grey" : ""}`}>
                    <RollEpilogueForm
                        rid={this.state.id}
                        epilogue={this.state.epilogue}
                        onSubmit={this.onSubmitEpilogue}/>
                </div>
                <div className='colForm-turn'>
                    {
                        this.state.deleters !== undefined ?
                            <button onClick={this.undeleteRoll}>undelete</button> :
                            <button onClick={this.deleteRoll}>delete</button>
                    }
                </div>
                {/*
                <div className='rowForm'>
                    <div className='colForm'><input type='checkbox'/></div>
                    <div className='colForm'><input type='checkbox'/></div>
                </div>
*/}
            </div>
        );
    }
}
const mapStateToProps = (state, props) => {
    return {
        roll: state.rolls.find((r) => {return r.id === props.id})
    }
};


const mapDispatchToProps = (dispatch, props) => ({
    startEditRoll: (id, epilogue) => dispatch(startEditRoll(id, epilogue)),
    startDeleteRoll: (id) => dispatch(startDeleteRoll(id)),
    startUndeleteRoll: (id) => dispatch(startUndeleteRoll(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RollDetail);
