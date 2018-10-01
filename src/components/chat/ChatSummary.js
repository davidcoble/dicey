import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import selectChat from '../../selectors/chat';

export const ChatSummary = ({ chatCount, chatsTotal }) => {
    return (
        <div className="page-header">
            <div className="page-header__actions">
                <Link className="button" to="/chat/create">Add Chat</Link>
            </div>
            <div className="content-container">
                <h1 className="page-header__title">Chat</h1>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const visibleChats = selectChat(state.chats, state.filters);

    return {
        chatCount: visibleChats.length,
    };
};

export default connect(mapStateToProps)(ChatSummary);
