import React from 'react';
import { connect } from 'react-redux';
import RollForm from './RollForm';
import { selectRolls } from '../../selectors/rolls';
import { startAddRoll } from '../../actions/rolls';
import RollDetail from "./RollDetail";

export class RollList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
    }
    render() {
        console.log("XXXXXXXX!");
        return (
            <div>
                <b>Rolls</b>
                <div className='colForm'>
                    <div className='rowForm'>
                        <div className='colForm-time'>timestamp</div>
                        <div className='colForm-name'>player</div>
                        <div className='colForm-turn'>turn</div>
                        <div className='colForm-descr'>description</div>
                        <div className='colForm-dice'>dice</div>
                        <div className='colForm-sides'>sides</div>
                        <div className='colForm-mods'>mod</div>
                        <div className='colForm-result'>result</div>
                        <div className='colForm-epilogue'>epilogue</div>
{/*
                        <div className='colForm-delete'>delete</div>
*/}
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
    console.log("mapStateToProps props = " + JSON.stringify(props, null, 2));
    let player = state.players.find((p) => { return p.uid === state.auth.uid });
    // console.log("player = " + JSON.stringify(player));
    let gid = player.rollingGame;
    let game = state.games.filter((g) => g.id == gid)[0];
    let sortCol = player.sortCol;
    let sortDir = player.sortDir;

    return {
        rolls: selectRolls(state.rolls, gid, sortCol, sortDir),
        uid: state.auth.uid,
        games: state.games,
        roll_game: game,
        roll_turn: player.games[gid] === undefined ? '' : player.games[gid].turn
    };
};
const mapDispatchToProps = (dispatch, props) => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(RollList);
