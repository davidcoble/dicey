import React from 'react';
import { Link } from 'react-router-dom';
import GamePlayerList from './GamePlayerList';
import GameSubscriberList from './GameSubscriberList';
import GamePlayerListEntry from './GamePlayerListEntry';
const GamePlayerDetail = (ref) => {
    // console.log("GamePlayerDetail: ref = " + JSON.stringify(ref, null, 4));
    return (
        <p>
            <b>
                {ref.name}
            </b>
        </p>
    );
};

export default GamePlayerDetail;
