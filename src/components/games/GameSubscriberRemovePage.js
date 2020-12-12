import React from 'react';
import { connect } from 'react-redux';
import { startRemoveSubscriberFromGame } from '../../actions/games';

export class GameSubscriberRemovePage extends React.Component {
    componentWillMount() {
        this.props.startRemoveSubscriberFromGame({ gid: this.props.game.id, pid: this.props.player.id });
        this.props.history.push('/games');
    }
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Removing Subscriber from Game</h1>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state, props) => {
    // console.log("GameEditPage mapStateToProps state.game = " + JSON.stringify(state.game, null, 4));
    return {
        game: state.games.find((game) => game.id === props.match.params.gid),
        player: state.players.find((player) => player.id === props.match.params.pid)
    };
}

const mapDispatchToProps = (dispatch, props) => ({
    startRemoveSubscriberFromGame: (data) => dispatch(startRemoveSubscriberFromGame(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(GameSubscriberRemovePage);