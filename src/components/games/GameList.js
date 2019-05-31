import React from 'react';
import { connect } from 'react-redux';
import GameDetail from './GameDetail';
import selectGames from '../../selectors/games';
import {Link} from "react-router-dom";

const GameList = (props) => {
    //console.log("GameList props = " + JSON.stringify(props));
    const uid = props.uid;
    return (
        <div>
            <Link className="button-round" to="/game/create">+</Link>
            <b>Games</b>
            <div>
                {
                    props.games.length === 0 ? (
                        <div>No Games</div>
                    ) : (
                        props.games.map((game) => {
                            game.uid = uid;
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
const mapStateToProps = (state) => {
    console.log("mapStateToProps state.error = " + JSON.stringify(state.error, null, 2));
    return {
        games: selectGames(state.games, state.gameFilter),
        uid: state.auth.uid
    };
};

export default connect(mapStateToProps)(GameList);
