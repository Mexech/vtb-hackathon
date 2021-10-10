import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Button from '@mui/material/Button';

function SendCodeButton(props) {

    const save = () => {
        axios.get(`/api/savecustomfeature/${props.uid}/${props.filename}`).then((res) => {
            props.setCustomFeature("")
        })
    }

    return ( 
        <div>
            <Button style={{ background: "#aaa" }} variant="contained" onClick={save}>Save custom feature</Button>
        </div>
    );
}

export default SendCodeButton;