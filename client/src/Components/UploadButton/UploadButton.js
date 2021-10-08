import React, { useRef, useState, useEffect } from "react";

import './UploadButtonStyles.css'

import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCpkWpy-HyuAodtrWajEE6_4ByOq_GtpAI",
    authDomain: "vtb-hackathon.firebaseapp.com",
    projectId: "vtb-hackathon",
    storageBucket: "vtb-hackathon.appspot.com",
    messagingSenderId: "874328917914",
    appId: "1:874328917914:web:f3000468bcd434722f1c23",
    measurementId: "G-H7506F30MH"
  };
  
const app = firebase.initializeApp(firebaseConfig);

function UploadButton(props) {
    const ref = useRef(null)
    const storage = firebase.storage()
    const storageRef = storage.ref(props.userId)
    const initialList = []
    const [files, setFiles] = useState([])

    const listItem = () => {
        storageRef.listAll()
          .then(res => {
              setFiles(res.items.map(f => f.name))
          })
          .catch(err => {
            alert(err.message);
          })
      }

    useEffect(() => {listItem()}, [])

    const handleClick = () => {
        if (ref) {
            return ref.current?.click();
        }
    };

    const handleUpload = async (event) => {
        if (!firebase) return;

        const uploadedFile = event?.target.files[0];
        if (!uploadedFile) return;

        try {
            await storageRef.child(uploadedFile.name).put(uploadedFile);
            alert("Successfully uploaded file!");
        } catch (error) {
            console.log("error", error);
        }
        listItem()
    };

    return (  
        <div>
            <button className="upload-button" onClick={() => handleClick()}>Upload file</button>
            <input type="file" accept=".csv" hidden ref={ref} onChange={handleUpload}/>
            {
                files.map((f, index) => (
                    <li key={index}>{f}</li>
                ))
            }
        </div>
    );
}

function Item(props) {
    return ( 
        <div>
            {props.name}
        </div>
     );
}

export default UploadButton;