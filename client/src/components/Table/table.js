import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";


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
const storage = getStorage();

function Table() {
  const [dataset, setDataset] = useState();

  function getFile(path) {
    getDownloadURL(ref(storage, path))
      .then((url) => {
        fetch(`/getjson?url=${encodeURIComponent(url)}`).then(
          res => res.json()
        ).then(
          data => {
            setDataset(Object.values(data["data"]));
            console.log((dataset))
          }
        )
      })
      .catch((error) => {
      });
  }

  // function getObjectOfArray() {
  //   let newObject = new Array(Object.values(dataset[0]).length);
  //   for (let col = 0; col < Object.values(dataset[0]).length; col++) {
  //     for (let row = 0; row < dataset.length; row++) {
  //       newObject[col] = {
          
  //       }
  //     }
  //   }
  // }

  return (
    <div>
      <button onClick={() => getFile("Valve_Player_Data.csv")}>test</button>
      <button>test2</button>
      <table>
        <tr>
          <th>Col1</th>
          <th>Col2</th>
          <th>Col3</th>
          <th>Col4</th>
          <th>Col5</th>
        </tr>
        {
          dataset && dataset.length > 0 ?
            dataset.map((item, index) => {
              return (
                <tr>
                  <td key={index}>{item[0]}</td>
                  <td key={index}>{item[1]}</td>
                  <td key={index}>{item[2]}</td>
                  <td key={index}>{item[3]}</td>
                  <td key={index}>{item[4]}</td>
                </tr>);
            }
            ) :
            "Loading"
        }
      </table>
    </div>
  );
}

export default Table;