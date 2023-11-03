import React from 'react';

export default class DraggableToken extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }

    }

    unitStyles = {
        div: {
            'width': '50px',
            'height': '50px',
            'overflow': 'hidden',
            'position': 'absolute',
            'left': 155,
            'top': 155,
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

    handleDrag = (e) => {
        e.preventDefault();
        let nameArray = Object.getOwnPropertyNames(e);
        console.log("nameArray = " + JSON.stringify(nameArray, null, 2));
        console.log("e.pageX = " + e.pageX);
    }

    render() {
        // transferPropsTo will merge style & other props passed into our
        // component to also be on the child DIV.
        return (
            <div
                style={this.unitStyles.div}
                draggable="true"
                onDrag={this.handleDrag}
            >
                <img
                    style={this.unitStyles.img}
                    src="/images/countersheets/03Back.png" />
            </div >
        )
    }
}