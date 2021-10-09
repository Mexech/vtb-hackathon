import React, { useState, useEffect } from 'react';

import Editor, { useMonaco } from "@monaco-editor/react";
import SendCodeButton from '../SendCodeButton/SendCodeButton';
import SaveCustomFeature from '../SaveCustomFeature/SaveCustomFeature';
import DiscardCustomFeature from '../DiscardCustomFeature/DiscardCustomFeature';

function CustomEditor(props) {
  const monaco = useMonaco();
  const beforeUserCode = "import pandas as pd\ndef run(df):\n\t"
  const inbetweenMessage = "# Здесь можете ввести нужные преобразования\n"
  // const inbetweenMessage = "df['Custom']=df['Gain']\n"
  const afterUserCode = `\n\treturn df['${props.customFeature}']`
  const [code, setCode] = useState(beforeUserCode + inbetweenMessage + afterUserCode);
  const [createdNewFeature, setCreatedNewFeature] = useState(false);
  function handleEditorChange(value, event) {
    if (!(value.startsWith(beforeUserCode) && value.endsWith(afterUserCode))) {
      monaco.editor.getModels()[0].undo()
    } else {
      setCode(value)
    }
  }
  return (
    <div style={{ display:"flex", flexDirection:"column"}}>
      <div>
        <Editor
          height="80vh"
          defaultLanguage="python"
          defaultValue={beforeUserCode + inbetweenMessage + afterUserCode}
          theme="vs-dark"
          onChange={handleEditorChange}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {code != beforeUserCode + inbetweenMessage + afterUserCode 
        ? <SendCodeButton createdNewFeature={setCreatedNewFeature} setColumns={props.setColumns} setData={props.setData} filename={props.filename} uid={props.uid} code={code}/>
        : null}
        {}
        {createdNewFeature ? <SaveCustomFeature setCustomFeature={props.setCustomFeature} filename={props.filename} uid={props.uid} /> : null}
        {createdNewFeature ? <DiscardCustomFeature setCustomFeature={props.setCustomFeature} setColumns={props.setColumns} setData={props.setData} filename={props.filename} uid={props.uid} /> : null}
      </div>
    </div>
  );
}

export default CustomEditor;