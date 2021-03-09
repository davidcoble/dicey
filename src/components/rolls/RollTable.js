import React from 'react';
import {connect} from 'react-redux';
import {selectRolls} from '../../selectors/rolls';
import RollRow from "./RollRow";
import {startSetSortCol, startSetSortDir, startSetPrevSortDir, startSetPrevSortCol} from '../../actions/players';
import RollTablePager from "./RollTablePager";
import ReactTooltip from 'react-tooltip'
import LoadingOverlay from 'react-loading-overlay';

export class RollTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
    }

    sortImgForColumn = (colName) => {
        if (colName !== this.props.sortCol && colName !== this.props.prevSortCol) {
            return '/images/no-sort.png';
        }
        let dirTxt = this.props.sortDir === 1 ? "/images/up" : "/images/down";
        let xdirTxt = this.props.prevSortDir === 1 ? "/images/up" : "/images/down";
        if (colName === this.props.sortCol) {
            return dirTxt.concat("1.png");
        }
        if (colName === this.props.prevSortCol) {
            return xdirTxt.concat("2.png");
        }
    }
    setSortBy = (colName) => {
        console.log("colName = " + colName);

        let newDir;
        // console.log("this.props.sortDir = " + this.props.sortDir);
        if (this.props.sortDir !== undefined && this.props.sortDir !== "") {
            newDir = this.props.sortDir * -1;
        } else {
            newDir = 1;
        }
        // console.log("newDir = " + newDir);
        if (colName === this.props.sortCol) {
            console.log("colName1 = " + colName);
            this.props.startSetSortCol(this.props.uid, this.props.gid, colName);
            this.props.startSetSortDir(this.props.uid, this.props.gid, newDir);
        } else {
            // console.log("colName2 = " + colName);
            // this.props.startSetPrevSortCol(this.props.uid, this.props.gid,
            //     this.props.sortCol === undefined ? 'createdAt' : this.props.sortCol);
            // this.props.startSetPrevSortDir(this.props.uid, this.props.gid,
            //     this.props.sortDir === undefined ? 1 : this.props.sortDir);
            this.props.startSetSortCol(this.props.uid, this.props.gid, colName);
            this.props.startSetSortDir(this.props.uid, this.props.gid, newDir);
        }
    }

    render() {
        console.log("RollTable with two Tooltips");
        return (
            <div className='rollTable__div_body'>
                <div>
                    <div className='banner banner--lefthalf'>
                        Rolls
                    </div>
                    <div className='banner banner--righthalf'>
                    {/*    <RollTablePager/>*/}
                    </div>
                </div>
                <table className="rollTable">
                    <thead>
                    <tr>
                        <th className="rollTable__th__left rollTable__timestamp__header">
                            <ReactTooltip id='timestamp'>
                                <span>The time the die/dice was/were rolled.</span>
                            </ReactTooltip>
                            <p className="button--tight button--bold" data-tip data-for='timestamp'>timestamp</p>
                        </th>
                        <th className="rollTable__th__left rollTable__player__header">
                            <ReactTooltip id='player'>
                                <span>The player who requested the roll.</span>
                            </ReactTooltip>
                            <p className="button--tight button--bold" data-tip data-for='player'>player</p>
                        </th>
                        <th className="rollTable__th__left rollTable__turn__header">
                            <ReactTooltip id='turn'>
                                <span>The turn in the game for which it/they was/were requested.</span>
                            </ReactTooltip>
                            <p data-tip data-for='turn'>turn</p>
                        </th>
                        <th className="rollTable__th__left rollTable__description__header">
                            <ReactTooltip id='description'>
                                <span>A brief description of the event that required the roll.</span>
                            </ReactTooltip>
                            <p className="button--tight button--bold" data-tip data-for='description'>description</p>
                        </th>
                        <th className="rollTable__th__center rollTable__dice__header">
                            <ReactTooltip id='dice'>
                                <span>The number of dice to roll (default = 1).</span>
                            </ReactTooltip>
                            <p className="button--tight button--bold" data-tip data-for='dice'>dice</p>
                        </th>
                        <th className="rollTable__th__center rollTable__sides__header">
                            <ReactTooltip id='sides'>
                                <span>The number of sides each die should have (default defined in game box).</span>
                            </ReactTooltip>
                            <p className="button--tight button--bold"  data-tip data-for='sides'>sides</p>
                        </th>
                        <th className="rollTable__th__center rollTable__mod__header">
                            <ReactTooltip id='mod'>
                                <span>A modifier to be applied to the sum of the dice rolled.</span>
                            </ReactTooltip>
                            <p className="button--tight button--bold" data-tip data-for='mod'>mod</p>
                        </th>
                        <th className="rollTable__th__right rollTable__result__header">
                            <ReactTooltip id='result'>
                                <span>The result of the roll, with modifier explicitly applied.</span>
                            </ReactTooltip>
                            <p className="button--tight button--bold" data-tip data-for='result'>result</p>
                        </th>
                        <th className="rollTable__th__left rollTable__epilogue__header">
                            <ReactTooltip id='epilogue'>
                                <span>A text box to explain the meaning of the result.  The text is
                                    updated in real time for anyone viewing the roll page of this game.</span>
                            </ReactTooltip>
                            <p className="button--tight button--bold" data-tip data-for='epilogue'>epilogue</p>
                        </th>
{/*
                        <th className="rollTable__th__left">
                            <img className="img--sort" src={this.sortImgForColumn('delete')}/>
                            <button className="button--tight button--bold"
                                    onClick={() => this.setSortBy('delete')}>delete
                            </button>
                            <img className="img--sort" src={this.sortImgForColumn('delete')}/>
                        </th>
*/}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.rolls.map((roll) => {
                            //console.log("Calling RollRow with roll = " + JSON.stringify(roll, null, 2));
                            return <RollRow key={roll.id} {...roll} />
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    // console.log("mapStateToProps props = " + JSON.stringify(props, null, 2));
    let player = state.players.find((p) => {
        return p.uid === state.auth.uid
    });
    //console.log("player = " + JSON.stringify(player, null, 2));
    let gid = player.rollingGame;
    let game = state.games.filter((g) => g.id === gid)[0];
    // console.log("RollTable.mapStateToProps state = " + JSON.stringify(state, null, 2));
    return {
        rolls: selectRolls(state.rolls, gid, player), //player.sortCol, player.sortDir, player.prevSortCol, player.prevSortDir),
        gid: gid,
        uid: state.auth.uid,
        games: state.games,
        roll_game: game,
        roll_turn: player.games[gid] === undefined ? '' : player.games[gid].turn,
        sortCol: player.games[gid].sortCol,
        sortDir: player.games[gid].sortDir,
        prevSortCol: player.games[gid].prevSortCol,
        prevSortDir: player.games[gid].prevSortDir,
    }
};
const mapDispatchToProps = (dispatch, props) => ({
    startSetSortCol: (uid, gid, sortCol) => dispatch(startSetSortCol(uid, gid, sortCol)),
    startSetSortDir: (uid, gid, sortDir) => dispatch(startSetSortDir(uid, gid, sortDir)),
    startSetPrevSortCol: (uid, gid, prevSortCol) => dispatch(startSetPrevSortCol(uid, gid, prevSortCol)),
    startSetPrevSortDir: (uid, gid, prevSortDir) => dispatch(startSetPrevSortDir(uid, gid, prevSortDir))

});
export default connect(mapStateToProps, mapDispatchToProps)(RollTable);
