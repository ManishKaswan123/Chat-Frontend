// import React, { useEffect, useRef } from 'react';
// import { EditorView, keymap } from '@codemirror/view';
// import { EditorState, Transaction } from '@codemirror/state';
// import { javascript } from '@codemirror/lang-javascript';
// import { oneDark } from '@codemirror/theme-one-dark';
// import { lineNumbers } from '@codemirror/gutter';

// const CodeEditor = () => {
//   const editorRef = useRef(null);  // Reference for editor DOM element
//   const editorViewRef = useRef(null);  // Reference for EditorView instance

//   useEffect(() => {
//     if (editorRef.current) {
//       // Initializing the editor state with the required extensions
//       const state = EditorState.create({
//         doc: '// Start typing here...',
//         extensions: [
//           lineNumbers(),           // Adds line numbers
//           javascript(),            // JavaScript syntax highlighting
//           oneDark,                 // Dark theme
//         ]
//       });

//       // Initializing the editor view
//       editorViewRef.current = new EditorView({
//         state,
//         parent: editorRef.current,
//         dispatch: (transaction) => {
//           // Handle transaction updates, including changes in the editor
//           const editorView = editorViewRef.current;
//           if (editorView) {
//             editorView.update([transaction]);

//             // If there are document changes, capture and log change details
//             if (transaction.docChanged) {
//               const changesDetails = [];

//               transaction.changes.iterChanges((from, to, fromLine, toLine, inserted) => {
//                 changesDetails.push({
//                   from,                                      // Start position of the change
//                   to,                                        // End position of the change
//                   moved: to - from,                          // Number of characters moved
//                   text: inserted.map(line => line.text),     // Inserted text (array of lines)
//                   origin: transaction.annotation(Transaction.userEvent) || 'unknown', // Origin of the event
//                   on: transaction.annotation(Transaction.time),  // Time of transaction
//                 });
//               });

//               // Log the changes to console
//               console.log('Changes:', changesDetails);
//             }
//           }
//         },
//       });
//     }

//     return () => {
//       // Clean up: destroy the editor view when the component is unmounted
//       editorViewRef.current?.destroy();
//     };
//   }, []);

//   return (
//     <div>
//       <h3>Code Editor</h3>
//       <div ref={editorRef} style={{ border: '1px solid #ccc', height: '300px' }} />
//     </div>
//   );
// };

// export default CodeEditor;

import React from 'react'
import { Editor } from '@monaco-editor/react'

const EditorComponent = ({language , roomId , socketRef , code , onChange}) => {
  return (
    <div className='h-full w-full'>
      <Editor
        height="95%"
        defaultLanguage="javascript"
        defaultValue="// Start typing here..."
        language={language}
        value={code}
        onChange={onChange}
        theme='vs-dark'
        options={
          {
            minimap: {
              enabled: false
            },
            fontSize: 16
          }
        }
      />
    </div>
  )
}

export default EditorComponent