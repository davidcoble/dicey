import React from 'react';
import { connect } from 'react-redux';
import ChannelForm from './ChannelForm';
import { startEditChannel, startRemoveChannel } from '../../actions/channel';
import ChannelList from "./ChannelList";
import ChatList from "../chat/ChatList";

export class ChannelViewPage extends React.Component {
    onSubmit = (channel) => {
        this.props.startEditChannel(this.props.channel.id, channel);
        this.props.history.push('/channels');
    };
    onRemove = () => {
        this.props.startRemoveChannel({ id: this.props.channel.id });
        this.props.history.push('/channels');
    };
    render() {
        return (
            <div>
                <div className='leftSelect'>
                    channellist
                    <ChannelList />
                </div>
                <div className='chatDiv'>
                    <ChatList />
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state, props) => {
    console.log("ChannelEditPage mapStateToProps state = " + JSON.stringify(state));
    return ({
        channel: state.channels.find((channel) => channel.id === props.match.params.id)
    });
};

const mapDispatchToProps = (dispatch, props) => ({
    startEditChannel: (id, channel) => dispatch(startEditChannel(id, channel)),
    startRemoveChannel: (data) => dispatch(startRemoveChannel(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelViewPage);
