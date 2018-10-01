import React from 'react';
import { connect } from 'react-redux';
import GameDetail from './GameDetail';
import selectGames from '../../selectors/games';
import {Link} from "react-router-dom";

const GameList = (props) => {
    //console.log("GameList props = " + JSON.stringify(props));
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
    //console.log("mapStateToProps state = " + JSON.stringify(state));
    return {
        games: selectGames(state.games, state.filters)
    };
};

export default connect(mapStateToProps)(GameList);
