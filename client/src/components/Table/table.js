import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import MaterialTable from 'material-table';
import CustomEditor from '../CustomEditor/CustomEditor';
import './style.css'
import axios from 'axios';

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

function Table(props) {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const path = 'McHQwYsaFKbmFPHnPOpE3oebfIt2/Valve_Player_Data.csv';
  const [isEditor, setEditor] = useState(false);

  useEffect(async () => {
    fetch(`/api/getdataset/${path}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        setColumns(res.columns)
        setData(res.data)
      })

    // const storageRef = firebase.storage().ref(path)
    // console.log(await storageRef.getDownloadURL())
  }, []);

  return (
    <div>
      <div className="wrapper">
        <div style={isEditor ? { width: "69%", marginRight: "1%" } : { width: "100%" }}>
          <MaterialTable
            className="table"
            columns={columns}
            data={data}
            actions={[
              isEditor ? {
                icon: 'close',
                tooltip: 'Close editor',
                isFreeAction: true,
                onClick: (event) => setEditor(false)
              } :
                {
                  icon: 'edit',
                  tooltip: 'Open editor',
                  isFreeAction: true,
                  onClick: (event) => setEditor(true)
                }]}
            title="Demo Title"
            options={{
              maxBodyHeight: "75vh",
              selection: false,
              // rowStyle:{backgroundColor:"red"}
              // headerStyle:{},
              paging: false

            }}
          />
        </div>
        {
          isEditor ?
            <div style={{ width: "30%" }}>
              <CustomEditor
                className="editor"
                uid={props.uid}
                filename={props.filename}
                setColumns={setColumns}
                setData={setData}
              />
            </div>
            :
            ""
        }
      </div>
    </div>
  );
}

export default Table;