import React, { useState, useEffect } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import "./App.css"

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import UploadButton from './components/UploadButton/UploadButton'
import Table from './components/Table/table'

import Catalog from './components/Catalog/Catalog'
import { initializeApp } from "firebase/app";

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

const auth = firebase.auth()
const firestore = firebase.firestore()
const storage = firebase.storage()

function App() {
  const [user] = useAuthState(auth)
  const [code, setCode] = useState("");
  const [filename, setFilename] = useState("");

  const back = () => {
    setFilename("")
  }
  
  return(
    <div>
      
      {/* <header>
        {filename ? <button onClick={back}>BACK</button> : null}
      </header> */}
      <section>
        {!user
          ? <SignIn/>
          : [
            filename
              ? <Table uid={auth.currentUser.uid} filename={filename} handleBack={back}/>
              : <FilesList setFilename={setFilename} />
          ]
        }
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return (
    <button onClick={signInWithGoogle}>Sign In with Google</button>
  );
}

function FilesList(props) {
  const storage = firebase.storage()
  const storageRef = storage.ref(auth.currentUser.uid)

  const [files, setFiles] = useState([])

  const listFiles = () => {
    storageRef.listAll()
      .then(res => {
          console.log(res)
          setFiles(res.items.map(f => f.name))
      })
      .catch(err => {
        alert(err.message);
      })
  }

  useEffect(() => {listFiles()}, [])

  return (  
    <div className = "main">
      <div style = {{backgroundColor: "#326DC6"}}>
        {
          auth.currentUser && ( 
          <button onClick={() => {
            auth.signOut()
          }}>Sign Out</button>
          )
        }
        <UploadButton userId={auth.currentUser.uid} fileList={files} setFileList={listFiles} storageRef={storageRef}/>
      </div>
      <Catalog setFilename={props.setFilename} fileList={files} setFileList={listFiles} usr={auth.currentUser} storageRef={storageRef}/>
    </div>
  );
}

export default App;