import React from 'react';
import { connect } from 'react-redux';
import { startSetGameTokenPosition } from '../../actions/games';

class Unit extends React.Component {
    constructor(props) {
        super(props);
        // console.log("Unit props = " + JSON.stringify(props, null, 2));
        this.state = {
            ...props,
            dragging: false,
            x: props.x,
            y: props.y,
        };
    }
    
    handleDragStart = (e) => {
        let scrollPos = this.state.getScrollState();
        this.setState({
            x: e.clientX - scrollPos.x,
            y: e.clientY - scrollPos.y,
            dragging: true
        })
    }
    
    handleDragEnd = (e) => {
        let scrollPos = { x : 0 , y : 0 };
        const x = e.clientX - scrollPos.x;
        const y = e.clientY - scrollPos.y;
        console.log(`drop loc = ${x}, ${y}`);
        this.setState({
            x,
            y,
            dragging: false
        })
        const data = {
            id: this.state.name,
            x,
            y,
            theater: this.state.theater,
        };
        console.log("about to pass data = " + JSON.stringify(data, null, 2));
        this.props.startSetGameTokenPosition(this.state.gid, data);
    }

    handleDrag = (e) => {
        let scrollPos = { x : 0 , y : 0 };
        const x = e.clientX - scrollPos.x;
        const y = e.clientY - scrollPos.y;
        if (e.clientX != 0) {
            this.setState({
                x,
                y
            });
        }
        const data = {
            id: this.state.name,
            x,
            y,
            theater: this.state.theater,
        };
        // console.log("about to pass data = " + JSON.stringify(data, null, 2));
        this.props.startSetGameTokenPosition(this.state.gid, data);
    }


    render() {
        // console.log("Unit render() called with state: " + JSON.stringify(this.state));
        let fqImageName = `/images/countersheets/units/Front/${this.state.name}Front.png`;
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
    // console.log("DF gameUnit = " + JSON.stringify(gameUnit, null, 2));
    return {
        pid: player.id,
        gid: game.id,
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        startSetGameTokenPosition: (id, data) => { 
            // console.log("XXXXXXXXXXXXXXXXX data = " + JSON.stringify(data, null, 2));
            dispatch(startSetGameTokenPosition(id, data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Unit);