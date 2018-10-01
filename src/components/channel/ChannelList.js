import React from 'react';
import { connect } from 'react-redux';
import ChannelDetail from './ChannelDetail';
import selectChannel from '../../selectors/channel';
import {Link} from "react-router-dom";

const ChannelList = (props) => (
    <div>
        <Link className="button-round" to="/channel/create">+</Link><b>Channels</b>
        <div>
            {
                props.channels.length === 0 ? (
                    <div>No Channels</div>
                ) : (
                    props.channels.map((channel) => {
                        return <ChannelDetail key={channel.id} {...channel} />
                    })
                )
            }
        </div>
    </div>
);
const mapStateToProps = (state) => {
    // console.log("mapStateToProps state.channel = " + JSON.stringify(state.channel, null, 4));
    // console.log("mapStateToProps filters = " + JSON.stringify(state.filters));
    return {
        channels: selectChannel(state.channel, state.filters)
    };
};

export default connect(mapStateToProps)(ChannelList);
