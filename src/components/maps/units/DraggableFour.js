import React from 'react';

class DraggableFour extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dragging: false,
            x: props.x,
            y: props.y,
            imageName: props.imageName,
            ...props
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
        this.setState({
            x: e.clientX - scrollPos.x - 25,
            y: e.clientY - scrollPos.y - 80,
            dragging: false
        })
    }

    handleDrag = (e) => {
        let scrollPos = this.state.getScrollState();
        if (e.clientX != 0) {
            this.setState({
                x: e.clientX - scrollPos.x - 25,
                y: e.clientY - scrollPos.y - 80,
            });
        }
    }


    render() {
        let fqImageName = `/images/countersheets/units/${this.state.imageName}`
        let borderColor = 'black';
        let borderWidth = 1;
        if (this.state.dragging) {
            borderColor = 'red';
            borderWidth = 3;
        }

        return <div
            style={{
                position: 'absolute',
                left: this.state.x,
                top: this.state.y,
                touchAction: 'none',
                width: 50,
                height: 50,
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


export default DraggableFour;