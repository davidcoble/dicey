import React from 'react';
import {connect} from 'react-redux';
import {selectRolls} from '../../selectors/rolls';
import RollRow from "./RollRow";
import {startSetSortCol, startSetSortDir, startSetPrevSortDir, startSetPrevSortCol} from '../../actions/players';
import RollTablePager from "./RollTablePager";

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
            console.log("colName2 = " + colName);
            this.props.startSetPrevSortCol(this.props.uid, this.props.gid,
                this.props.sortCol === undefined ? 'createdAt' : this.props.sortCol);
            this.props.startSetPrevSortDir(this.props.uid, this.props.gid,
                this.props.sortDir === undefined ? 1 : this.props.sortDir);
            this.props.startSetSortCol(this.props.uid, this.props.gid, colName);
            this.props.startSetSortDir(this.props.uid, this.props.gid, newDir);
        }
    }

    render() {
        return (
            <div>
                <div>
                    <div className='banner banner--lefthalf'>
                        Rolls
                    </div>
                    <div className='banner banner--righthalf'>
                        <RollTablePager/>
                    </div>
                </div>
                <table className="rollTable">
                    <thead>
                    <tr>
                        <th className="rollTable__th__left">
                            <img className="img--sort" src={this.sortImgForColumn('createdAt')}/>
                            <button className="button--tight button--bold"
                                    onClick={() => this.setSortBy('createdAt')}>timestamp
                            </button>
                            <img className="img--sort" src={this.sortImgForColumn('createdAt')}/>
                        </th>
                        <th className="rollTable__th__left">
                            <img className="img--sort" src={this.sortImgForColumn('player')}/>
                            <button className="button--tight button--bold"
                                    onClick={() => this.setSortBy('player')}>player
                            </button>
                            <img className="img--sort" src={this.sortImgForColumn('player')}/>
                        </th>
                        <th className="rollTable__th__left">
                            <img className="img--sort" src={this.sortImgForColumn('turn')}/>
                            <button className="button--tight button--bold"
                                    onClick={() => this.setSortBy('turn')}>turn
                            </button>
                            <img className="img--sort" src={this.sortImgForColumn('turn')}/>
                        </th>
                        <th className="rollTable__th__left">
                            <img className="img--sort" src={this.sortImgForColumn('description')}/>
                            <button className="button--tight button--bold"
                                    onClick={() => this.setSortBy('description')}>description
                            </button>
                            <img className="img--sort" src={this.sortImgForColumn('description')}/>
                        </th>
                        <th className="rollTable__th__left">
                            <img className="img--sort" src={this.sortImgForColumn('dice')}/>
                            <button className="button--tight button--bold"
                                    onClick={() => this.setSortBy('dice')}>dice
                            </button>
                            <img className="img--sort" src={this.sortImgForColumn('dice')}/>
                        </th>
                        <th className="rollTable__th__left">
                            <img className="img--sort" src={this.sortImgForColumn('sides')}/>
                            <button className="button--tight button--bold"
                                    onClick={() => this.setSortBy('sides')}>sides
                            </button>
                            <img className="img--sort" src={this.sortImgForColumn('sides')}/>
                        </th>
                        <th className="rollTable__th__left">
                            <img className="img--sort" src={this.sortImgForColumn('mod')}/>
                            <button className="button--tight button--bold"
                                    onClick={() => this.setSortBy('mod')}>mod
                            </button>
                            <img className="img--sort" src={this.sortImgForColumn('mod')}/>
                        </th>
                        <th className="rollTable__th__left">
                            <img className="img--sort" src={this.sortImgForColumn('result')}/>
                            <button className="button--tight button--bold"
                                    onClick={() => this.setSortBy('result')}>result
                            </button>
                            <img className="img--sort" src={this.sortImgForColumn('result')}/>
                        </th>
                        <th className="rollTable__th__left">
                            <img className="img--sort" src={this.sortImgForColumn('epilogue')}/>
                            <button className="button--tight button--bold"
                                    onClick={() => this.setSortBy('epilogue')}>epilogue
                            </button>
                            <img className="img--sort" src={this.sortImgForColumn('epilogue')}/>
                        </th>
                        <th className="rollTable__th__left">
                            <img className="img--sort" src={this.sortImgForColumn('delete')}/>
                            <button className="button--tight button--bold"
                                    onClick={() => this.setSortBy('delete')}>delete
                            </button>
                            <img className="img--sort" src={this.sortImgForColumn('delete')}/>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.rolls.map((roll) => {
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
    // console.log("player = " + JSON.stringify(player, null, 2));
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
