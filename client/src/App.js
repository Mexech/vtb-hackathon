import React, { useState, useEffect } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import UploadButton from './components/UploadButton/UploadButton'
import Table from './components/Table/table'
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

  return(
    <div>
      <header>
      </header>
      <section>
        {user ? <FilesList/> : <SignIn/>}
      </section>
      <Table/>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return (  
    <button onClick={ signInWithGoogle }>Sign In with Google</button>
  );
}

function FilesList() {

  return (  
    <div>
      {
        auth.currentUser && ( 
          <button onClick={() => auth.signOut()}>Sign Out</button>
        )
      }
      <UploadButton userId={auth.currentUser.uid}/>
     { auth.currentUser.email}
    </div>
  );
}

export default App;