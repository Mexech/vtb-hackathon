import React, { useState, useEffect } from 'react';
import axios from 'axios'

function SendCodeButton(props) {

    const discard = () => {
        axios.get(`/api/discardcustomfeature/${props.uid}/${props.filename}`).then((res) => {
            alert('close editor')
            props.setColumns(res.data.columns)
            props.setData(res.data.data)
        })
    }

    return ( 
        <div>
            <button onClick={discard}>Discard custom feature</button>
        </div>
    );
}

export default SendCodeButton;