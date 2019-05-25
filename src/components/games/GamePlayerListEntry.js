import React from 'react';
import { connect } from 'react-redux';

export const GamePlayerListEntry = ({player}) => {
    //console.log("PlayerGameListEntry: player = " + JSON.stringify(player, null, 4));
    return (
        <i>{player.name} </i>
    );
};

const mapStateToProps = (state, props) => {
    //console.log("PlayerGameListEntry props = " + JSON.stringify(props, 0, 2))
    return {
        player: { name: props.name }
    }
};

export default connect(mapStateToProps, undefined)(GamePlayerListEntry);
