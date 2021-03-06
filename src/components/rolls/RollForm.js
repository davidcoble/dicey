import React from 'react';
import moment from 'moment';
import Select from 'react-select';
import { selectPlayerGames } from '../../selectors/games';
import {connect} from "react-redux";
import GameSubscriberList from "../games/GameSubscriberList";
import GamePlayerList from "../games/GamePlayerList";
import { selectTurns } from '../../selectors/boxes';
import { selectGamePlayersForCC } from '../../selectors/rolls';
import {RollList} from "./RollList";

export class RollForm extends React.Component {
    constructor(props) {
        super(props);
        // console.log("RollForm props.turn = " + JSON.stringify(props.turn, null, 2));
        this.state = {
            description: '',
            dice: '',
            sides: props.sides ? props.sides : '',
            mods: '',
            game: props.game ? props.game.name : '',
            turn: props.turn ? props.turn : '',
            createdAt: props.roll ? moment(props.roll.createdAt) : moment(),
            error: '',
            uid: props.uid,
            selectedGame: props.rollingGame,
            ...props
        };
        //console.log("RollForm this.state = " + JSON.stringify(this.state, null, 2));
    }

    onDescriptionChange = (e) => {
        e.preventDefault();
        const description = e.target.value;
        this.setState(() => ({ description }));
    };
    onDiceChange = (e) => {
        e.preventDefault();
        const dice = e.target.value;
        if(dice.match(/^\d*$/) && dice < 100) {
            this.setState(() => ({dice}));
        }
    };
    onSidesChange = (e) => {
        e.preventDefault();
        const sides = e.target.value;
        if(sides.match(/^\d*$/)) {
            this.setState(() => ({sides}));
        }
    };
    onModsChange = (e) => {
        e.preventDefault();
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

    previousTurn = (event) => {
        event.preventDefault();
        console.log("event.value = " + event.value)
        if(this.props.turn === '' || this.props.turn === undefined) {
            return;
        }
        let newTurnIndex = this.props.turns.findIndex(
            (e) => {
                return e.value === this.props.turn;
            });
        if (--newTurnIndex > this.props.turns.length || newTurnIndex < 0) {
            return;
        }
        let newTurn = this.props.turns[newTurnIndex].value;
        console.log("1. previo usTurn called newTurn = " + JSON.stringify(newTurn, null, 2));
        this.props.onSelectRollingGameTurn({gid: this.props.gameValue, tid: newTurn});
    };

    nextTurn = (event) => {
        event.preventDefault();
        if(this.props.turn === '' || this.props.turn === undefined) {
            return;
        }
        let newTurnIndex = this.props.turns.findIndex(
            (e) => {
                return e.value === this.props.turn;
            });

        if (++newTurnIndex >= this.props.turns.length || newTurnIndex < 0) {
            return;
        }
        let newTurn = this.props.turns[newTurnIndex].value;
        this.props.onSelectRollingGameTurn({gid: this.props.gameValue, tid: newTurn});

    };




    onSubmit = (e) => {
        e.preventDefault();
        const createdAt = moment.now();
        // console.log("onSubmit createdAt = " + createdAt);
        // console.log("RollForm.onSubmit state = " + JSON.stringify(this.state, null, 2));
        // console.log("RollForm.onSubmit this.state.turn = " + this.state.turn);
        // console.log("RollForm.onSubmit this.props.turn = " + this.props.turn);
        this.setState(() => ({ error: '' }));
        this.props.onSubmit({
            description: this.state.description,
            dice: this.state.dice ? this.state.dice : 1,
            sides: this.state.sides ? this.state.sides : 1,
            mods: this.state.mods ? this.state.mods : 0,
            gid: this.props.gameValue,
            turn: this.props.turn,
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
        let gameTurns = [];
        this.props.turns.map((turn) => {
            gameTurns.push({value: turn.value, label: turn.label});
        })
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
        // console.log("gameNames = " + JSON.stringify(gameNames, null, 2));
        // console.log("gameTurns = " + JSON.stringify(gameTurns, null, 2));
        // console.log("selectedTurn = " + JSON.stringify(selectedTurn));
        // console.log("selectedGame = " + JSON.stringify(selectedGame));
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    {this.state.error && <p className="form__error">{this.state.error}</p> || <p>&nbsp;</p>}
                    <div className="rowForm" >
                        <div className="colForm" >
                            <div className="rowForm" >
                                <div className="colForm" >
                                    <p>Select Game</p>

                                    <Select
                                        className='game-select'
                                        options={gameNames}
                                        value={selectedGame}
                                        defaultValue={selectedGame}
                                        onChange={this.onGameChange}
                                    />

                                </div>
                                <div className="colForm" >
                                    <p>
                                        <button onClick={this.previousTurn}>-</button>
                                        Select Turn
                                        <button onClick={this.nextTurn}>+</button>
                                    </p>
                                    <Select
                                        className='turn-select'
                                        options={gameTurns}
                                        value={selectedTurn}
                                        defaultValue={selectedTurn}
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
                                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
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
                                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                        onChange={this.onDiceChange}
                                    />
                                </div>
                                <div className="colForm-form-sides" >
                                    <p>Sides</p>
                                    <input
                                        type="text"
                                        placeholder="Sides"
                                        className="roll-text-input"
                                        value={this.state.sides}
                                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
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
                                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                        onChange={this.onModsChange}
                                    />
                                </div>
                                <div className="colForm-other" >
                                    <p>&nbsp;</p>
                                    <button>Roll</button>
                                </div>
                            </div>
                        </div>
                        <div className="colForm-descr" >
                            <b></b>
                        </div>
                        <div className="colForm-descr" >
                            <b className='headerList'>players</b>
                            <GamePlayerList {...this.props.game}/>
                        </div>
                        <div className="colForm-descr" >
                            <b className='headerList'>email recipients</b>
                            <GameSubscriberList uid={this.props.player.uid} {...this.props.game}/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let player = state.players.find((p) => { return p.uid === state.auth.uid});
    let rollingGame = player.rollingGame;
    // console.log("player.rollingGame " + JSON.stringify(player.rollingGame, null, 2));
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
    let turn = game.turn;
    let box = state.boxes.find((b) => {
        return b.id === game.box.value;
    });
    if (box === undefined) {
        box = {};
    }
    let sides = box.sides;
    if (box.turnList === undefined) {
        box.turnList = "turns aren't named";
        turn = "turns aren't named";
    }
    box.turnList.split("\n").map((t) => {
        turnList.push({value: t, label: t});
    });

    return {
        game: game,
        games: selectPlayerGames(state.games, player.games),
        turns: turnList,
        sides: sides,
        player: player,
        gameValue: game.id,
        gameLabel: game.name,
        turn: turn,
        // sides: box.sides ? box.sides : '',
    };
};

export default connect(mapStateToProps)(RollForm);
