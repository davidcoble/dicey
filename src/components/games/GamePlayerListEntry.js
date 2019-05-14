import React from 'react';
import { connect } from 'react-redux';

export const GamePlayerListEntry = ({player}) => {
    //console.log("GamePlayerListEntry: player = " + JSON.stringify(player, null, 4));
    return (
        <b>{player.name} </b>
    );
};

const mapStateToProps = (state, props) => {
    //console.log("GamePlayerListEntry props = " + JSON.stringify(props, 0, 2))
    return {
        player: { name: props.name }
    }
};

export default connect(mapStateToProps, undefined)(GamePlayerListEntry);
