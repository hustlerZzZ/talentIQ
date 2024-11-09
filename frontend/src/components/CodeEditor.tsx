import * as monaco from "monaco-editor";
import { useEffect, useRef } from "react";
import axios from "axios";

function CodeEditor() {
   const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
   const containerRef = useRef<HTMLDivElement>(null);
   const saveCode = async () => {
    try {
      console.log('yes');  
      const code = editorRef.current?.getValue();
      const model = editorRef.current?.getModel();
      const response = await axios.post("http://localhost:6969/api/v1/editor/save-code", {
        code: code,
        language: model?.getLanguageId()
      });
      console.log(response.data.message);
    } catch (error) {
      console.error("Error saving code:", error);
    }
  };


  useEffect(() => {
     if (containerRef.current) {
       editorRef.current = monaco.editor.create(containerRef.current, {
         language: "python",
         theme: "vs-dark",
         automaticLayout: true,
       });
     }

    return () => {
      editorRef.current?.dispose();
    };
  }, []);

  return (
    <div className="h-full relative">
      <div ref={containerRef} className="w-full h-full" />
      <button onClick={saveCode} className="bg-green-600 text-white px-10 py-3 absolute right-4 bottom-2 z-10">
        Run
      </button>
    </div>
  );
}

export default CodeEditor;
