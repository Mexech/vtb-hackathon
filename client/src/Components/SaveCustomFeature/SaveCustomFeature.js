import React, { useState, useEffect } from 'react';
import axios from 'axios'

function SendCodeButton(props) {

    const save = () => {
        axios.get(`/api/savecustomfeature/${props.uid}/${props.filename}`).then((res) => {
            alert('close editor')
        })
    }

    return ( 
        <div>
            <button onClick={save}>Save custom feature</button>
        </div>
    );
}

export default SendCodeButton;