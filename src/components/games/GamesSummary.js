import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import selectGames from '../../selectors/games';
import selectGamesTotal from '../../selectors/games-total';

export const GamesSummary = ({ gameCount, gamesTotal }) => {
    const gameWord = gameCount === 1 ? 'game' : 'games';
    const formattedGamesTotal = numeral(gamesTotal / 100).format('$0,0.00');

    return (
        <div className="page-header">
            <div className="page-header__actions">
                <Link className="button" to="/game/create">Add Game</Link>
            </div>
            <div className="content-container">
                <h1 className="page-header__title">Games</h1>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const visibleGames = selectGames(state.games, state.filters);

    return {
        gameCount: visibleGames.length,
        gamesTotal: selectGamesTotal(visibleGames)
    };
};

export default connect(mapStateToProps)(GamesSummary);
