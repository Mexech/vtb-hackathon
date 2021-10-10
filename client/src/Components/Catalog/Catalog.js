import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import MaterialTable from 'material-table'

import Delete from "@material-ui/icons/Delete"

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

function Catalog(props) {
  const columns = [
    { title: 'Имя файла', field: 'filename' },
    { title: 'Пользователь', field: 'username' },
    { title: 'Размер', field: 'size' }
  ]

  useEffect(() => { props.setFileList() }, [])

  const handleDelete = async (rowData) => {
    await props.storageRef.child(rowData.filename).delete().then(() => {
      props.setFileList()
    })
  }

  const [selectedRow, setSelectedRow] = useState(null);
  const handleRowClick = (evt, selectedRow) => {
    setSelectedRow(selectedRow.tableData.id)
    props.setFilename(selectedRow.filename)
  }

  const actions = [{
    icon: () => (
      <Delete style={{ color: "white" }} />
    ),
    tooltip: "deleteFile",
    title: "aaa",
    onClick: (event, rowData) => handleDelete(rowData)
  }]

  const options = {
    rowStyle: {
      backgroundColor: "#1B2B46",
      color: "white",
      border: "none"
    },
    showTitle: false,
    toolbar: false,
    search: false,
    paging: false,
    sorting: false,
    headerStyle: {
      fontSize: "14px",
      position: "sticky",
      backgroundColor: "#1B2B46",
      color: "white",
      top: "0"
    },
    // maxBodyHeight: "300px",
    rowStyle: rowData => ({
      backgroundColor: (selectedRow === rowData.tableData.id) ? 'gray' : '#1B2B46',
      color: "white",
      border: "none"
    })
  }

  const localization = {
    header: {
      actions: ""
    }
  }

  return (
    <div style={{ marginLeft: "2%", marginRight: "2%" }}>
      <MaterialTable
        style={{ backgroundColor: "#1B2B46" }}
        columns={columns}
        actions={actions}
        options={options}
        localization={localization}
        onRowClick={handleRowClick}
        style={{ fontSize: "14px" }}

        data={props.fileList.map((fName) => ({
          "filename": fName,
          "username": props.usr.email,
          "size": "---"
        }))}
      />
    </div>
  );
}

export default Catalog;