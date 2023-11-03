import React, { useState } from 'react';
import { connect } from 'react-redux';


export class DraggableToken extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            x: 100,
            y: 200,
            dragging: false,
        }

    }



    onMouseDown = (e) => {
        e.preventDefault();
        console.log("Draggable onMouseDown");
        this.state.dragging = true;
    }
    onMouseUp = (e) => {
        e.preventDefault();
        console.log("Draggable onMouseUp");
        this.state.dragging = false;
    }
    onMouseMove = (e) => {
        e.preventDefault();
        e.persist();
        // let nameArray = Object.getOwnPropertyNames(e);
        // console.log("nameArray = " + JSON.stringify(nameArray, null, 2));
        console.log("mouseMove Event");
        if (this.state.dragging) {
            console.log("updating location");
            this.state.x = e.clientX - 25;
            this.state.y = e.clientY - 25;

        }
    }

    render() {
        const left = this.props.x + "px";
        const top = this.props.y + "px";
        const padding = "0px";
        console.log("left = " + left);
        console.log("top = " + top);
        return (
            <div
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
                onMouseMove={this.onMouseMove}
            >
                <div id="unit" className='unitDiv3' style={{ padding, left, top, position: 'absolute' }}>
                    <img height="60px" width="60px" src="/images/countersheets/03Back.png" className="unit0003" />
                </div>
            </div >
        )
    }
}
const mapStateToProps = (state, props) => {
    console.log("MapPage.mapStateToProps state.games = " + JSON.stringify(state.games, null, 2));
    return {
        x: state.x,
        y: state.y,
        dragging: state.dragging,
    };
};

export default connect(mapStateToProps, null)(DraggableToken);
