import React from 'react';
import {connect} from 'react-redux';
import GameDetail from './GameDetail';
import { startHideNotPlaying } from '../../actions/players';
import {selectGames} from '../../selectors/games';
import {Link} from "react-router-dom";

class GameList extends React.Component {

    //console.log("GameList props = " + JSON.stringify(props));
    render() {
        const pid = this.props.pid;
        return (
            <div>
                {/*<form>*/}
                {/*    <button type='button' className='button' onClick={this.hideNotPlaying}>Hide Not Playing</button>*/}
                {/*</form>*/}
                <div className='pageTitle'>Games</div>
                <Link className='pageSubtitle' to="/game/create">create game</Link>
                <div>
                    {
                        this.props.games.length === 0 ? (
                            <div>No Games</div>
                        ) : (
                            this.props.games.map((game) => {
                                game.pid = pid;
                                return (
                                    <GameDetail key={game.id} {...game} />
                                );
                            })
                        )
                    }
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        startHideNotPlaying: (data) => dispatch(startHideNotPlaying(data))
    };
};
const mapStateToProps = (state) => {
    // console.log("mapStateToProps state.error = " + JSON.stringify(state.error, null, 2));
    let player = state.players.filter((p) => { return p.pid === state.auth.pid});
    // console.log("mapStateToProps player = " + JSON.stringify(player, null, 2));
    return {
        games: selectGames(state.games, player),
        pid: state.auth.pid,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameList);
