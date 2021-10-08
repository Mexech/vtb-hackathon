import React, { useState, useEffect } from 'react';

import Editor, { useMonaco } from "@monaco-editor/react";

function CustomEditor() {
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

export default CustomEditor;