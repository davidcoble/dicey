import React from 'react';
import { connect } from 'react-redux';
import ChannelForm from './ChannelForm';
import { startEditChannel, startRemoveChannel } from '../../actions/channel';

export class EditChannelPage extends React.Component {
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
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Channel</h1>
          </div>
        </div>
        <div className="content-container">
          <ChannelForm
            channel={this.props.channel}
            onSubmit={this.onSubmit}
          />
          <button className="button button--secondary" onClick={this.onRemove}>Remove Channel</button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => {
    // console.log("ChannelEditPage mapStateToProps state.channel = " + JSON.stringify(state.channel, null, 4));
    return {
        channel: state.channel.find((channel) => channel.id === props.match.params.id)
    };
}

const mapDispatchToProps = (dispatch, props) => ({
  startEditChannel: (id, channel) => dispatch(startEditChannel(id, channel)),
  startRemoveChannel: (data) => dispatch(startRemoveChannel(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditChannelPage);
