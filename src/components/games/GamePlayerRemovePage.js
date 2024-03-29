import React from 'react';
import { connect } from 'react-redux';
import GameForm from './GameForm';
import { startRemovePlayerFromGame } from '../../actions/games';
import { startRemoveGameFromPlayer } from '../../actions/players';

export class GamePlayerRemovePage extends React.Component {
    componentDidMount() {
        this.props.startRemovePlayerFromGame({ gid: this.props.game.id, pid: this.props.player.uid });
        this.props.startRemoveGameFromPlayer({ gid: this.props.game.id, pid: this.props.player.uid });
        this.props.history.push('/games');
    }
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Removing Player from Game</h1>
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
    startRemovePlayerFromGame: (data) => dispatch(startRemovePlayerFromGame(data)),
    startRemoveGameFromPlayer: (data) => dispatch(startRemoveGameFromPlayer(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePlayerRemovePage);