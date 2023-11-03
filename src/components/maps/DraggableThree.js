import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class DraggableThree extends React.Component {
    constructor(props) {
        super(props);
        console.log("DraggableThree props.parentxoff = " + props.parentxoff);
        this.state = {
            relX: 0,
            relY: 0,
            x: props.x,
            y: props.y,
            parentxoff: props.parentxoff,
            parentyoff: props.parentyoff,
        };
        this.gridX = props.gridX || 1;
        this.gridY = props.gridY || 1;
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
    }

    static propTypes = {
        onMove: PropTypes.func,
        onStop: PropTypes.func,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        gridX: PropTypes.number,
        gridY: PropTypes.number
    };

    onStart(e) {
        const ref = ReactDOM.findDOMNode(this.handle);
        const body = document.body;
        const box = ref.getBoundingClientRect();
        this.setState({
            relX: e.pageX - (box.left + body.scrollLeft - body.clientLeft),
            relY: e.pageY - (box.top + body.scrollTop - body.clientTop)
        });
    }

    onMove(e) {
        //console.log("this.state.parentxoff = " + this.state.parentxoff);
        const x = (Math.trunc((e.pageX - this.state.relX) / this.gridX) * this.gridX) + this.state.parentxoff;
        const y = (Math.trunc((e.pageY - this.state.relY) / this.gridY) * this.gridY) + this.state.parentyoff;
        if (x !== this.state.x || y !== this.state.y) {
            this.setState({
                x,
                y
            });
            this.props.onMove && this.props.onMove(this.state.x, this.state.y);
        }
        this.props.onUnitMove(x, y);
    }

    onMouseDown(e) {
        if (e.button !== 0) return;
        this.onStart(e);
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
        e.preventDefault();
    }

    onMouseUp(e) {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
        this.props.onStop && this.props.onMouseUp(this.state.x, this.state.y);
        e.preventDefault();
    }

    onMouseMove(e) {
        this.onMove(e);
        e.preventDefault();
    }

    onTouchStart(e) {
        this.onStart(e.touches[0]);
        document.addEventListener('touchmove', this.onTouchMove, { passive: false });
        document.addEventListener('touchend', this.onTouchEnd, { passive: false });
        e.preventDefault();
    }

    onTouchMove(e) {
        this.onMove(e.touches[0]);
        e.preventDefault();
    }

    onTouchEnd(e) {
        document.removeEventListener('touchmove', this.onTouchMove);
        document.removeEventListener('touchend', this.onTouchEnd);
        this.props.onStop && this.props.onStop(this.state.x, this.state.y);
        e.preventDefault();
    }

    unitStyles = {
        div: {
            'width': '50px',
            'height': '50px',
            'overflow': 'hidden',
            'position': 'relative',
            'left': 0,
            'top': 0,
            'border': '1px solid black',
            'borderRadius': 5,
            'zIndex': 1001,
        },
        img: {
            'height': 850,
            'width': 1100,
            'objectPosition': '-25px -90px'
        }
    }

    render() {
        
        return <div
            onMouseDown={this.onMouseDown}
            onTouchStart={this.onTouchStart}
            style={{
                position: 'absolute',
                left: this.state.x,
                top: this.state.y,
                touchAction: 'none',
                backgroundColor: "green",
            }}
            ref={(div) => { this.handle = div; }}
        >
            <div
                style={this.unitStyles.div}
                draggable="true"
                onDrag={this.handleDrag}
            >
                <img
                    style={this.unitStyles.img}
                    src="/images/countersheets/03Back.png" />
            </div >
        </div>;
    }
}


export default DraggableThree;