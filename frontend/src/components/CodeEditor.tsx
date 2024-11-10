import * as monaco from "monaco-editor";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

function CodeEditor( {language} : {language: string}) {
  const [output, setOutput] = useState<String>('');
   const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
   const containerRef = useRef<HTMLDivElement>(null);
   const saveCode = async () => {
    try {
      const code = editorRef.current?.getValue();
      const model = editorRef.current?.getModel();
      const response = await axios.post("http://localhost:6969/api/v1/editor/save-code", {
        code: code,
        language: model?.getLanguageId()
      });
      console.log(response.data);
      const receivedOutput = response.data.data;
      setOutput(receivedOutput);
    } catch (error) {
      console.error("Error saving code:", error);
    }
  };


  useEffect(() => {
     if (containerRef.current) {
       editorRef.current = monaco.editor.create(containerRef.current, {
         language: language,
         theme: "vs-dark",
         automaticLayout: false,
       });
     }
     

    return () => {
      editorRef.current?.dispose();
    };
  }, []);

  return (
    <div className="h-full relative">
      <div ref={containerRef} className="w-full h-full" />
      <button onClick={saveCode} className={`bg-green-600 text-white px-10 py-3 absolute right-8 ${output.length === 0 ? 'bottom-2' : 'bottom-60'} z-10 rounded-xl`}>
        Run
      </button>

      <div className={`h-2/5 w-full bg-zinc-700 absolute bottom-1 z-50 ${output.length === 0 ? 'hidden' : 'block'}`}>
        <h1 className="bg-black text-white">Output</h1>
        <p className="text-white whitespace-pre-line">{output}</p>
      </div>
    </div>
  );
}

export default CodeEditor;
