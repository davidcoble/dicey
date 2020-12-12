import React, {Component} from 'react';
import { connect } from 'react-redux';
import { selectGameSubscribers } from '../../selectors/players';
import {Link} from "react-router-dom";
import GamePlayerDetail from "./GamePlayerDetail";
import {startAddSubscriberToGame, startRemoveSubscriberFromGame} from '../../actions/games';

class GameSubscriberList extends Component {
    addUser = (e) => {
        e.preventDefault();
        //console.log("pid = " + this.props.pid);
        //console.log("gid = " + this.props.id);
        this.props.startAddSubscriberToGame({gid: this.props.id, pid: this.props.pid});
    }
    removeUser = (e) => {
        e.preventDefault();
        //console.log("pid = " + this.props.pid);
        //console.log("gid = " + this.props.id);
        this.props.startRemoveSubscriberFromGame({gid: this.props.id, pid: this.props.pid});
    }
    render() {
        // console.log("GameSubscriberList props = " + JSON.stringify(props, null, 2));
        const pid = this.props.pid;
        const gid = this.props.id;
        let found = 0;
        return (
            <div>
                <div>
                    {
                        this.props.subscribers.length === 0 ? (
                            <div>No subscribers</div>
                        ) : (
                            this.props.subscribers.map((subscriber) => {
                                if (pid === subscriber.id) {
                                    found = 1;
                                }
                                return (
                                    <GamePlayerDetail key={subscriber.id} {...subscriber}/>
                                );
                            })
                        )
                    }
                    {
                        found ? (
                            <button onClick={this.removeUser}>unsubscribe</button>
                        ) : (
                            <button onClick={this.addUser}>subscribe</button>
                        )
                    }
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    startAddSubscriberToGame: (data) => dispatch(startAddSubscriberToGame(data)),
    startRemoveSubscriberFromGame: (data) => dispatch(startRemoveSubscriberFromGame(data))
});

const mapStateToProps = (state, props) => {
    // console.log("GameSubscriberList mapStateToProps state = " + JSON.stringify(state, null, 2));
    // console.log("GameSubscriberList mapStateToProps props = " + JSON.stringify(props, null, 2));
    return {
        subscribers: selectGameSubscribers(state.players, props.subscribers)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameSubscriberList);
