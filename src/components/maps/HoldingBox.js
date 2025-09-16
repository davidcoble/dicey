import React from "react";

export default function HoldingBox() {
    return (
        <div style={{
            position: 'relative',
            top: 0,
            left: 0,
            borderWidth: '2px',
            borderColor: 'dark-grey',
            borderStyle: 'solid',
            alignContent: 'center',
            borderRadius: '15px',

        }}>
            <h1 align='center' style={{
                position: 'relative',
                alignSelf: 'center',
                zIndex: 2000,
            }}
                >Holding Box</h1>
            <img style={{
                position: 'relative',
                top: 0,
                left: 0,
                width: 400,
                zIndex: -1999,
            }} src="/images/white.png" />
        </div>
    )
}