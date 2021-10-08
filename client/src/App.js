import React, { useState, useEffect } from 'react';

import { initializeApp } from "firebase/app";
import Editor, { useMonaco } from "@monaco-editor/react";

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
  const monaco = useMonaco();
  const beforeUserCode = "import pandas as pd\n"
  const inbetweenMessage = "# Здесь можете ввести нужные преобразования"
  const afterUserCode = "\nreturn df['feature']"

  useEffect(() => {
    if (monaco) {
      console.log("here is the monaco instance:", monaco.editor);
    }
  }, [monaco]);
  function handleEditorChange(value, event) {
    if (!(value.startsWith(beforeUserCode) && value.endsWith(afterUserCode))) {
      monaco.editor.getModels()[0].undo()
    }
    console.log("here is the current model value:", value);
  }
  return ( 
    <div>
      <Editor
        height="90vh"
        defaultLanguage="python"
        defaultValue={beforeUserCode + inbetweenMessage + afterUserCode}
        theme="vs-dark"
        onChange={handleEditorChange}
      />
    </div>
   );
}

export default App;