import React from 'react';
import { connect } from 'react-redux';
import GamePlayerDetail from './GamePlayerDetail';
import { selectGamePlayers } from '../../selectors/players';

const GamePlayerList = (props) => {
    //console.log("GamePlayerList props = " + JSON.stringify(props, null, 2));
    const uid = props.uid;
    return (
        <div>
            <div className='colForm'>
                {
                    props.players.length === 0 ? (
                        <div>No Players</div>
                    ) : (
                        props.players.map((player) => {
                            return (
                                <GamePlayerDetail key={player.uid} {...player} />
                            );
                        })
                    )
                }
            </div>
        </div>
    );
}
const mapStateToProps = (state, props) => {

        console.log("GamePlayerList mapStateToProps state = " + JSON.stringify(state, null, 2));
        console.log("GamePlayerList mapStateToProps props = " + JSON.stringify(props, null, 2));
    let playerList = selectGamePlayers(state.players, props.players); 
    console.log("playerList = " + JSON.stringify(playerList, null, 2));
    return {
        players: playerList
    };
};

export default connect(mapStateToProps)(GamePlayerList);
