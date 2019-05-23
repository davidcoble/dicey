import React from 'react';
import { Link } from 'react-router-dom';
import GamePlayerList from './GamePlayerList';
import GamePlayerListEntry from './GamePlayerListEntry';
const GameDetail = (ref) => {
    //console.log("GameDetail: ref = " + JSON.stringify(ref, null, 4));
    return (
        <div>
            <Link className="button-round" to={`/game/delete/${ref.id}`}>-</Link>
            {
                ref.players !== undefined && ref.players[ref.uid] ? (
                    <Link to={`/game/${ref.id}/player/${ref.uid}/remove`}>Leave</Link>
                ) : (
                    <Link to={`/game/${ref.id}/player/${ref.uid}/add`}>Join</Link>
                )
            }
            &nbsp;
            {
                ref.subscribers !== undefined && ref.subscribers[ref.uid] ? (
                    <Link to={`/game/${ref.id}/subscriber/${ref.uid}/unsubscribe`}>Unsubscribe</Link>
                ) : (
                    <Link to={`/game/${ref.id}/subscriber/${ref.uid}/subscribe`}>Subscribe</Link>
                )
            }
            &nbsp;
            <Link to={`/game/edit/${ref.id}`}>
                <b>{ref.name} ({ref.description}) using {ref.box.label} rules </b>
            </Link>
            <GamePlayerList key={ref.id} {...ref}/>
        </div>
    );
};

export default GameDetail;
