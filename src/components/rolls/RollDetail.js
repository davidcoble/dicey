import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip'
import RollEpilogueForm from './RollEpilogueForm';
import { startEditRoll, startDeleteRoll, startUndeleteRoll } from '../../actions/rolls';


export class RollDetail extends React.Component {
    constructor(props) {
        super(props);
        // console.log("RollDetails props = " + JSON.stringify(props, null, 4));
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
        // console.log("deleteRoll e = " + e);
        // console.log("deleteRoll id = " + this.state.id);
        this.props.startDeleteRoll({id: this.state.id});
    };

    undeleteRoll = (e) => {
        e.preventDefault();
        // console.log("undeleteRoll e = " + e);
        // console.log("undeleteRoll id = " + this.state.id);
        this.props.startUndeleteRoll({id: this.state.id});
    };

    render() {
        let uid = this.props.uid;
        console.log("RollDetail.render() showDeleted = " + this.props.showDeleted);
        // console.log("RollDetails uid = " + uid);
        // console.log("RollDetails this.state = " + JSON.stringify(this.state, null, 4));
        let deleteRequestedByMe, deleteRequestedByOther;
        let deleteRequestedByList = "delete requested by: ";
        let remainingPlayers = "remaining player(s): ";
        let deleted = false;
        let areRemaining = false;
        if (this.props.deleters === undefined) {
            deleteRequestedByMe = false;
        } else {
            deleteRequestedByMe = this.props.deleters[uid];
            // console.log("deleters = " + JSON.stringify(this.props.deleters, null, 4));
            Object.keys(this.props.deleters).forEach((key, index) => {
                // console.log("key = " + key);
                // console.log("index = " + index);
                let name = this.props.players.find((p) => {return p.uid === key}).name;
                // console.log("name = " + name);
                if (this.props.deleters[key]) {
                    deleteRequestedByOther = true;
                    deleteRequestedByList += " " + name + ",";
                } else {
                    areRemaining = true;
                    remainingPlayers += " " + name + ",";
                }
            })
            if (deleteRequestedByMe && !areRemaining) {
                deleted = true;
            }
            if (this.props.showDeleted) {
                deleted = false;
            }
        }
        deleteRequestedByList += "\n";
        if (deleted === true) {
            return (<div></div>);
        } else {

            return (
                <div className='rowForm' >
                    <ReactTooltip id={`roll${this.props.id}`}>
                    <span>
                        {deleteRequestedByOther || deleteRequestedByMe ? `${deleteRequestedByList}` : "no delete requests"}
                        <br/>
                        {deleteRequestedByOther || deleteRequestedByMe ? `${remainingPlayers}` : ""}
                    </span>
                    </ReactTooltip>
                    <div className={`colForm-time 
                ${deleteRequestedByMe ? "line-grey" : ""} 
                ${deleteRequestedByOther && !deleteRequestedByMe ? "line-blue" : ""}`}
                    >
                        <a data-tip data-for={`roll${this.props.id}`}>
                            {
                                moment(this.props.createdAt).format('YYYY/MM/DD HH:mm:ss')
                            }
                        </a>
                    </div>
                    <div className={`colForm-name 
                ${deleteRequestedByMe ? "line-grey" : ""} 
                ${deleteRequestedByOther && !deleteRequestedByMe ? "line-blue" : ""}`}
                    >
                        <a data-tip data-for={`roll${this.props.id}`}>
                            {this.props.createdBy}
                        </a>
                    </div>
                    <div className={`colForm-turn 
                ${deleteRequestedByMe ? "line-grey" : ""} 
                ${deleteRequestedByOther && !deleteRequestedByMe ? "line-blue" : ""}`}
                    >
                        <a data-tip data-for={`roll${this.props.id}`}>
                            {this.props.turn}
                        </a>
                    </div>
                    <div className={`colForm-descr 
                ${deleteRequestedByMe ? "line-grey" : ""} 
                ${deleteRequestedByOther && !deleteRequestedByMe ? "line-blue" : ""}`}
                    >
                        <a data-tip data-for={`roll${this.props.id}`}>
                            {this.props.description}
                        </a>
                    </div>
                    <div className={`colForm-dice
                ${deleteRequestedByMe ? "line-grey" : ""} 
                ${deleteRequestedByOther && !deleteRequestedByMe ? "line-blue" : ""}`}
                    >
                        <a data-tip data-for={`roll${this.props.id}`}>
                            {this.props.dice}
                        </a>
                    </div>
                    <div className={`colForm-sides 
                ${deleteRequestedByMe ? "line-grey" : ""} 
                ${deleteRequestedByOther && !deleteRequestedByMe ? "line-blue" : ""}`}
                    >
                        <a data-tip data-for={`roll${this.props.id}`}>
                            {this.props.sides}
                        </a>
                    </div>
                    <div className={`colForm-mods
                ${deleteRequestedByMe ? "line-grey" : ""} 
                ${deleteRequestedByOther && !deleteRequestedByMe ? "line-blue" : ""}`}
                    >
                        <a data-tip data-for={`roll${this.props.id}`}>
                            {this.props.mods}
                        </a>
                    </div>
                    <div className={`colForm-result
                ${deleteRequestedByMe ? "line-grey" : ""} 
                ${deleteRequestedByOther && !deleteRequestedByMe ? "line-blue" : ""}`}
                    >
                        <a data-tip data-for={`roll${this.props.id}`}>
                            {this.props.result}
                        </a>
                    </div>
                    <div className='colForm-epilogue'>
                        <RollEpilogueForm
                            deleters={this.state.deleters}
                            rid={this.state.id}
                            epilogue={this.state.epilogue}
                            onSubmit={this.onSubmitEpilogue}/>
                    </div>
                    <div className='colForm-delete'>
                        {
                            deleteRequestedByMe ?
                                <button className='button-small' onClick={this.undeleteRoll}>retain</button> :
                                <button className='button-small' onClick={this.deleteRoll}>delete</button>
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
}
const mapStateToProps = (state, props) => {
    // console.log("RollDetail mapStateToProps state = " + JSON.stringify(state, null, 2));
    return {
        players: state.players,
        uid: state.auth.uid,
        roll: state.rolls.find((r) => {return r.id === props.id}),
        showDeleted: props.showDeleted,
    }
};


const mapDispatchToProps = (dispatch, props) => ({
    startEditRoll: (id, epilogue) => dispatch(startEditRoll(id, epilogue)),
    startDeleteRoll: (id) => dispatch(startDeleteRoll(id)),
    startUndeleteRoll: (id) => dispatch(startUndeleteRoll(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RollDetail);
