import React from 'react';
import { connect } from 'react-redux';
import PlayerGameListEntry from './PlayerGameListEntry';
import { selectPlayerGames } from '../../selectors/games';
import {Link} from "react-router-dom";

const PlayerGameList = (props) => {
    //console.log("PlayerGameList props = " + JSON.stringify(props));
    return (
        <div>
            <div>
                {
                    props.games.length === 0 ? (
                        <b>No Games</b>
                    ) : (
                        props.games.map((game) => {
                            return (
                                <PlayerGameListEntry key={game.id} {...game} />
                            );
                        })
                    )
                }
            </div>
        </div>
    );
}
const mapStateToProps = (state, props) => {

    //console.log("PlayerGameList mapStateToProps state = " + JSON.stringify(state, null, 2));
    //console.log("PlayerGameList mapStateToProps props = " + JSON.stringify(props, null, 2));

    return {
        games: selectPlayerGames(state.games, props.games)
    };
};

export default connect(mapStateToProps)(PlayerGameList);
