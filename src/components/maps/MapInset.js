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
    
        //console.log("image clicked this.state  = " + JSON.stringify(this.state));
        // for(var key in e) {
        //     console.log("image clicked key = " + key);
        // }
        let w = e.target.width;
        let x = e.clientX - e.target.x;
        let y = e.clientY - e.target.y;
        // console.log("clientX = " + e.clientX);
        // console.log("x = " + x);
        // console.log("y = " + y);
    
        this.state.mapScrollEvent(x, y, this.state.mapFile );
    };
    
    render() {
        const imageFile = `/images/${this.state.mapFile}.png`;
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

