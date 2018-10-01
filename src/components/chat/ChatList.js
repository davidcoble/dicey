import React from 'react';
import { connect } from 'react-redux';
import ChatDetail from './ChatDetail';
import selectChat from '../../selectors/chat';
import {Link} from "react-router-dom";

const ChatList = (props) => (
    <div>
        <Link className="button-round" to="/chat/create">+</Link>
        <b>Chats</b>
        <div>
            {
                props.chats.length === 0 ? (
                    <div>No Chats</div>
                ) : (
                    props.chats.map((chat) => {
                        return <ChatDetail key={chat.id} {...chat} />
                    })
                )
            }
        </div>
    </div>
);
const mapStateToProps = (state) => {
    // console.log("mapStateToProps state.chat = " + JSON.stringify(state));
    // console.log("mapStateToProps filters = " + JSON.stringify(state.filters));
    return {
        chats: selectChat(state.chat, state.filters)
    };
};

export default connect(mapStateToProps)(ChatList);
