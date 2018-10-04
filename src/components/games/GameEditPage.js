import React from 'react';
import { connect } from 'react-redux';
import GameForm from './GameForm';
import { startEditGame, startRemoveGame } from '../../actions/games';

export class GameEditPage extends React.Component {
    onSubmit = (game) => {
        this.props.startEditGame(this.props.game.id, game);
        this.props.history.push('/games');
    };
    onRemove = () => {
        this.props.startRemoveGame({ id: this.props.game.id });
        this.props.history.push('/games');
    };
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Game</h1>
                    </div>
                </div>
                <div className="content-container">
                    <GameForm
                        game={this.props.game}
                        onSubmit={this.onSubmit}
                    />
                    <button className="button button--secondary" onClick={this.onRemove}>Remove Game</button>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state, props) => {
    console.log("GameEditPage state.games = " + JSON.stringify(state.games, null, 4));
    return {
        game: state.games.find((game) => game.id === props.match.params.id)
    };
};

const mapDispatchToProps = (dispatch, props) => ({
    startEditGame: (id, game) => dispatch(startEditGame(id, game)),
    startRemoveGame: (data) => dispatch(startRemoveGame(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(GameEditPage);
