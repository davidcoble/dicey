import React from 'react';
import { connect } from 'react-redux';
import GameForm from './GameForm';
import { startAddGame } from '../../actions/games';

export class GameAddPage extends React.Component {
    onSubmit = (game) => {
        this.props.startAddGame(game);
        this.props.history.push('/games');
    };
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Add Game</h1>
                    </div>
                </div>
                <div className="content-container">
                    <GameForm
                        boxes={this.props.boxes}
                        onSubmit={this.onSubmit} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    console.log("GameEditPage state.boxes = " + JSON.stringify(state.boxes, null, 4));
    return {
        game: state.games.find((game) => game.id === props.match.params.id),
        boxes: state.boxes
    };
};

const mapDispatchToProps = (dispatch) => ({
    startAddGame: (game) => dispatch(startAddGame(game))
});

export default connect(mapStateToProps, mapDispatchToProps)(GameAddPage);
