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
        return (
            <div>
                <b>Rolls</b>
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
        roll_game: game,
        roll_turn: player.games[gid] === undefined ? '' : player.games[gid].turn
    };
};
const mapDispatchToProps = (dispatch, props) => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(RollList);
