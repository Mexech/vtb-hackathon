import React, { useState, useEffect } from 'react';
import axios from 'axios'

function SendCodeButton(props) {

    const sendCode = () => {
        axios.post('/api',{
            code: props.code,
            filename: props.filename,
            uid: props.uid
        }).then((res) => {
            props.setColumns(res.data.columns)
            props.setData(res.data.data)
        })

    }

    return ( 
        <div>
            <button onClick={sendCode}>SEND</button>
        </div>
    );
}

export default SendCodeButton;