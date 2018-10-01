import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import selectChannel from '../../selectors/channel';

export const ChannelSummary = ({ channelCount, channelsTotal }) => {
    return (
        <div className="page-header">
            <div className="page-header__actions">
                <Link className="button" to="/channel/create">Add Channel</Link>
            </div>
            <div className="content-container">
                <h1 className="page-header__title">Channel</h1>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const visibleChannels = selectChannel(state.channels, state.filters);

    return {
        channelCount: visibleChannels.length,
    };
};

export default connect(mapStateToProps)(ChannelSummary);
