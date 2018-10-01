import React from 'react';
import { Link } from 'react-router-dom';

const ChatDetail = (chat) => {
    //console.log("ChatDetail: chat = " + JSON.stringify(chat, null, 4));
    return (
        <div>
            <Link className="button-round" to={`/chat/delete/${chat.id}`}>-</Link>
            <Link to={`/chat/edit/${chat.id}`}>
                <b>{chat.name} ({chat.description})</b>
            </Link>
        </div>
    );
};

export default ChatDetail;
