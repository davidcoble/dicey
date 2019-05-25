import React from 'react';
import { connect } from 'react-redux';
import { selectGameSubscribers } from '../../selectors/players';
import {Link} from "react-router-dom";

const GameSubscriberList = (props) => {
    console.log("GameSubscriberList props = " + JSON.stringify(props, null, 2));
    const uid = props.uid;
    return (
        <div>
            <div>
                {
                    props.subscribers.length === 0 ? (
                        <div>No subscribers</div>
                    ) : (
                        props.subscribers.map((subscriber) => {
                            return `${subscriber.name}`
                        }).join(", ")
                    )
                }
            </div>
        </div>
    );
}
const mapStateToProps = (state, props) => {
    // console.log("GameSubscriberList mapStateToProps state = " + JSON.stringify(state, null, 2));
    // console.log("GameSubscriberList mapStateToProps props = " + JSON.stringify(props, null, 2));
    return {
        subscribers: selectGameSubscribers(state.players, props.subscribers)
    };
};

export default connect(mapStateToProps)(GameSubscriberList);
