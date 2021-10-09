import React, { useState, useEffect } from 'react';

import Editor, { useMonaco } from "@monaco-editor/react";
import SendCodeButton from '../SendCodeButton/SendCodeButton';
import SaveCustomFeature from '../SaveCustomFeature/SaveCustomFeature';
import DiscardCustomFeature from '../DiscardCustomFeature/DiscardCustomFeature';

function CustomEditor(props) {
  const monaco = useMonaco();
  const beforeUserCode = "import pandas as pd\ndef run(df):\n\t"
  // const inbetweenMessage = "# Здесь можете ввести нужные преобразования"
  const inbetweenMessage = "df['Custom']=df['Gain']\n"
  const afterUserCode = "\n\treturn df['Custom']"
  const [code, setCode] = useState(beforeUserCode + inbetweenMessage + afterUserCode);

  function handleEditorChange(value, event) {
    if (!(value.startsWith(beforeUserCode) && value.endsWith(afterUserCode))) {
      monaco.editor.getModels()[0].undo()
    } else {
      setCode(value)
    }
  }
  return (
    <div>
      <Editor
        defaultLanguage="python"
        defaultValue={beforeUserCode + inbetweenMessage + afterUserCode}
        theme="vs-dark"
        onChange={handleEditorChange}
      />
      <SendCodeButton setColumns={props.setColumns} setData={props.setData} filename={props.filename} uid={props.uid} code={code} />
      <SaveCustomFeature filename={props.filename} uid={props.uid}/>
      <DiscardCustomFeature setColumns={props.setColumns} setData={props.setData} filename={props.filename} uid={props.uid}/>
    </div>
  );
}

export default CustomEditor;