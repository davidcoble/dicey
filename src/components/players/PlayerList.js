import React from 'react';
import { connect } from 'react-redux';
import PlayerDetail from './PlayerDetail';

const PlayerList = (props) => (
    <div>
        <div>
            <p>List of Players</p>
        </div>
        <div>
            {
                props.players.length === 0 ? (
                    <div>No Players</div>
                ) : (
                    props.players.map((player) => {
                        return <PlayerDetail key={player.id} {...player} />
                    })
                )
            }
            <pre className='small'>{JSON.stringify(props.state, null, 2)}</pre>
        </div>
    </div>
);
const mapStateToProps = (state) => {
    return {
        state: state,
        players: state.players !== undefined ? state.players: [],
    };
};

export default connect(mapStateToProps)(PlayerList);
