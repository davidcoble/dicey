import React from 'react';
import { connect } from 'react-redux';
import RollForm from './RollForm';
import { selectRolls } from '../../selectors/rolls';
import { startSetPlayerRollingGame } from '../../actions/players';

export class RollList extends React.Component {
    onSelectRollingGame = ({gid} = {}) => {
        // console.log("gid = " + gid);
        this.props.startSetPlayerRollingGame(this.props.uid, gid);
    };
    render() {
        return (
            <div>
                <b>Rolls</b>
                <div>
                    <RollForm onSelectRollingGame={this.onSelectRollingGame} games={this.props.games} />
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    // console.log("mapStateToProps state = " + JSON.stringify(state, null, 2));
    return {
        rolls: selectRolls(state.rolls),
        uid: state.auth.uid,
        games: state.games
    };
};
const mapDispatchToProps = (dispatch, props) => ({
    startSetPlayerRollingGame: (uid, gid) => {
        // console.log("startSetPlayerRollingGame uid = " + uid + " gid " + gid);
        dispatch(startSetPlayerRollingGame({uid: uid, gid: gid}));
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(RollList);
