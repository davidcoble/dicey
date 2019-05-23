import React from 'react';

import * as emailjs from 'emailjs-com';
import {connect} from "react-redux";

export default class EmailClient extends React.Component {
    constructor(props) {
        super(props);
        console.log("EmailClient constructor props = " + JSON.stringify(props, null, 2));
        this.state = {
            "reply_to": "dicey.coble@gmail.com",
            "to_name": "Dave",
            "to_email": "plutocoble@gmail.com",
            "from_name": "Moses II",
            "message_html": "<b>this is totally, really bold</b>",
            ...props
        };
    }

    sendEmail = () => {

        // console.log("EmailClient.sendEmail xx this.state = = " + JSON.stringify(this.state, null, 2));
//        emailjs.init('user_uvQW58wZPoC8HU2KL7KLJ');
        emailjs.send(
            "gmail_1234",
            "template_J3knZsUv",
            this.state,
            'user_uvQW58wZPoC8HU2KL7KLJ'
        )
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function(err) {
                console.log('it FAILED...', err);
            });

    };
    render() {
        return (
            <div>Email Sent</div>
        );
    };
}
//
// const mapStateToProps = (state) => {
//     console.log("EmailClient.mapStateToProps state = " + JSON.stringify(state, null, 2));
// };
//
// export default connect(mapStateToProps)(EmailClient);
