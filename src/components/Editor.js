import React, { useEffect } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
// Remove the import for the dark theme
// import { oneDark } from '@codemirror/theme-one-dark';

const Editor = () => {
  useEffect(() => {
    const parentElement = document.getElementById('realTimeEditor');
    
    // Clear any existing content in the parent element
    parentElement.innerHTML = '';

    const editor = new EditorView({
      doc: 'This is the editor',
      extensions: [basicSetup, javascript()], // Remove the dark theme extension
      parent: parentElement
    });

    // Cleanup function to remove the editor instance
    return () => {
      editor.destroy();
    };
  }, []);

  return (
    <div id="realTimeEditor" className='w-[100%] h-200'></div>
  );
};

export default Editor;