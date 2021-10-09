import React, { useState, useEffect } from 'react';

function SendCodeButton() {

    const sendCode = () => {
        console.log('asd')
    }

    return ( 
        <div>
            <button onClick={sendCode}>SEND</button>
        </div>
    );
}

export default SendCodeButton;