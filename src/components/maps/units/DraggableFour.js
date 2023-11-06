import React from 'react';
import { connect } from 'react-redux';
import { startSetGameTokenPosition } from '../../../actions/games';

class DraggableFour extends React.Component {
    constructor(props) {
        super(props);
        console.log("DraggableFour props = " + JSON.stringify(props, null, 2));
        this.state = {
            ...props,
            dragging: false,
            x: props.x,
            y: props.y,
            imageName: props.imageName,
        };
    }

    handleDragStart = (e) => {
        let scrollPos = this.state.getScrollState();
        this.setState({
            x: e.clientX - scrollPos.x - 25,
            y: e.clientY - scrollPos.y - 80,
            dragging: true
        })
    }

    handleDragEnd = (e) => {
        let scrollPos = this.state.getScrollState();
        const x = e.clientX - scrollPos.x - 22;
        const y = e.clientY - scrollPos.y - 77;
        console.log(`drop loc = ${x}, ${y}`);
        this.setState({
            x,
            y,
            dragging: false
        })
        this.props.startSetGameTokenPosition(this.state.gid, {
            id: this.state.id,
            x,
            y,
            theater: this.state.theater,
            imageName: this.state.imageName,
            name: this.state.name
        });
    }

    handleDrag = (e) => {
        let scrollPos = this.state.getScrollState();
        const x = e.clientX - scrollPos.x - 22;
        const y = e.clientY - scrollPos.y - 77;
        if (e.clientX != 0) {
            this.setState({
                x,
                y
            });
        }
        this.props.startSetGameTokenPosition(this.state.gid, {
            id: this.state.id,
            x,
            y,
            theater: this.state.theater,
            imageName: this.state.imageName,
            name: this.state.name
        });
    }


    render() {
        console.log("DraggableFour render() called with state: " + JSON.stringify(this.state));
        let fqImageName = `/images/countersheets/units/${this.state.imageName}`
        let borderColor = 'black';
        let borderWidth = 1;
        let width = 50;
        let height = 50;
        if (this.state.dragging) {
            borderColor = this.state.selectedColor;
            borderWidth = 5;
            width = 55;
            height = 55;
        }

        return <div
            style={{
                position: 'absolute',
                left: this.props.x,
                top: this.props.y,
                touchAction: 'none',
                width: width,
                height: height,
                overflowX: 'hidden',
                overflowY: 'hidden',
                borderColor: borderColor,
                borderWidth: borderWidth,
                borderStyle: 'solid',
                borderRadius: 5,
            }}
            onDrag={this.handleDrag}
            onDragStart={this.handleDragStart}
            onDragEnd={this.handleDragEnd}

        >
            <img
                width="50px"
                src={fqImageName}
            />
        </div>;
    }
}
const mapStateToProps = (state, props) => {
    let player = state.players.find((p) => { return p.uid === state.auth.uid });
    let game = state.games.find((g) => { return g.id === player.rollingGame });
    let gameUnit = game.units[props.id];
    console.log("DF gameUnit = " + JSON.stringify(gameUnit, null, 2));
    return {
        pid: player.id,
        gid: game.id,
        x: gameUnit.x,
        y: gameUnit.y,
        
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        startSetGameTokenPosition: (id, data) => dispatch(startSetGameTokenPosition(id, data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DraggableFour);