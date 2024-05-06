import React, { useEffect, Component } from 'react';

const baseUrl = 'http://localhost:3000';
let frameUrl;
let style;
let eventListenerAttached = false;

class PluralityPopupIframe extends Component {

    constructor(props) {
        super(props);
        // Attach event listener only once, outside of this function
        if (!eventListenerAttached) {
            window.addEventListener('message', this.receiveMessage, false);
            eventListenerAttached = true;
        }
        const { options } = this.props;
        const encodedApps = encodeURIComponent(options.apps);
        const currentUrl = encodeURIComponent(window.location.href); // Get current window URL

        frameUrl = `${baseUrl}/auth-pages/login?isWidget=true&apps=${encodedApps}&origin=${currentUrl}&id_platform=none`;
        console.log(frameUrl);
        
    }

    openPopup = () => {
        const iframe = document.getElementById('iframe');
        iframe.style = "width: 300; height: 500; border: 0; border: none; position: absolute;";
    }

    closePopup = () => {
        const iframe = document.getElementById('iframe');
        iframe.style = "width: 0; height: 0; border: 0; border: none; position: absolute;";
    }
    receiveMessage = (event) => {
        const { onDataReturned } = this.props;
        if (event.origin === baseUrl) {
            console.log("Received message from iframe: "+onDataReturned);
            const data = event.data;
            console.log('Received data from opened window:', data);
            if (onDataReturned) {
                onDataReturned(data);
            }
        }
    };


    render() {
        return (
            <div>
                <h1>Widget Example</h1>
                <button onClick={this.openPopup}>
                    Reputation Connect
                </button>
                    <div className="popup-container">
                        <div className="popup-content">
                            <button onClick={this.closePopup}>Close</button>
                            <iframe
                                title="PluralityPopup"
                                src={frameUrl}
                                width="450"
                                height="600"
                                frameBorder="0"
                                id="iframe"
                                style={style}
                            ></iframe>
                        </div>
                    </div>
            </div>
        );
    }
}

export default PluralityPopupIframe;
