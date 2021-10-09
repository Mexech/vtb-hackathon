import React, { useState, useEffect } from 'react';
import axios from 'axios'

function SendCodeButton(props) {

    const sendCode = () => {
        axios.post('/api',{
            code: "def run(df):\n\treturn 'hello'",
            filename: "Valve_Player_Data.csv",
            uid: "McHQwYsaFKbmFPHnPOpE3oebfIt2"
        }).then(res=>console.log(res))
    }

    return ( 
        <div>
            <button onClick={sendCode}>SEND</button>
        </div>
    );
}

export default SendCodeButton;