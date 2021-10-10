import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Button from '@mui/material/Button';

function SendCodeButton(props) {

    const sendCode = () => {
<<<<<<< HEAD
        axios.post('/api/code',{
=======
        axios.post('/api', {
>>>>>>> origin/overnight
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
            <Button variant="outlined" onClick={sendCode}>Send</Button>
        </div>
    );
}

export default SendCodeButton;