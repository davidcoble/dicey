import React from 'react';
import RollList from './RollList';
import RollForm from './RollForm';
import EmailClient from "../EmailClient";
import { startSetPlayerRollingGame, startSetPlayerRollingGameTurn } from '../../actions/players';
import { startAddRoll } from "../../actions/rolls";
import { selectGamePlayersForCC } from '../../selectors/rolls';
import {connect} from "react-redux";
import moment from 'moment';

export class RollManagementPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
    }
    onSelectRollingGame = ({gid} = {}) => {
        // console.log("gid = " + gid);
        let uid = this.props.uid;
        // console.log("uid = " + uid);
        this.props.startSetPlayerRollingGame(this.props.uid, gid);
    };
    onSelectRollingGameTurn = ({gid, tid} = {}) => {
        this.props.startSetPlayerRollingGameTurn(this.props.uid, gid, tid);
    };
    onSubmit = (rollRequest) => {
        // console.log("[RollManagementPage.onSubmit] rollRequest = " + JSON.stringify(rollRequest, null, 2));
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
        // console.log("RMP rollRequest = " + JSON.stringify(rollRequest, null, 2));
        // console.log("this.props = " + JSON.stringify(this.props, null, 2));
        this.props.startAddRoll(rollRequest);
        let emailVars = {
            to_email: this.state.to_email,
            roll_time: moment(rollRequest.createdAt).format('MMMM Do, YYYY HH:MM:ss'),
            roll_player: rollRequest.createdBy,
            roll_game: this.props.gameLabel,
            roll_turn: rollRequest.turn,
            roll_description: rollRequest.description,
            roll_dice: rollRequest.dice,
            roll_sides: rollRequest.sides,
            roll_mod: rollRequest.mods,
            roll_result: rollRequest.result
        };
        // console.log("emailVars.to_email = >" + JSON.stringify(emailVars.to_email, null, 2 ) + "<");
        if (emailVars.to_email === undefined || emailVars.to_email.length < 1) {
            // console.log("skipping email");
            return;
        }
        // console.log("sending email");
        let emailClient = new EmailClient(emailVars);
        emailClient.sendEmail();
    };

    render() {
        return (
            <div>
                <div>
                    <RollForm
                        onSelectRollingGame={this.onSelectRollingGame}
                        onSelectRollingGameTurn={this.onSelectRollingGameTurn}
                        onSubmit={this.onSubmit}
                        games={this.props.games}
                    />
                </div>
                <RollList />
            </div>
        );
    };
};

const mapStateToProps = (state, props) => {
    let player = state.players.find((p) => { return p.uid === state.auth.uid});
    let game = state.games.find((g) => {
        return g.id === player.rollingGame;
    });
/*
    console.log("player.rollingGame = " + JSON.stringify(player.rollingGame));
    console.log("state.games = " + JSON.stringify(state.games, null, 2));
*/
    return {
        to_email: selectGamePlayersForCC(state.players, game),
        uid: state.auth.uid,
        roll: state.rolls ? state.rolls.find((roll) => roll.id === props.match.params.id) : [],
        gameValue: game.id,
        gameLabel: game.name,
    };
};

const mapDispatchToProps = (dispatch) => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(RollManagementPage);
