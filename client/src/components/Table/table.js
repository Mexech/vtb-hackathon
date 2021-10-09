import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import MaterialTable from 'material-table';
import CustomEditor from '../CustomEditor/CustomEditor';
import './style.css'
import axios from 'axios'


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
  const options = [
    'one', 'two', 'three'
  ];
  const defaultOption = options[0];

  const [isEditor, setEditor] = useState(false);
  const [isFeature, setFeature] = useState(null);
  const [customFeature, setCustomFeature] = useState("");

  const styles = {
    rowStyle: {
      backgroundColor: "#1B2B46",
      color: "#FFF",
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "18px",
    },
    headerStyle: {
      backgroundColor: "#1B2B46",
      color: "#FFF"
    },
    searchFieldStyle: {
      backgroundColor: "#C2D4EF",
      borderRadius: "30px",
      padding: "5px 0 5px 20px",
      color: "#858585"
    }
  }

  useEffect(async () => {
    axios.get(`/api/getdataset/${props.uid}/${props.filename}`)
      .then(res => {
        setColumns(res.data.columns)
        setData(res.data.data)
      })
  }, []);

  const [open, setOpen] = React.useState(false);

  function handleFeature(ev) {
    setFeature(true);
    document.getElementById("input-feature").focus()
  }

  function handleDataSet() {
    setFeature(false);
    document.getElementById("input-data-set").focus()
  }

  const handleCustomFeature = (ev) => {
    if (ev.key === "Enter") {
      setCustomFeature(ev.target.value)
    }
  }

  return (
    <div>
      <div className="under-header">
        <div class="dropdown" >
          <button class="dropbtn">Фича</button>
          <div class="dropdown-content">
            <a style={isFeature === true ? { display: "none" } : { display: "block" }} onClick={handleFeature} href="#">Create feature</a>
            <form class="forms" style={isFeature === true ? { display: "flex" } : { display: "none" }}>
              <input id="input-feature" onKeyUp={handleCustomFeature}/>
              {/* <input type="submit" value="sub" onClick={setEditor(true)} /> */}
            </form>

            <a style={isFeature === false ? { display: "none" } : { display: "block" }} onClick={handleDataSet} href="#">Add dataset</a>
            <form class="forms" style={isFeature === false ? { display: "flex" } : { display: "none" }}>
              <input id="input-data-set" />
              <input type="submit" value="sub" />
            </form>
          </div>
        </div>
      </div>
      <div className="wrapper">
        <div style={isEditor ? { width: "69%", marginRight: "1%" } : { width: "100%" }}>
          <MaterialTable
            className="table"
            columns={columns}
            data={data}
            title={props.filename}
            options={{
              maxBodyHeight: "75vh",
              selection: false,
              rowStyle: { ...styles.rowStyle },
              headerStyle: { ...styles.headerStyle },
              searchFieldStyle: { ...styles.searchFieldStyle },
              paging: false

            }}
          />
        </div>
        {
          customFeature ?
            <div style={{ width: "30%" }}>
              <CustomEditor
                className="editor"
                uid={props.uid}
                filename={props.filename}
                setColumns={setColumns}
                setData={setData}
                customFeature={customFeature}
                setCustomFeature={setCustomFeature}
              />
            </div>
            :
            null
        }
      </div>
    </div>
  );
}

export default Table;