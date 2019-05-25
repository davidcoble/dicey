import React from 'react';
import moment from 'moment';
import Select from 'react-select';
import { selectTurns } from '../../selectors/boxes';
import { selectPlayerGames } from '../../selectors/games';
import {connect} from "react-redux";
import {RollList} from "./RollList";

export class RollForm extends React.Component {
    constructor(props) {
        super(props);
        // console.log("RollForm props = " + JSON.stringify(props, null, 2));
        this.state = {
            description: '',
            dice: '',
            sides: '',
            mods: '',
            game: props.game ? props.game.name : '',
            turn: props.turn ? props.turn : '',
            createdAt: props.roll ? moment(props.roll.createdAt) : moment(),
            error: '',
            uid: props.uid,
            selectedGame: props.rollingGame,
            ...props
        };
    }

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };
    onDiceChange = (e) => {
        const dice = e.target.value;
        if(dice.match(/^\d*$/) && dice < 100) {
            this.setState(() => ({dice}));
        }
    };
    onSidesChange = (e) => {
        const sides = e.target.value;
        if(sides.match(/^\d*$/)) {
            this.setState(() => ({sides}));
        }
    };
    onModsChange = (e) => {
        const mods = e.target.value;
        if(mods.match(/^-?\d*$/)) {
            this.setState(() => ({mods}));
        }
    };

    onGameChange = (e) => {
        // console.log("game change! e = " + JSON.stringify(e, null, 2));
        // const name = e.target.value;
        this.state.gid = e.value;
        this.state.gameValue = e.value;
        this.props.onSelectRollingGame({gid: e.value});
    };

    onTurnChange = (e) => {
        // console.log("turn change! e = " + JSON.stringify(e, null, 2));
        // const name = e.target.value;
        this.state.turn = e.label;
        this.props.onSelectRollingGameTurn({gid: this.props.gameValue, tid: e.value});
    };

    onSubmit = (e) => {
        e.preventDefault();
        const createdAt = moment.now();
        // console.log("onSubmit createdAt = " + createdAt);
        // console.log("RollForm.onSubmit state = " + JSON.stringify(this.state, null, 2));
        this.setState(() => ({ error: '' }));
        this.props.onSubmit({
            description: this.state.description,
            dice: this.state.dice ? this.state.dice : 1,
            sides: this.state.sides ? this.state.sides : 1,
            mods: this.state.mods ? this.state.mods : 0,
            gid: this.state.gameValue,
            turn: this.state.turn,
            createdAt: createdAt,
            createdBy: this.props.player.name,
                // ...this.state
        });
    };

    render() {
        let gameNames = [];
        this.props.games.map((game) => {
            gameNames.push({value: game.id, label: game.name});
        });
        const selectedGame = {
            value: this.props.gameValue,
            label: this.props.gameLabel
        };
        const selectedTurn = {
            value: this.props.turn,
            label: this.props.turn
        }
        //console.log("selectedTurn = " + JSON.stringify(selectedTurn));
        //console.log("selectedTurn = " + JSON.stringify(this.state.createdAt, null, 2));
        return (
            <form onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p> || <p>&nbsp;</p>}
                <div className="colForm" >
                    <div className="rowForm" >
                        <div className="colForm" >
                            <p>Select Game</p>
                            <Select
                                className='game-select'
                                options={gameNames}
                                value={selectedGame}
                                onChange={this.onGameChange}
                            />
                        </div>
                        <div className="colForm" >
                            <p>Select Turn</p>
                            <Select
                                className='turn-select'
                                options={this.props.turns}
                                value={selectedTurn}
                                onChange={this.onTurnChange}
                            />
                        </div>
                    </div>
                    <div className="rowForm" >
                        <div className="colForm-descr" >
                            <p>Description</p>
                            <input
                                type="text"
                                placeholder="Description"
                                autoFocus
                                className="roll-text-input-descr"
                                value={this.state.description}
                                onChange={this.onDescriptionChange}
                            />
                        </div>
                        <div className="colForm-other" >
                            <p>Dice</p>
                            <input
                                type="text"
                                placeholder="Dice"
                                className="roll-text-input"
                                value={this.state.dice}
                                onChange={this.onDiceChange}
                            />
                        </div>
                        <div className="colForm-other" >
                            <p>Sides</p>
                            <input
                                type="text"
                                placeholder="Sides"
                                className="roll-text-input"
                                value={this.state.sides}
                                onChange={this.onSidesChange}
                            />
                        </div>
                        <div className="colForm-other" >
                            <p>Mods</p>
                            <input
                                type="text"
                                placeholder="Mods"
                                className="roll-text-input"
                                value={this.state.mods}
                                onChange={this.onModsChange}
                            />
                        </div>
                        <div>
                            <button className="button">Save Roll</button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    let player = state.players.find((p) => { return p.uid === state.auth.uid});
    //console.log("player " + JSON.stringify(player, null, 2));
    let turnList = [];
    let game = state.games.find((g) => {
        return g.id === player.rollingGame
    });
    if (game === undefined) {
        game = {
            box: {
                turnList: ''
            }
        };
    }
    let turn = player.games[game.id] ? player.games[game.id].turn : '';
    let box = state.boxes.find((b) => {
        return b.id === game.box.value;
    });
    if (box === undefined) {
        box = { turnList: '' };
    }
    box.turnList.split("\n").map((t) => {
        turnList.push({value: t, label: t});
    });
    return {
        games: selectPlayerGames(state.games, player.games),
        turns: turnList,
        player: player,
        gameValue: game.id,
        gameLabel: game.name,
        turn: turn
    };
};

export default connect(mapStateToProps)(RollForm);
