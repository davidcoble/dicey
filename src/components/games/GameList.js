import React from 'react';
import { connect } from 'react-redux';
import GameDetail from './GameDetail';

const GameList = (props) => (
    <div>
        <div>
            <p>List of Games</p>
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
    return {
        games: state.games != undefined ? state.games : []
    };
};

export default connect(mapStateToProps)(GameList);
