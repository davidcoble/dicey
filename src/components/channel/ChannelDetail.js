import React from 'react';
import { Link } from 'react-router-dom';

const ChannelDetail = (channel) => {
    //console.log("ChannelDetail: channel = " + JSON.stringify(channel, null, 4));
    return (
        <div>
            <Link className="button-round" to={`/channel/delete/${channel.id}`}>-</Link>
            <Link to={`/channel/view/${channel.id}`}>
                <b>{channel.name}</b>
            </Link>
            <Link to={`/channel/edit/${channel.id}`}>
                <b>(edit)</b>
            </Link>
        </div>
    );
};

export default ChannelDetail;
