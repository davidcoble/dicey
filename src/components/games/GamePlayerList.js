import React from 'react';
import { connect } from 'react-redux';
import GamePlayerListEntry from './GamePlayerListEntry';
import { selectGamePlayers } from '../../selectors/players';
import {Link} from "react-router-dom";

const GamePlayerList = (props) => {
    //console.log("GamePlayerList props = " + JSON.stringify(props));
    const uid = props.uid;
    return (
        <div>
            <div>
                {
                    props.players.length === 0 ? (
                        <div>No Players</div>
                    ) : (
                        props.players.map((player) => {
                            return (
                                <GamePlayerListEntry key={player.uid} {...player} />
                            );
                        })
                    )
                }
            </div>
        </div>
    );
}
const mapStateToProps = (state, props) => {
/*
    console.log("GamePlayerList mapStateToProps state = " + JSON.stringify(state, null, 2));
    console.log("GamePlayerList mapStateToProps props = " + JSON.stringify(props, null, 2));
*/
    return {
        players: selectGamePlayers(state.players, props.players)
    };
};

export default connect(mapStateToProps)(GamePlayerList);
