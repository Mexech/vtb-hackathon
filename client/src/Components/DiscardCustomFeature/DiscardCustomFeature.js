import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Button from '@mui/material/Button';

function SendCodeButton(props) {

    const discard = () => {
        axios.get(`/api/discardcustomfeature/${props.uid}/${props.filename}`).then((res) => {
            props.setCustomFeature("")
            props.setColumns(res.data.columns)
            props.setData(res.data.data)
        })
    }

    return ( 
        <div>
            <Button variant="outlined" onClick={discard}>Discard custom feature</Button>
        </div>
    );
}

export default SendCodeButton;