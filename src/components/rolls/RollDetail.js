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
        // console.log("RollDetail.render() props = " + JSON.stringify(this.props, null,2));
        // console.log("RollDetails uid = " + uid);
        // console.log("RollDetails this.state = " + JSON.stringify(this.state, null, 4));
        let deleteRequestedByMe, deleteRequestedByOther;
        let deleteRequestedByList = "delete requested by: ";
        let remainingPlayers = "remaining player(s): ";
        let deleted = false;
        let areRemaining = false;
        deleteRequestedByMe = this.props.deleters === undefined ? false : this.props.deleters[uid];
        let deleters = this.props.deleters === undefined ? [] : this.props.deleters;
        // console.log("deleteRequestedByMe = " + deleteRequestedByMe);
        // console.log("deleters = " + JSON.stringify(this.props.deleters, null, 4));
        Object.keys(deleters).forEach((key, index) => {
            // console.log("key = " + key);
            // console.log("index = " + index);
            this.props.players.map((player) => {
                //console.log("player = " + JSON.stringify(player, null, 2));
                const puid = player.uid;
                if (deleters[puid] === undefined || deleters[puid] === false) {
                    remainingPlayers += " " + player.name;
                    areRemaining = true;
                } else {
                    deleteRequestedByOther = true;
                    deleteRequestedByList += " " + player.name;
                }

            });
        });
        if (deleteRequestedByMe && !areRemaining) {
            deleted = true;
        }
        if (this.props.showDeleted) {
            deleted = false;
        }

        deleteRequestedByList += "\n";
        let color;
        if (deleteRequestedByMe && areRemaining) {
            color = 'pink';
        } else if(deleteRequestedByOther && !deleteRequestedByMe) {
            color = 'blue';
        }
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
                    <div className={`rollList-roll-time ${color}`}>
                        <a data-tip data-for={`roll${this.props.id}`}>
                            '{
                            moment(this.props.createdAt).format('YY/MM/DD HH:mm:ss')
                        }
                        </a>
                    </div>
                    <div className={`rollList-roll-name ${color}`}>
                        <a data-tip data-for={`roll${this.props.id}`}>
                            {this.props.createdBy}
                        </a>
                    </div>
                    <div className={`rollList-roll-turn ${color}`}>
                        <a data-tip data-for={`roll${this.props.id}`}>
                            {this.props.turn}
                        </a>
                    </div>
                    <div className={`rollList-roll-descr ${color}`}>
                        <a data-tip data-for={`roll${this.props.id}`}>
                            {this.props.description}
                        </a>
                    </div>
                    <div className={`rollList-roll-dice ${color}`}>
                        <a data-tip data-for={`roll${this.props.id}`}>
                            {this.props.dice}
                        </a>
                    </div>
                    <div className={`rollList-roll-sides ${color}`}>
                        <a data-tip data-for={`roll${this.props.id}`}>
                            {this.props.sides}
                        </a>
                    </div>
                    <div className={`rollList-roll-mods ${color}`}>
                        <a data-tip data-for={`roll${this.props.id}`}>
                            {this.props.mods}
                        </a>
                    </div>
                    <div className={`rollList-roll-sum ${color}`}>
                        <a data-tip data-for={`roll${this.props.id}`}>
                            {this.props.sum ? 'yes' : 'no'}
                        </a>
                    </div>
                    <div className={`rollList-roll-result ${color}`}>
                        <a data-tip data-for={`roll${this.props.id}`}>
                            {this.props.result}
                        </a>
                    </div>
                    <div className={`rollList-roll-epilogue ${color}`}>
                        <RollEpilogueForm
                            deleters={this.state.deleters}
                            rid={this.state.id}
                            color={color}
                            epilogue={this.state.epilogue}
                            onSubmit={this.onSubmitEpilogue}/>
                    </div>
                    <div className='rollList-roll-delete'>
                        {
                            deleteRequestedByMe ?
                                <button className='rollList-roll-button' onClick={this.undeleteRoll}>retain</button> :
                                <button className='rollList-roll-button' onClick={this.deleteRoll}>delete</button>
                        }
                    </div>

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
