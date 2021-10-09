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

function Table(props) {
  const columns = [
    { title: 'Имя файла', field: 'fileName' },
    { title: 'Пользователь', field: 'userName' },
    { title: 'Последнее обновление', field: 'lastUpdate'},
    { title: 'Размер', field: 'size'}
  ]

  useEffect(() =>{props.setFileList()}, [])

  const handleDelete = async (rowData) => {
    await props.storageRef.child(rowData.fileName).delete().then(() => {
      props.setFileList()
    })
  }

  const actions = [{
    icon: "delete",
    tooltip: "deleteFile",
    title: "aaa",
    onClick: (event, rowData) => handleDelete(rowData)
  }]

  const options = {
    headerStyle: {
      fontSize: "10px"
    },
    showTitle: false,
    toolbar: false,
    search: false,
    paging: false,
    sorting: false,
    headerStyle: {
      fontSize: "10px",
      position: "sticky",
      top: "0"
    },
    maxBodyHeight: "300px"
  }

  const localization= {
    header: {
      actions: ""
    }
  }

  return (
    <div style = {{margin: "2%"}}>
      <MaterialTable
          columns={columns}
          actions = {actions}
          options={options}
          localization = {localization}
          style = {{fontSize: "10px"}}

          data = {props.fileList.map((fName) => ({"fileName": fName,
                                                  "userName": props.usr.email,
                                                  "lastUpdate": "---",
                                                  "size": "---"}))}
        />
      </div>
  );
}

export default Table;