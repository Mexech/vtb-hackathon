import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import MaterialTable from 'material-table'

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

function Table() {
  const [columns, setColumns] = useState({});
  const [data, setData] = useState({});
  const path = 'McHQwYsaFKbmFPHnPOpE3oebfIt2/Valve_Player_Data.csv'

  useEffect(async () => {
    fetch(`/api/getdataset/${path}`)
      .then(res => res.json())
      .then(res => {
        setColumns(res.columns)
        setData(res.data)
        // let array = JSON.parse(data.data)
        // console.log(array)
      })
    // const storageRef = firebase.storage().ref(path)
    // console.log(await storageRef.getDownloadURL())
  }, []);

  return (
    <div>
      <MaterialTable
          columns={columns}
          data={data}
          title="Demo Title"
        />
    </div>
  );
}

export default Table;