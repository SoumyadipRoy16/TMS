'use client'

import { useState } from 'react'
import Editor from '@monaco-editor/react'

export default function CodeEditor() {
  const [code, setCode] = useState('// Write your code here')

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value)
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Code Editor</h2>
      <Editor
        height="400px"
        defaultLanguage="javascript"
        defaultValue={code}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
        }}
      />
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
        Submit Code
      </button>
    </div>
  )
}

