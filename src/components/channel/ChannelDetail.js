import React from 'react';
import { Link } from 'react-router-dom';

const ChannelDetail = (channel) => {
    //console.log("ChannelDetail: channel = " + JSON.stringify(channel, null, 4));
    return (
        <Link to={`/channel/edit/${channel.id}`}>
            <div>
                <p>{channel.name}</p>
            </div>
        </Link>
    );
};

export default ChannelDetail;
