import React from 'react';
import { connect } from 'react-redux';
import { startRemoveGame } from '../../actions/games';

export class GameDeletePage extends React.Component {
    componentDidMount() {
        //this.props.startRemoveGame({ id: this.props.game.id });
        //this.props.history.push('/games');
    };
    reallyDeleteGame = () => {
        console.log("really deleting " + this.props.game.name);
        this.props.startRemoveGame({ id: this.props.game.id });
        this.props.history.push('/games');
    }
    dontDeleteGame = () => {
        console.log("not deleting " + this.props.game.name);
        this.props.history.push('/games');
    }
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Delete Game: '{this.props.game.name}'?</h1>
                        <p>All players must request a game to be deleted -- then it will be marked "deleted" and not appear on the "games" page.</p>
                        <button onClick={this.reallyDeleteGame}>Yes</button>
                        <button onClick={this.dontDeleteGame}>No</button>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state, props) => {
    console.log("GameEditPage mapStateToProps state.games = " + JSON.stringify(state.games, null, 4));
    return {
        game: state.games.find((game) => game.id === props.match.params.id)
    };
}

const mapDispatchToProps = (dispatch, props) => ({
    startRemoveGame: (data) => dispatch(startRemoveGame(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(GameDeletePage);
