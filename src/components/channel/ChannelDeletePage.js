import React from 'react';
import { connect } from 'react-redux';
import ChannelForm from './ChannelForm';
import { startEditChannel, startRemoveChannel } from '../../actions/channel';

export class ChannelDeletePage extends React.Component {
    componentWillMount() {
        this.props.startRemoveChannel({ id: this.props.channel.id });
        this.props.history.push('/channels');
    }
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Deleting Channel</h1>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state, props) => {
    // console.log("ChannelEditPage mapStateToProps state.channel = " + JSON.stringify(state.channel, null, 4));
    return {
        channel: state.channels.find((channel) => channel.id === props.match.params.id)
    };
}

const mapDispatchToProps = (dispatch, props) => ({
    startRemoveChannel: (data) => dispatch(startRemoveChannel(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelDeletePage);
