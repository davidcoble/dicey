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

        this.state = {
            description: '',
            dice: '',
            sides: '',
            game: props.game ? props.game.name : '',
            turn: props.turn ? props.turn.label : '',
            createdAt: props.roll ? moment(props.roll.createdAt) : moment(),
            createdBy: '',
            error: '',
            uid: props.uid,
            selectedGame: props.rollingGame
        };
    }

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };

    onTurnListChange = (e) => {
        const turnList = e.target.value;
        console.log("new Turn List = " + turnList);
        this.setState(() => ({ turnList}));
    };

    onGameChange = (e) => {
        console.log("game change! e = " + JSON.stringify(e, null, 2));
        //const name = e.target.value;
        this.setState(() => ({ e }));
        this.props.onSelectRollingGame({gid: e.value});
    };

    onSubmit = (e) => {
        e.preventDefault();

        this.setState(() => ({ error: '' }));
        this.props.onSubmit({
            name: this.state.name,
            description: this.state.description,
            turnList: this.state.turnList,
            createdAt: this.state.createdAt.valueOf(),
            createdBy: this.state.createdBy.valueOf()
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
        console.log("render seletectedGame = " + JSON.stringify(selectedGame));
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
                                defaultValue={selectedGame}
                                onChange={this.onGameChange}
                            />
                        </div>
                        <div className="colForm" >
                            <p>Select Turn</p>
                            <Select
                                className='turn-select'
                                options={this.props.turns}
                            />
                        </div>
                    </div>
                    <div className="rowForm" >
                        <div className="colForm" >
                            <p>Description</p>
                            <input
                                type="text"
                                placeholder="Description"
                                autoFocus
                                className="roll-text-input"
                                value={this.state.description}
                                onChange={this.onDescriptionChange}
                            />
                        </div>
                        <div className="colForm" >
                            <p>Dice</p>
                            <input
                                type="text"
                                placeholder="Dice"
                                className="roll-text-input"
                                value={this.state.dice}
                                onChange={this.onDiceChange}
                            />
                        </div>
                        <div className="colForm" >
                            <p>Sides</p>
                            <input
                                type="text"
                                placeholder="Sides"
                                className="roll-text-input"
                                value={this.state.sides}
                                onChange={this.onSidesChange}
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
    let turnList = [];
    let game = state.games.find((g) => {
        return g.id === player.rollingGame
    });
    console.log("game = " + JSON.stringify(game, null, 2));
    let box = state.boxes.find((b) => {
        return b.id === game.box.value;
    });
    box.turnList.split("\n").map((t) => {
        turnList.push({value: t, label: t});
    });
    return {
        games: selectPlayerGames(state.games, player.games),
        turns: turnList,
        gameValue: game.id,
        gameLabel: game.name
    };
};

export default connect(mapStateToProps)(RollForm);
