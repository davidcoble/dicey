import React from 'react';
import { connect } from 'react-redux';
import RollForm from './RollForm';
import moment from 'moment';
import { selectRolls, selectGamePlayersForCC } from '../../selectors/rolls';
import { startSetPlayerRollingGame, startSetPlayerRollingGameTurn } from '../../actions/players';
import { startAddRoll } from '../../actions/rolls';
import RollDetail from "./RollDetail";
import EmailClient from "../EmailClient";

export class RollList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
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
        // console.log("rollRequest = " + JSON.stringify(rollRequest, null, 2));
        // console.log("this.props = " + JSON.stringify(this.props, null, 2));
        this.props.startAddRoll(rollRequest);
        let emailVars = {
            to_email: this.state.to_email,
            cc_list: this.state.cc_email,
            roll_time: moment(rollRequest.createdAt).format('MMMM Do, YYYY HH:MM:ss'),
            roll_player: rollRequest.createdBy,
            roll_game: this.state.roll_game.name,
            roll_turn: this.state.roll_turn,
            roll_description: rollRequest.description,
            roll_dice: rollRequest.dice,
            roll_sides: rollRequest.sides,
            roll_mod: rollRequest.mods,
            roll_result: rollRequest.result
        };
/*
    {{to_email}}
    {{cc_list}}
        Time of Roll: {{roll_time}}
        Player Requesting: {{roll_player}}
        Game: {{roll_game}}
        Turn: {{roll_turn}}
        Description: {{roll_description}}
        Number of Dice: {{roll_dice}}
        Number of Sides: {{roll_sides}}
        Modifier: {{roll_mod}}
*/

        let emailClient = new EmailClient(emailVars);
        emailClient.sendEmail();
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
const mapStateToProps = (state, props) => {
    // console.log("mapStateToProps props = " + JSON.stringify(props, null, 2));
    let player = state.players.find((p) => { return p.uid === state.auth.uid });
    // console.log("player = " + JSON.stringify(player));
    let gid = player.rollingGame;
    let game = state.games.filter((g) => g.id == gid)[0];

    return {
        rolls: selectRolls(state.rolls, gid),
        uid: state.auth.uid,
        games: state.games,
        to_email: player.email,
        cc_email: selectGamePlayersForCC(state.players, game, player.uid),
        roll_game: game,
        roll_turn: player.games[gid].turn
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
