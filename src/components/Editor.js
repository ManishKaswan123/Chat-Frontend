import React, { useEffect } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import './editorStyles.css'; // Import the CSS file

const Editor = () => {
  useEffect(() => {
    const parentElement = document.getElementById('realTimeEditor');
    
    // Clear any existing content in the parent element
    parentElement.innerHTML = '';

    const editor = new EditorView({
      doc: 'This is the editor',
      extensions: [basicSetup, javascript()],
      parent: parentElement
    });

    // Cleanup function to remove the editor instance
    return () => {
      editor.destroy();
    };
  }, []);

  return (
    <div id="realTimeEditor" className='w-full h-full'></div>
  );
};

export default Editor;