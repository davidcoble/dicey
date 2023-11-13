import React from "react";
import { connect } from "react-redux";

export class ResizableDiv extends React.Component {
    constructor(props) {
        super(props);
        // console.log("ResizableDiv props.theater = " + props.theater);
        this.ref = React.createRef();
        const id = props.theater + "resizableDiv"
        this.state = {
            ...props,
            id,
            onResize: props.onResize,
            // width: props.width,
            // height: props.height,
            // theater: props.theater
        };
        // console.log("ResizableDiv this.state = " + JSON.stringify(this.state));
    }
    componentDidMount() {
        const element = this.ref.current;
        const domElem = document.getElementById(this.state.id);
        console.log("domElem.offsetTop = " + domElem.offsetTop);
        console.log("domElem.offsetLeft = " + domElem.offsetLeft);
        this.state.onResize({
            offsetLeft: domElem.offsetLeft,
            offsetTop: domElem.offsetTop
        })
        element.addEventListener('resize', (event) => {
            console.log(event.detail)
            const width = event.detail.width;
            const height = event.detail.height;
            const theater = this.state.theater;
            console.log("theater = " + theater)
            const update = { width, height, theater };
            console.log("update = " + JSON.stringify(update));
            this.state.onResize(update);
        });
        function checkResize(mutations) {
            
            const el = mutations[0].target;
            const w = el.clientWidth;
            const h = el.clientHeight;

            const isChange = mutations
                .map((m) => `${m.oldValue}`)
                .some((prev) => prev.indexOf(`width: ${w}px`) === -1 || prev.indexOf(`height: ${h}px`) === -1);

            if (!isChange) { return; }
            const event = new CustomEvent('resize', { detail: { width: w, height: h } });
            el.dispatchEvent(event);
        }
        const observer = new MutationObserver(checkResize);
        observer.observe(element, { attributes: true, attributeOldValue: true, attributeFilter: ['style'] });
    }

    render() {
        //console.log("about to render ResizableDiv with state = " + JSON.stringify(this.state, null, 2));
        return <div id={this.state.id} ref={this.ref} style={{
            'width': this.state.width,
            'height': this.state.height,
            'overflowX': 'hidden',
            'overflowY': 'hidden',
            'resize': 'both',
        }}
        > {this.props.children}</div>;

    }
}
const mapStateToProps = (state, props) => {
    return {
    //     theater: state.theater
    }
};
const mapDispatchToProps = (dispatch) => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(ResizableDiv);

