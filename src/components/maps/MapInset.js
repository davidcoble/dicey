import React from 'react';


export default class MapInset extends React.Component {
    constructor(props) {
        super(props);
        console.log("MapInset props = " + JSON.stringify(props, null, 2));
        this.state = {
            ...props
        }
    };
    imageClick = (e) => {
        e.preventDefault();
        const target = e.currentTarget.getBoundingClientRect();
        const left = Math.floor(target.left);
        // console.log("inset left = " + left);
        const width = Math.floor(target.width);
        // console.log("inset width = " + width);
        const top = Math.floor(target.top);
        // console.log("inset top = " + top);
        const height = Math.floor(target.height);
        // console.log("inset height = " + height);
        // console.log("inset e.clientX = " + e.clientX);
        // console.log("inset e.clientY = " + e.clientY);
        // console.log("e.target keys = " + Object.keys(e.target));
        const x = e.clientX - left;
        const y = e.clientY - top;
        // console.log("inset x = " + x);
        // console.log("inset y = " + y);

    
        this.state.mapScrollEvent(x/width, y/height, this.state.theater );
    };
    
    render() {
        const imageFile = `/images/${this.state.theater}.png`;
        return (
            <div>
                <div className='rowList'>
                    <div>
                        <img src={imageFile} width="200px" onClick={this.imageClick} />
                    </div>
                </div>
            </div>
        );
    };
};

