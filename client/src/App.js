import React, { useState, useEffect } from 'react';

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

const app = initializeApp(firebaseConfig);

function App() {
  const [test, setTest] = useState();
  useEffect(() => {
    fetch("/test").then(
      res => res.json()
    ).then(
      test => {
        setTest(test)
        console.log(test)
      }
    )
  }, []);
  return ( 
    <div>
      {
        test?.shit
      }
    </div>
   );
}

export default App;