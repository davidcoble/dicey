import React from 'react';
import { connect } from 'react-redux';

export const PlayerGameListEntry = ({game}) => {
    //console.log("PlayerGameListEntry: game = " + JSON.stringify(game, null, 4));
    return (
        <p>{game.name} -- {game.description} </p>
    );
};

const mapStateToProps = (state, props) => {
    console.log("PlayerGameListEntry props = " + JSON.stringify(props, 0, 2))
    return {
        game: { name: props.name, description: props.description }
    }
};

export default connect(mapStateToProps, undefined)(PlayerGameListEntry);
