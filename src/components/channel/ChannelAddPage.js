import React from 'react';
import { connect } from 'react-redux';
import ChannelForm from './ChannelForm';
import { startAddChannel } from '../../actions/channel';

export class ChannelAddPage extends React.Component {
  onSubmit = (channel) => {
    this.props.startAddChannel(channel);
    this.props.history.push('/channels');
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Channel</h1>
          </div>
        </div>
        <div className="content-container">
          <ChannelForm
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddChannel: (channel) => dispatch(startAddChannel(channel))
});

export default connect(undefined, mapDispatchToProps)(ChannelAddPage);
