import React from 'react';
import { Link } from 'react-router-dom';
import GamePlayerList from './GamePlayerList';
import GameSubscriberList from './GameSubscriberList';
import GamePlayerListEntry from './GamePlayerListEntry';
const GameDetail = (ref) => {
    // console.log("GameDetail: ref = " + JSON.stringify(ref, null, 4));
    return (
        <div>
            <div className='colList'>
                <div className='rowList'>
                    <div className='colList-med'>
                        <div className='headerList'>Name</div>
                        <i>{ref.name}</i>
                        <Link to={`/game/delete/${ref.id}`}>delete game</Link>
                    </div>
                    <div className='colList-med'>
                        <div className='headerList'>Box</div>
                        <Link to={`/boxes/edit/${ref.box.value}`}>{ref.box.label}</Link>
                    </div>
                    <div className='colList-med'>
                        <div className='headerList'>Description</div>
                        <i>{ref.description}</i>
                        <Link to={`/game/edit/${ref.id}`}>edit game</Link>
                    </div>
                    <div className='colList-name'>
                        <div className='headerList'>Players</div>
                        <GamePlayerList {...ref}/>
                        {
                            ref.players !== undefined && ref.players[ref.uid] ? (
                                <Link to={`/game/${ref.id}/player/${ref.uid}/remove`}>leave</Link>
                            ) : (
                                <Link to={`/game/${ref.id}/player/${ref.uid}/add`}>join</Link>
                            )
                        }
                    </div>
                    <div className='colList-name'>
                        <div className='headerList'>Subscribers</div>
                        <GameSubscriberList {...ref}/>
                        {
                            ref.subscribers !== undefined && ref.subscribers[ref.uid] ? (
                                <Link to={`/game/${ref.id}/subscriber/${ref.uid}/unsubscribe`}>unsubscribe</Link>
                            ) : (
                                <Link to={`/game/${ref.id}/subscriber/${ref.uid}/subscribe`}>subscribe</Link>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameDetail;
