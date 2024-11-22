'use client'

import { useState } from 'react'
import Editor from '@monaco-editor/react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from 'next-themes'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Language = 'python' | 'javascript' | 'java' | 'cpp';

const languages: { value: Language; label: string }[] = [
  { value: 'python', label: 'Python' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
];

const defaultCode: Record<Language, string> = {
  python: '# Write your Python code here',
  javascript: '// Write your JavaScript code here',
  java: '// Write your Java code here',
  cpp: '// Write your C++ code here',
}

export default function CodeEditor() {
  const { theme } = useTheme()
  const [language, setLanguage] = useState<Language>('python')
  const [code, setCode] = useState(defaultCode[language])

  const handleLanguageChange = (value: Language) => {
    setLanguage(value)
    setCode(defaultCode[value])
  }

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Code Editor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <Select onValueChange={(value: Language) => handleLanguageChange(value)} defaultValue={language}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Editor
          height="400px"
          language={language}
          value={code}
          onChange={handleEditorChange}
          theme={theme === 'dark' ? 'vs-dark' : 'light'}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
          }}
        />
        <Button className="mt-4 w-full">
          Submit Code
        </Button>
      </CardContent>
    </Card>
  )
}