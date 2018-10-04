import React from 'react';
import { connect } from 'react-redux';
import GameForm from './GameForm';
import { startEditGame, startRemoveGame } from '../../actions/game';

export class GameDeletePage extends React.Component {
    componentWillMount() {
        this.props.startRemoveGame({ id: this.props.game.id });
        this.props.history.push('/games');
    }
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Deleting Game</h1>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state, props) => {
    // console.log("GameEditPage mapStateToProps state.game = " + JSON.stringify(state.game, null, 4));
    return {
        game: state.game.find((game) => game.id === props.match.params.id)
    };
}

const mapDispatchToProps = (dispatch, props) => ({
    startRemoveGame: (data) => dispatch(startRemoveGame(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(GameDeletePage);
