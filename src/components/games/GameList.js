import React from 'react';
import { connect } from 'react-redux';
import GameDetail from './GameDetail';
import selectGames from '../../selectors/games';

const GameList = (props) => (
    <div>
        <div>
            <p >List of Games</p>
        </div>
        <div>
            {
                props.games.length === 0 ? (
                    <div>No Games</div>
                ) : (
                    props.games.map((game) => {
                        return <GameDetail key={game.uid} {...game} />
                    })
                )
            }
        </div>
    </div>
);
const mapStateToProps = (state) => {
    //console.log("mapStateToProps state = " + JSON.stringify(state));
    return {
        games: selectGames(state.games, state.filters)
    };
};

export default connect(mapStateToProps)(GameList);
