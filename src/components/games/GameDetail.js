import React from 'react';
import { Link } from 'react-router-dom';
import GamePlayerList from './GamePlayerList';
import GamePlayerListEntry from './GamePlayerListEntry';
const GameDetail = (arg) => {
    //console.log("GameDetail: arg = " + JSON.stringify(arg, null, 4));
    const ref = arg.props;
    const uid = ref.uid;
    //console.log("GameDetail: uid = " + uid);
    return (
        <div>
            {
                ref.players !== undefined && ref.players[uid] ? (
                    <Link to={`/game/${ref.id}/player/${ref.uid}/remove`}>Leave</Link>
                ) : (
                    <Link to={`/game/${ref.id}/player/${ref.uid}/add`}>Join</Link>
                )
            }

            <Link className="button-round" to={`/game/delete/${ref.id}`}>-</Link>
            <Link to={`/game/edit/${ref.id}`}>
                <b>{ref.name} ({ref.description}) updated by {ref.createdBy} </b>
            </Link>
            <GamePlayerList key={ref.id} {...ref}/>
        </div>
    );
};

export default GameDetail;
