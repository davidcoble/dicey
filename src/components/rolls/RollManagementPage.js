import uuid from 'uuid';
import React from 'react';
import RollTable from './RollTable';
import RollForm from './RollForm';
import EmailClient from "../EmailClient";
import { startAddMsg } from "../../actions/msgs";
import { startSetGameTurn } from '../../actions/games';
import { startSetPlayerRollingGame, startSetPlayerRollingGameTurn, startSetShowDeleted } from '../../actions/players';
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
        //console.log("RollManagementPage props = " + JSON.stringify(props,null,2));
    }
    componentDidMount() {
        let u = uuid();
        // console.log("u = " + u);
        // console.log("componentWillMount props" + JSON.stringify(this.props, null, 2));
        if (this.props.games.length === 0) {
            this.props.startAddMsg({msg: {
                    id: u,
                    type: 'error',
                    page: '/games',
                    text: 'please join a game before you roll'
                }
            });
            this.props.history.push('/games');
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
    onShowDeleted = ({showDeleted} = {}) => {
        console.log("RollManagementPage onShowDeleted = " + showDeleted);
        this.props.startSetShowDeleted(this.props.uid, showDeleted);
    };

    handleSumRequest = (rollRequest) => {
        let rolls = [];
        let rollSum = 0;
        rollSum += parseInt(rollRequest.mods);
        for (let i = 0; i < rollRequest.dice; i++) {
            let j = Math.floor((Math. () * rollRequest.sides) + 1);
            rolls.push(j);
            rollSum += j;
        }
        rollRequest.result = "(" + rolls.join(' + ') + ") " +
            (rollRequest.mods ? "+ (" + rollRequest.mods + ")" : "")
            + " = " + rollSum + "";
        // console.log("RMP rollRequest = " + JSON.stringify(rollRequest, null, 2));
        // console.log("this.props = " + JSON.stringify(this.props, null, 2));
        this.props.startAddRoll(rollRequest);
        let roll_link = "http://dice.coblefriends.com:8080/rolls/" + this.props.gameValue;
        // console.log("roll_link = " + roll_link);
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
            roll_result: rollRequest.result,
            roll_link: roll_link
        };
        console.log("summation emailVars.to_email = >" + JSON.stringify(emailVars.to_email, null, 2 ) + "<");
        if (emailVars.to_email === undefined || emailVars.to_email.length < 1) {
            // console.log("skipping email");
            return;
        }
        // console.log("sending email");
        let emailClient = new EmailClient(emailVars);
        emailClient.sendEmail();
    }

    handleSeriesRequest = (rollRequest) => {
        let numRolls = rollRequest.dice;
        let singleRollRequest = JSON.parse(JSON.stringify(rollRequest));
        console.log("handleSeries numRolls = " + numRolls);
        singleRollRequest.dice = 1;
        for (let i = 0; i < numRolls; i++) {
            singleRollRequest.description = "(" +(i+1) + " of " + numRolls + ") " + rollRequest.description;
            this.handleSumRequest(singleRollRequest);
        }
    }



    onSubmit = (rollRequest) => {
        console.log("[RollManagementPage.onSubmit] rollRequest = " + JSON.stringify(rollRequest, null, 2));
        if (rollRequest.seriesSum === 'sum') {
            this.handleSumRequest(rollRequest);
        } else {
            this.handleSeriesRequest(rollRequest);
        }
    };

    render() {
        return (
            <div>
                <div className='rollTable__div_header'>
                    <RollForm
                        onSelectRollingGame={this.onSelectRollingGame}
                        onSelectRollingGameTurn={this.onSelectRollingGameTurn}
                        onShowDeleted={this.onShowDeleted}
                        onSubmit={this.onSubmit}
                        games={this.props.games}
                        linkedGame={this.props.match.params.gid}
                    />
                </div>
                <RollTable showDeleted={this.props.showDeleted} />
            </div>
        );
    };
};

const mapStateToProps = (state, props) => {
    let player = state.players.find((p) => { return p.uid === state.auth.uid});
    let game = state.games.find((g) => {
        return g.id === player.rollingGame;
    });
    let showDeleted = player.showDeleted == undefined ? false : player.showDeleted;
    //console.log("showDeleted " + showDeleted);
    /*
        console.log("player.rollingGame = " + JSON.stringify(player.rollingGame));
        console.log("state.games = " + JSON.stringify(state.games, null, 2));
        console.log("player.games = " + JSON.stringify(player.games, null, 2));
    */
    return {
        to_email: selectGamePlayersForCC(state.players, game),
        uid: state.auth.uid,
        roll: state.rolls ? state.rolls.find((roll) => roll.id === props.match.params.id) : [],
        gameValue: game === undefined ? '' : game.id,
        gameLabel: game === undefined ? '' : game.name,
        games: Object.keys(player.games).filter((k) => { return player.games[k].in }),
        showDeleted: showDeleted
    };
};

const mapDispatchToProps = (dispatch) => ({
    startSetPlayerRollingGame: (uid, gid) => {
        // console.log("startSetPlayerRollingGame uid = " + uid + " gid " + gid);
        dispatch(startSetPlayerRollingGame({uid: uid, gid: gid}));
    },
    startSetPlayerRollingGameTurn: (uid, gid, tid) => {
        dispatch(startSetPlayerRollingGameTurn({uid: uid, gid: gid, tid: tid}));
        dispatch(startSetGameTurn({gid: gid, tid: tid}));
    },
    startSetShowDeleted: (uid, showDeleted) => {
        dispatch(startSetShowDeleted({uid: uid, showDeleted: showDeleted}));
    },
    startAddRoll: (roll) => {
        dispatch(startAddRoll(roll));
    },
    startAddMsg: (data) => dispatch(startAddMsg(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(RollManagementPage);
