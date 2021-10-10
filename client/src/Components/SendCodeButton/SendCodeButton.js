import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Button from '@mui/material/Button';

function SendCodeButton(props) {

    const sendCode = () => {
        axios.post('/api/code',{
            code: props.code,
            filename: props.filename,
            uid: props.uid
        }).then((res) => {
            if (res.data?.error) {
                alert(res.data.error)
            } else {
                props.setColumns(res.data.columns)
                props.setData(res.data.data)
            }
        })

    }

    return (
        <div>
            <Button variant="outlined" onClick={sendCode}>Send</Button>
        </div>
    );
}

export default SendCodeButton;