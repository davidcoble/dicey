import React from 'react';
import { connect } from 'react-redux';
import RollForm from './RollForm';
import moment from 'moment';
import { selectRolls } from '../../selectors/rolls';
import { startSetPlayerRollingGame, startSetPlayerRollingGameTurn } from '../../actions/players';
import { startAddRoll } from '../../actions/rolls';
import RollDetail from "./RollDetail";

export class RollList extends React.Component {
    constructor(props) {
        super(props);

    }
    onSelectRollingGame = ({gid} = {}) => {
        // console.log("gid = " + gid);
        this.props.startSetPlayerRollingGame(this.props.uid, gid);
    };
    onSelectRollingGameTurn = ({gid, tid} = {}) => {
        this.props.startSetPlayerRollingGameTurn(this.props.uid, gid, tid);
    };
    onSubmit = (rollRequest) => {
        // console.log("[RollList.onSubmit] rollRequest = " + JSON.stringify(rollRequest, null, 2));
        let rolls = [];
        let rollSum = 0;
        rollSum += parseInt(rollRequest.mods);
        for (let i = 0; i < rollRequest.dice; i++) {
            let j = Math.floor((Math.random() * rollRequest.sides) + 1);
            rolls.push(j);
            rollSum += j;
        }
        rollRequest.result = "(" + rolls.join(', ') + ") " +
            (rollRequest.mods ? "+ (" + rollRequest.mods + ")" : "")
            + " = " + rollSum + "";
        // console.log(rollRequest.result);
        this.props.startAddRoll(rollRequest);
    };
    render() {
        return (
            <div>
                <b>Rolls</b>
                <div>
                    <RollForm
                        onSelectRollingGame={this.onSelectRollingGame}
                        onSelectRollingGameTurn={this.onSelectRollingGameTurn}
                        onSubmit={this.onSubmit}
                        games={this.props.games}
                    />
                </div>
                <div className='colForm'>
                    <div className='rowForm'>
                        <div className='colForm-descr'>Timestamp</div>
                        <div className='colForm-med'>Player</div>
                        <div className='colForm-med'>Turn</div>
                        <div className='colForm-descr'>Description</div>
                        <div className='colForm-tiny'>Dice</div>
                        <div className='colForm-tiny'>Sides</div>
                        <div className='colForm-tiny'>Mod</div>
                        <div className='colForm-med'>Result</div>
                        <div className='colForm-descr'>Epilogue</div>
                    </div>
                    {
                        this.props.rolls.map((roll) => {
                            return <RollDetail key={roll.id} {...roll}/>
                        })
                    }
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    console.log("mapStateToProps state = " + JSON.stringify(state, null, 2));
    let gid = state.players.find((p) => { return p.uid == state.auth.uid}).rollingGame;
    return {
        rolls: selectRolls(state.rolls, gid),
        uid: state.auth.uid,
        games: state.games,

    };
};
const mapDispatchToProps = (dispatch, props) => ({
    startSetPlayerRollingGame: (uid, gid) => {
        // console.log("startSetPlayerRollingGame uid = " + uid + " gid " + gid);
        dispatch(startSetPlayerRollingGame({uid: uid, gid: gid}));
    },
    startSetPlayerRollingGameTurn: (uid, gid, tid) => {
        dispatch(startSetPlayerRollingGameTurn({uid: uid, gid: gid, tid: tid}));
    },
    startAddRoll: (roll) => {
        dispatch(startAddRoll(roll));
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(RollList);
