import React from 'react';

export default class Draggable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }

    }

    initialPos = { x: 0, y: 0, dragging: false, rel: null }

    componentDidUpdate = (props, state) => {
        if (this.state.dragging && !state.dragging) {
            document.addEventListener('mousemove', this.onMouseMove)
            document.addEventListener('mouseup', this.onMouseUp)
        } else if (!this.state.dragging && state.dragging) {
            document.removeEventListener('mousemove', this.onMouseMove)
            document.removeEventListener('mouseup', this.onMouseUp)
        }
    }

    // calculate relative position of the mouse and set dragging=true
    onMouseDown = (e) => {
        // only left mouse button
        if (e.button !== 0) return
        
        this.setState({
            dragging: true,
            rel: {
                x: e.pageX - pos.left,
                y: e.pageY - pos.top
            }
        })
        e.stopPropagation()
        e.preventDefault()
    }
    onMouseUp = (e) => {
        this.setState({ dragging: false })
        e.stopPropagation()
        e.preventDefault()
    }
    onMouseMove = (e) => {
        if (!this.state.dragging) return
        this.setState({
            pos: {
                x: e.pageX - this.state.rel.x,
                y: e.pageY - this.state.rel.y
            }
        })
        e.stopPropagation()
        e.preventDefault()
    }
    render() {
        // transferPropsTo will merge style & other props passed into our
        // component to also be on the child DIV.
        return (
            <div
                onMouseDown={this.onMouseDown}
                >
                    <img height="60px" width="60px" src="/images/countersheets/03Back.png"/>
            </div >
        )
    }
}