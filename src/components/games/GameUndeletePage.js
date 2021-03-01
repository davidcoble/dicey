import React from 'react';
import { connect } from 'react-redux';
import { startUndeleteGame } from '../../actions/games';

export class GameUndeletePage extends React.Component {
    componentWillMount() {
        this.props.startUndeleteGame({ id: this.props.game.id });
        this.props.history.push('/games');
    };
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Delete Game</h1>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state, props) => {
    console.log("GameUndeletePage mapStateToProps state.games = " + JSON.stringify(state.games, null, 4));
    return {
        game: state.games.find((game) => game.id === props.match.params.id)
    };
}

const mapDispatchToProps = (dispatch, props) => ({
    startUndeleteGame: (data) => dispatch(startUndeleteGame(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(GameUndeletePage);
