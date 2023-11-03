import React from 'react';
import { connect } from 'react-redux';
import { startAddSubscriberToGame } from '../../actions/games';

export class GameSubscriberAddPage extends React.Component {
    componentDidMount() {
        this.props.startAddSubscriberToGame({ gid: this.props.game.id, pid: this.props.player.uid });
        this.props.history.push('/games');
    }
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Adding Subscriber to Game</h1>
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
        player: state.players.find((player) => player.uid === props.match.params.pid)
    };
}

const mapDispatchToProps = (dispatch, props) => ({
    startAddSubscriberToGame: (data) => dispatch(startAddSubscriberToGame(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(GameSubscriberAddPage);