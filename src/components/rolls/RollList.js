import React from 'react';
import { connect } from 'react-redux';
import { selectRolls } from '../../selectors/rolls';
import RollDetail from "./RollDetail";
import ReactTooltip from 'react-tooltip'

export class RollList extends React.Component {
    constructor(props) {
        // console.log("RollList props.showDeleted = " + JSON.stringify(props.showDeleted, null, 2));
        super(props);
        this.state = {
            ...props
        }
    }
    render() {
        // console.log("RollList ShowDeleted= " + this.props.showDeleted)
        return (
            <div>
                <b>Rolls</b>
                <div className='colForm'>
                    <div className='rowForm'>
                        <ReactTooltip id='timestamp'>
                            <span>The time the die/dice was/were rolled.</span>
                        </ReactTooltip>
                        <div className='colForm-time'><a data-tip data-for='timestamp'>timestamp</a></div>
                        <ReactTooltip id='player'>
                            <span>The player who requested the roll.</span>
                        </ReactTooltip>
                        <div className='colForm-name'><a data-tip data-for='player'>player</a></div>
                        <ReactTooltip id='turn'>
                            <span>The turn in the game for which it/they was/were requested.</span>
                        </ReactTooltip>
                        <div className='colForm-turn'><a data-tip data-for='turn'>turn</a></div>
                        <ReactTooltip id='description'>
                            <span>A brief description of the event that required the roll.</span>
                        </ReactTooltip>
                        <div className='colForm-descr'><a data-tip data-for='description'>description</a></div>
                        <ReactTooltip id='dice'>
                            <span>The number of dice to roll (default = 1).</span>
                        </ReactTooltip>
                        <div className='colForm-dice'><a data-tip data-for='dice'>dice</a></div>
                        <ReactTooltip id='sides'>
                            <span>The number of sides each die should have (default defined in game box).</span>
                        </ReactTooltip>
                        <div className='colForm-sides'><a data-tip data-for='sides'>sides</a></div>
                        <ReactTooltip id='mod'>
                            <span>A modifier to be applied to the sum of the dice rolled.</span>
                        </ReactTooltip>
                        <div className='colForm-mods'><a data-tip data-for='mod'>mod</a></div>
                        <ReactTooltip id='result'>
                            <span>The result of the roll, with modifier explicitly applied.</span>
                        </ReactTooltip>
                        <div className='colForm-result'><a data-tip data-for='result'>result</a></div>
                        <ReactTooltip id='epilogue'>
                            <span>A text box to explain the meaning of the result.</span>
                        </ReactTooltip>
                        <div className='colForm-epilogue'><a data-tip data-for='epilogue'>epilogue</a></div>
                        <ReactTooltip id='delete'>
                            <span>
                                Click "delete" button to request deletion.  All players must request deletion.<br/>
                                Warning!  If you are the last player to request deletion, it will take effect immediately.<br/>
                                You have been warned.<br/>
                                Click "retain" to rescind your request to delete.
                            </span>
                        </ReactTooltip>
                        <div className='colForm-delete'><a data-tip data-for='delete'>delete</a></div>
                    </div>
                    {
                        this.props.rolls.map((roll) => {
                            // console.log("RollList about to render roll.  showDeleted = " + this.props.showDeleted);
                            return <RollDetail showDeleted={this.props.showDeleted} key={roll.id} {...roll}/>
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
        roll_turn: player.games[gid] === undefined ? '' : player.games[gid].turn,
        showDeleted: props.showDeleted,
    };
};
const mapDispatchToProps = (dispatch, props) => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(RollList);
